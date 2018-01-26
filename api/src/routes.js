const router = require('express').Router();
const Restifier = require('./restful/Restifier');
const restifier = new Restifier();

// router.get('/', async (req, res) => {
//   const records = await restifier.find({ model: 'todos' });
//   console.log(records);
//   res.status(200).send('hom!');
// });

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
router.get('/api/:document/find', async (req, res) => {
  const records = await restifier.find({ model: req.params.document });
  res.status(200).json(records);
});

router.post('/api/:document/create', async (req, res) => {
  const records = await restifier.create({ model: req.params.document, params: req.query });
  res.status(200).json(records);
});

module.exports = router;
