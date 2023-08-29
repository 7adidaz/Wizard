let models = require('./models');

module.exports = async content => {

    try {
        const query = {
            where: [
                `text= "${content}"`
            ]
        };

        let makeitLonger;
        const modelList = await models();
        makeitLonger = modelList.make_it_longer;

        // TODO: MAKE SURE THAT THERE IS TIMEOUT FOR WAITING FOR A MODEL
        if (!makeitLonger) {
            throw new Error('modles are not ready');
        }

        const reply = await makeitLonger.query(query);
        return reply.value;
    } catch (err) {
        throw err;
    }
}
