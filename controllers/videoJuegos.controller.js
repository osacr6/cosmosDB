const videoJuegoModel = require("../models/videoJuego.model");

class videoJuegoController {
  /**
   * Handles the various APIs for displaying and managing
   */
  constructor() {
    this.videoJuegos = new videoJuegoModel();
  }

  async listVideoJuegos(res) {
    const querySpec = {
      query: "SELECT * FROM root"
    };
    const items = await this.videoJuegos.find(querySpec);
    res({
      data: items
    });
  }

  async addVideoJuego(data, res) {
    const item = await this.videoJuegos.addItem(data);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }

  async updateVideoJuego(data, res) {
    const item = await this.videoJuegos.updateItem(data);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }

  async deleteVideoJuego(id, res) {
    const item = await this.videoJuegos.deleteItem(id);
    console.log(item);
    res({
      status: 200, 
      message: 'OK'
    });
  }
}

module.exports = videoJuegoController;