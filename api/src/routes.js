const router = require('express').Router();
const Restifier = require('./restful/Restifier');
const restifier = new Restifier();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// SET HEADERS
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// FIND
router.get('/api/:document/find', async (req, res) => {
  const records = await restifier.find({ model: req.params.document, conditions: req.query });
  res.status(200).json(records);
});

// CREATE
router.post('/api/:document/create', async (req, res) => {
  const records = await restifier.create({ model: req.params.document, params: req.body });
  res.status(200).json(records);
});

// UPDATE
router.put('/api/:document/:id/update', async (req, res) => {
  const conditions = { _id: req.params.id };
  const records = await restifier.updateOne({ model: req.params.document, conditions, params: req.body });
  res.status(200).json(records);
});


// Delete
router.delete('/api/:document/:id', async (req, res) => {
  const records = await restifier.deleteOne({ model: req.params.document, params: { _id: req.params.id } });
  res.status(200).json(records);
});
router.post('/api/:document/delete', async (req, res) => {
  const records = await restifier.deleteMulti({ model: req.params.document, params: { ids: req.body } });
  res.status(200).json(records);
});

module.exports = router;
