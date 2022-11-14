// https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/tutorial-nodejs-web-app#create-new-app
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
    console.log('Setting up the container '+ CONTAINER_ID +' ...done!');

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
    item.date = Date.now()
    const {
      resource: doc
    } = await this.container.items.create(item)
    return doc
  }

  async updateItem(itemId) {
    console.log('Update an item in the database')
    const doc = await this.getItem(itemId)
    doc.completed = true

    const {
      resource: replaced
    } = await this.container
      .item(itemId, partitionKey)
      .replace(doc)
    return replaced
  }

  async getItem(itemId) {
    console.log('Getting an item from the database')
    const {
      resource
    } = await this.container.item(itemId, partitionKey).read()
    return resource
  }
}

module.exports = videoJuegoModel;