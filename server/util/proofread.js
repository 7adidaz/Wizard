let models = require('./models');

module.exports = async content => {

    try {
        const query = {
            where: [
                `text= "${content}"`
            ]
        };

        let proofreadModel;
        const modelList = await models();
        proofreadModel = modelList.proofread_model;

        if (!proofreadModel) {
            throw new Error('modles are not ready');
        }


        const reply = await proofreadModel.query(query);
        return reply.value;
    } catch (err) {
        throw err;
    }
}
