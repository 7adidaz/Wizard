const MindsDB = require('mindsdb-js-sdk').default;
require('dotenv').config();

const userData = {
    user: process.env.MindsDB_EMAIL,
    password: process.env.MindsDB_PASSWORD
};

module.exports =  async () => {
    try {
        await MindsDB.connect(userData);
        console.log('connected to MindDB')
    }
    catch (error) {
        console.log(`error when connecting to MindsDB, error: ${error}`);
        throw(err);
    }
};
