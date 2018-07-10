import { combineReducers } from 'redux';

import flags from './flags';
import flagTypes from './flagTypes';

export default combineReducers({
  flags,
  flagTypes,
});
