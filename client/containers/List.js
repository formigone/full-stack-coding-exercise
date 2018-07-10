import React from 'react';

import { isPassed } from '../utils';

const List = ({ flags, loading, onToggleModal, onEdit }) => (
  <table style={{ width: '100%' }} className="table">
    <thead>
    <tr>
      <td>Type</td>
      <td>Start</td>
      <td>End</td>
      <td>
        <button onClick={() => onToggleModal()}>Add</button>
      </td>
    </tr>
    </thead>

    {flags.length === 0 && loading && (
      <tbody>
      <tr>
        <td>
          <p>Loading...</p>
        </td>
      </tr>
      </tbody>
    )}

    {flags.length === 0 && !loading && (
      <tbody>
      <tr>
        <td>
          <p>There are no site flags.</p>
        </td>
      </tr>
      </tbody>
    )}

    {flags.length > 0 && (
      <tbody>
      {flags.filter((flag) => !isPassed(flag)).map((flag) => (
        <tr key={flag._id}>
          <td>{flag.type}</td>
          <td>{flag.dateStart.toDateString()}</td>
          <td>{flag.dateEnd.toDateString()}</td>
          <td>
            <button onClick={() => onEdit(flag._id)}>Edit</button>
          </td>
        </tr>
      ))}
      </tbody>
    )}

  </table>
);

export default List;
