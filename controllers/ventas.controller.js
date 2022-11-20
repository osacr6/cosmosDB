const Model = require("../models/model");

class ventasController {
  constructor() {
    this.ventas = new Model('ventas');
  }

  async listVentas(res) {
    const querySpec = {
      query: "SELECT * FROM c" // OFFSET 0 LIMIT 10
    };
    const items = await this.ventas.find(querySpec);
    res({
      data: items
    });
  }

  async addVenta(data, res) {
    const item = await this.ventas.addItem(data);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }

  async updateVenta(data, res) {
    const item = await this.ventas.updateItem(data);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }

  async deleteVenta(id, res) {
    const item = await this.ventas.deleteItem(id);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }
}

module.exports = ventasController;