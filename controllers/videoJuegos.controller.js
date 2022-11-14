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
    await this.videoJuegos.addItem(data);
    res({
      status: 200, 
      message: 'OK'
    });
  }

  async updateVideoJuego(data, res) {
    await this.videoJuegos.updateItem(task);

    res({
      status: 200, 
      message: 'OK'
    });
  }
}

module.exports = videoJuegoController;