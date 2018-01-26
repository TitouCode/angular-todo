const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name:  String,
  createdAt: Date
}, { collection: 'todos' });

// TodoSchema.post('save', async (doc, next) => {
//   console.log(doc);
//   // await this.findOneAndUpdate({ _id: doc._id }, { createdAt:new Date() });
//   doc.createdAt = new Date();
//   await doc.save();
//   next();
// });

module.exports = mongoose.model('Todo', TodoSchema);
