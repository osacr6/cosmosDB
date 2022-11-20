const Model = require("../models/model");

class generosController {
  constructor() {
    this.generos = new Model('generos');
  }

  async listGeneros(res) {
    const querySpec = {
      query: "SELECT * FROM root"
    };
    const items = await this.generos.find(querySpec);
    res({
      data: items
    });
  }

  async addGenero(data, res) {
    const item = await this.generos.addItem(data);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }

  async updateGenero(data, res) {
    const item = await this.generos.updateItem(data);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }

  async deleteGenero(id, res) {
    const item = await this.generos.deleteItem(id);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }
}

module.exports = generosController;