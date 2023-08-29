let models = require('./models');

module.exports = async (header) => {
    try {
        const query = {
            where: [
                `text = "${header}"`
            ]
        };
        
        let explainModel = undefined;
        const modelList = await models();
        explainModel = modelList.explain_model;

        if (!explainModel) {
            throw new Error('modles are not ready');
        }

        const result = await explainModel.query(query);
        return result.value;
    } catch (err) {
        throw new Error (`err on explain: ${err}`);
    }
}