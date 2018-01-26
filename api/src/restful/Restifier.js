const Mapping = {
  todos: require('./../models/Todo')
};

class Restifier {
  async find({ model }) {
    const Document = Mapping[model];
    return await Document.find().sort({ createdAt: -1 });
  }
  async create({ model, params }) {
    const Document = Mapping[model];
    return await Document.create(params);
  }
  async deleteOne({ model, params }) {
    const Document = Mapping[model];
    return await Document.remove(params);
  }
  async deleteMulti({ model, params }) {
    const Document = Mapping[model];
    const conditions = { _id: { $in: params.ids } };
    return await Document.remove(conditions);
  }
  async updateOne({ model, conditions, params }) {
    const Document = Mapping[model];
    return await Document.update(conditions, params);
  }
}

module.exports = Restifier;
