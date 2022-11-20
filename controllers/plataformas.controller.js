const Model = require("../models/model");

class plataformasController {
  constructor() {
    this.plataformas = new Model('plataformas');
  }

  async listPlataformas(res) {
    const querySpec = {
      query: "SELECT * FROM root"
    };
    const items = await this.plataformas.find(querySpec);
    res({
      data: items
    });
  }

  async addPlataforma(data, res) {
    const item = await this.plataformas.addItem(data);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }

  async updatePlataforma(data, res) {
    const item = await this.plataformas.updateItem(data);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }

  async deletePlataforma(id, res) {
    const item = await this.plataformas.deleteItem(id);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }
}

module.exports = plataformasController;