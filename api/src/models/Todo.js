const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name:  String,
  createdAt: { type: Date, default: Date.now }
}, { collection: 'todos' });

// TodoSchema.post('save', async (doc, next) => {
//   doc.createdAt = new Date();
//   await doc.save();
//   return next();
// });

module.exports = mongoose.model('Todo', TodoSchema);
