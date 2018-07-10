export const FETCH_FLAG_TYPES_END = 'flag_types/fetched';
export const FETCH_FLAG_TYPES_ERROR = 'flag_types/fetch/error';

export const FETCH_FLAGS_START = 'flags/fetching';
export const FETCH_FLAGS_ERROR = 'flags/fetch/error';
export const FETCH_FLAGS_END = 'flags/fetched';

export const ADD_FLAG = 'flags/add';
export const EDIT_FLAG = 'flags/edit';
export const UPDATE_FLAG = 'flags/update';
export const UPDATE_FLAG_PROP = 'flags/update_property';

const genAction = (type, payload = null) => ({ type, payload });

export const fetchFlags = (dispatch) => {
  dispatch(genAction(FETCH_FLAGS_START));

  fetch('/api/flags')
    .then((res) => res.json())
    .then((flags) => {
      console.log('fetched', { flags });
      dispatch(genAction(FETCH_FLAGS_END, flags.map((flag) => ({
        ...flag,
        dateStart: new Date(),
        dateEnd: new Date(flag.dateEnd),
      }))));
    })
    .catch((err) => {
      console.log('error fetching flags', { err });
      dispatch(genAction(FETCH_FLAGS_ERROR));
    })
};

export const fetchFlagTypes = (dispatch) => {
  fetch('/api/flag-types')
    .then((res) => res.json())
    .then((flagTypes) => {
      dispatch(genAction(FETCH_FLAG_TYPES_END, flagTypes));
    })
    .catch((err) => {
      console.log('error fetching flag types', { err });
      dispatch(genAction(FETCH_FLAG_TYPES_ERROR));
    })
};

export const updateFlagProperty = (property, value, dispatch) => {
  dispatch(genAction(UPDATE_FLAG_PROP, { property, value }));
};

export const editFlag = (id, dispatch) => {
  console.log('dispatch edit', id);
  dispatch(genAction(EDIT_FLAG, { id }));
};

export const saveFlag = (flag, dispatch, onDone) => {
  fetch(`/api/flags/${flag._id || ''}`, {
    method: flag._id ? 'PUT' : 'POST',
    body: JSON.stringify(flag),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  }).then((res) => res.json())
    .then((res) => {
      if (flag._id) {
        dispatch(genAction(UPDATE_FLAG, res));
        onDone();
      } else {
        dispatch(genAction(ADD_FLAG, res));
        onDone();
      }
    })
    .catch((err) => {
      console.log('Error saving flag', err);
      onDone();
    })
};

export default {
  FETCH_FLAG_TYPES_END,
  FETCH_FLAG_TYPES_ERROR,

  FETCH_FLAGS_START,
  FETCH_FLAGS_ERROR,
  FETCH_FLAGS_END,
};
