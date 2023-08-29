let models = require('./models');

module.exports = async content => {

    try {
        const query = {
            where: [
                `text= "${content}"`
            ]
        };

        let makeitShorter;
        const modelList = await models();
        makeitShorter = modelList.make_it_shorter;

        if (!makeitShorter) {
            throw new Error('modles are not ready');
        }


        const reply = await makeitShorter.query(query);
        return reply.value;
    } catch (err) {
        throw err;
    }
}
