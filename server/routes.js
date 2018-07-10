const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const flagTypes = [
  { id: 1, name: 'Advertiser - Location Priority' },
  { id: 2, name: 'Retailer - Location Priority' },
  { id: 3, name: 'Retailer - Showcase' },
  { id: 4, name: 'GSTV - Site Visit' },
  { id: 5, name: 'GSTV - Showcase' },
  { id: 6, name: 'GSTV - Nielsen Survey' },
  { id: 7, name: 'GSTV - Research Survey' },
  { id: 8, name: 'GSTV - Unsellable' },
];

module.exports = (app, { Flag }) => {
  app.get('/', (req, res) => res.render('index'));

  app.get('/api/flags', async (req, res) => {
    const flags = await Flag.find();
    res.json(flags);
  });

  app.get('/api/flag-types', (req, res) => {
    res.json(flagTypes);
  });

  app.post('/api/flags', jsonParser, (req, res) => {
    const flag = new Flag(req.body);

    console.log(' creating ', flag, req.body);

    flag.save()
      .then((doc) => res.json(doc))
      .catch((err) => res.json({ error: err }, 500));
  });

  app.put('/api/flags/:flagId', jsonParser, (req, res) => {
    Flag.updateOne({ _id: req.params.flagId }, req.body)
      .then((doc) => res.json(req.body))
      .catch((err) => res.json({ error: err }, 500));
  });
};
