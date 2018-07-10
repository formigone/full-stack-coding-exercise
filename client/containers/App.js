import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { fetchFlags, fetchFlagTypes, updateFlagProperty, saveFlag, editFlag } from '../data/actions';
import List from './List';
import Modal from './Modal';
import Form from './Form';

class App extends PureComponent {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      loading: false,
      isOpen: false,
      currentFlag: {
        type: null,
        dateStart: today,
        dateEnd: new Date(today.getFullYear(), today.getMonth() + 1),
      },
    };
  }

  componentDidMount() {
    this.props.fetchFlagTypes();
    this.props.fetchFlags();
  }

  toggleModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  updateFlag(attribute, el) {
    const { currentFlag } = this.state;
    currentFlag[attribute] = el.target.value;
    this.setState({ currentFlag });
  }

  saveFlag() {
    const { currentFlag, saving } = this.state;

    fetch('/api/flags', {
      method: 'post',
      body: JSON.stringify(currentFlag),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
      .then((res) => res.json())
      .then((flag) => {
        this.setState({ flags: [...this.flags, flag] });
      })
      .catch(err => console.log('error saving', { err, currentFlag }))
  }

  render() {
    console.log('render', { props: this.props });
    const { isOpen, currentFlag } = this.state;
    const { flags, flagTypes } = this.props;

    return (
      <div className="container">
        <div className="row">

          <Modal isOpen={isOpen}>
            <Form
              flag={flags.editing}
              flagTypes={flagTypes}
              onChange={this.props.updateFlagProperty}
              onCancel={() => this.setState({ isOpen: false })}
              onSave={(flag) => this.props.saveFlag(flag, () => {
                this.setState({ isOpen: false });
              })}
            />
          </Modal>

          <List
            flags={flags.items}
            loading={flags.loading}
            onToggleModal={() => this.toggleModal()}
            onEdit={(id) => {
              this.toggleModal();
              this.props.editFlag(id);
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flags: state.flags,
  flagTypes: state.flagTypes.items,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFlags: () => fetchFlags(dispatch),
  fetchFlagTypes: () => fetchFlagTypes(dispatch),
  editFlag: (id) => editFlag(id, dispatch),
  updateFlagProperty: (property, value) => updateFlagProperty(property, value, dispatch),
  saveFlag: (flag, onDone) => saveFlag(flag, dispatch, onDone),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
