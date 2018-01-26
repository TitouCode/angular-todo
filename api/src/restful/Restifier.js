const Mapping = {
  todos: require('./../models/Todo')
};

class Restifier {
  async find({ model }) {
    const Document = Mapping[model];
    console.log(model);
    return await Document.find();
  }
  async create({ model, params }) {
    const Document = Mapping[model];
    return await Document.create(params);
  }
  // async update({ model, params }) {
  //   const Document = Mapping[model];
  //   return await Document.update(params,).exec();
  // }
}

module.exports = Restifier;
