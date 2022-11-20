const Model = require("../models/model");

class editorialesController {
  constructor() {
    this.editoriales = new Model('editoriales');
  }

  async listEditoriales(res) {
    const querySpec = {
      query: "SELECT * FROM root"
    };
    const items = await this.editoriales.find(querySpec);
    res({
      data: items
    });
  }

  async addEditorial(data, res) {
    const item = await this.editoriales.addItem(data);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }

  async updateEditorial(data, res) {
    const item = await this.editoriales.updateItem(data);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }

  async deleteEditorial(id, res) {
    const item = await this.editoriales.deleteItem(id);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }
}

module.exports = editorialesController;