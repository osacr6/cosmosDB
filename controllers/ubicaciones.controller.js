const Model = require("../models/model");

class ubicacionesController {
  constructor() {
    this.ubicaciones = new Model('ubicaciones');
  }

  async listUbicaciones(res) {
    const querySpec = {
      query: "SELECT * FROM root"
    };
    const items = await this.ubicaciones.find(querySpec);
    res({
      data: items
    });
  }

  async addUbicacion(data, res) {
    const item = await this.ubicaciones.addItem(data);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }

  async updateUbicacion(data, res) {
    const item = await this.ubicaciones.updateItem(data);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }

  async deleteUbicacion(id, res) {
    const item = await this.ubicaciones.deleteItem(id);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }
}

module.exports = ubicacionesController;