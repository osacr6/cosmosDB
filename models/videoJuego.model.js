// https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/tutorial-nodejs-web-app#create-new-app
// https://learn.microsoft.com/en-us/javascript/api/overview/azure/cosmos-readme?view=azure-node-latest#insert-items
// https://learn.microsoft.com/en-us/azure/cosmos-db/index-overview
// @ts-check
const CosmosClient = require('@azure/cosmos').CosmosClient;
const config = require('../config');
const CONTAINER_ID = 'videoJuegos';

// For simplicity we'll set a constant partition key
const partitionKey = undefined;

class videoJuegoModel {
  /**
   * Manages reading, adding, and updating in Azure Cosmos DB
   */
  constructor() {
    this.container = null;

    this.init(err => {
        console.error(err)
      })
      .catch(err => {
        console.error(err)
        console.error(
          'Shutting down because there was an error settinig up the database.'
        )
        process.exit(1)
      });
  }

  async init() {
    console.log('Setting up the database...');
    const cosmosClient = new CosmosClient({
      endpoint: config.host,
      key: config.authKey
    });
    const dbResponse = await cosmosClient.databases.createIfNotExists({
      id: config.databaseId
    });
    const database = dbResponse.database;
    console.log('Setting up the database...done!');
    console.log('Setting up the container...');
    const coResponse = await database.containers.createIfNotExists({
      id: CONTAINER_ID
    });
    this.container = coResponse.container;
    console.log('Setting up the container ' + CONTAINER_ID + ' ...done!');

    console.log('yeah-yeah! estamos ready.');
  }

  async find(querySpec) {
    console.log('Querying for items from the database')
    if (!this.container) {
      throw new Error('Collection is not initialized.')
    }
    const {
      resources
    } = await this.container.items.query(querySpec).fetchAll()
    return resources
  }

  async addItem(item) {
    console.log('Adding an item to the database')
    try {
      item.id = (new Date().getTime()).toString(36);
      console.log(item);
      const {
        resource: doc
      } = await this.container.items.create(item)
      return doc;
    } catch (error) {
      console.log("Theres an Error: ", error);
      return null;
    }
  }

  async updateItem(item) {
    try {
      console.log('Update an item in the database')
      let doc = await this.getItem(item.id);
      doc = {
        ...doc,
        ...item
      };
      const {
        resource: replaced
      } = await this.container
        .item(item.id, partitionKey)
        .replace(doc);
      return replaced;
    } catch (error) {
      console.log("Theres an Error: ", error);
      return null;
    }
  }

  async getItem(itemId) {
    try {
      console.log('Getting an item from the database')
      const {
        resource
      } = await this.container.item(itemId, partitionKey).read();
      return resource;
    } catch (error) {
      console.log("Theres an Error: ", error);
      return null;
    }
  }

  async deleteItem(itemId) {
    try {
      console.log('Delete an item from the database')
      const {
        resource
      } = await this.container.item(itemId, partitionKey).delete();
      console.log(resource);
      return resource;
    } catch (error) {
      console.log("Theres an Error: ", error);
      return null;
    }
  }
}

module.exports = videoJuegoModel;