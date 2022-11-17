// https://www.npmjs.com/package/@azure/cosmos/v/3.17.1
// https://learn.microsoft.com/en-us/javascript/api/overview/azure/cosmos-readme?view=azure-node-latest#insert-items
// https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/tutorial-nodejs-web-app#create-new-app
// https://learn.microsoft.com/en-us/azure/cosmos-db/index-overview
// @ts-check
const CosmosClient = require('@azure/cosmos').CosmosClient;
const config = require('../config');

// For simplicity we'll set a constant partition key
const partitionKey = 'id';

class Model {
  /**
   * Manages reading, adding, and updating in Azure Cosmos DB
   */
  constructor(containerId) {
    this.containerId = containerId;
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
    const cosmosClient = new CosmosClient({
      endpoint: config.host,
      key: config.authKey
    });
    const dbResponse = await cosmosClient.databases.createIfNotExists({
      id: config.databaseId
    });
    const database = dbResponse.database;
    const coResponse = await database.containers.createIfNotExists({
      id: this.containerId
    });
    this.container = coResponse.container;
    console.log('Setting up the container ' + this.containerId + ' ...done!');
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
      console.log('Delete an item from the database');
      //const readResources = await this.container.item(itemId, partitionKey).read();
      //console.log("readResources", readResources);
      //const deleteResource = await this.container.item(itemId, partitionKey).delete();
      //console.log("deleteResource", deleteResource);
      const queryResources = await this.container.items.query("DELETE * FROM root v where v.id = 'lahsjuyl'").fetchAll();
      console.log("queryResources", queryResources);
      return resource;
    } catch (error) {
      console.log("Theres an Error: ", error);
      return null;
    }
  }
}

module.exports = Model;