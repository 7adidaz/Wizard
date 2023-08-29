const MindsDB = require('mindsdb-js-sdk').default;
const cache = require('../util/cache');

async function getResult() {
    async function models() {
        const models = await MindsDB.Models.getAllModels('mindsdb');

        const modelsObject = models.reduce((acc, model) => {
            acc[model.name] = model;
            return acc;
        }, {})

        return modelsObject;
    }

    try {
        const cached = cache.get('models');
        if (cached !== undefined) {
            return cached
        }

        const result = await models();
        cache.set('models', result);

        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = getResult;
