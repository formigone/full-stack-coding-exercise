const mongoose = require('mongoose');

const Flag = mongoose.model('Flag', new mongoose.Schema({
  type: String,
  dateStart: Date,
  dateEnd: Date,
}));

const FlagType = mongoose.model('FlagType', new mongoose.Schema({
  type: String,
}));

module.exports = {
  Flag,
  FlagType,
};
