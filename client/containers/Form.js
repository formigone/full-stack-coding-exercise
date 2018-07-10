import React from 'react';

import { asDateString } from '../utils';

let select = null;

const Form = ({ flag = {}, flagTypes, onChange, onCancel, onSave }) => (
  <div>
    <h1>{flag._id ? 'Edit' : 'New'} flag</h1>
    <hr />
    <select onChange={(e) => onChange('type', e.target.value)} ref={(el) => {
      if (select === null) {
        select = el;
        onChange('type', select.value);
      }
    }}>
      {flagTypes.length > 0 && flagTypes.map(({ name }) => (
        <option key={name} value={name}>{name}</option>
      ))}
    </select>
    <p>
      <input type="date" value={asDateString(flag.dateStart)} onChange={(e) => onChange('dateStart', new Date(e.target.value))} />
    </p>
    <p>
      <input type="date" value={asDateString(flag.dateEnd)} onChange={(e) => onChange('dateEnd', new Date(e.target.value))} />
    </p>
    <p>
      <button onClick={() => onSave(flag)} disabled={!flag.dateEnd && !flag.dateEnd}>Submit</button>
      <button onClick={() => onCancel()}>Close</button>
    </p>
  </div>
);

export default Form;
