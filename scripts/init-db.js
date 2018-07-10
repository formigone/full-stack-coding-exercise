// Put some initial data in the database
const mongoose = require('mongoose');

const config = require('../config');
const { FlagType, Flag } = require('../server/models');

mongoose.connect(`${config.mongodb.url}/${config.mongodb.dbName}`, { useNewUrlParser: true });

Promise.all([
  FlagType.deleteMany(),
  Flag.deleteMany(),
]).then(() => {
  console.log('Deleted flag types');

  FlagType.create([
    { type: 'Advertiser - Location Priority' },
    { type: 'Retailer - Location Priority' },
    { type: 'Retailer - Showcase' },
    { type: 'GSTV - Site Visit' },
    { type: 'GSTV - Showcase' },
    { type: 'GSTV - Nielsen Survey' },
    { type: 'GSTV - Research Survey' },
    { type: 'GSTV - Unsellable' },
  ]).then((res) => {
    console.log('Create flag tyipes', res);
    process.exit(0);
  });
});
