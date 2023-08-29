let models = require('./models');

module.exports = async (email, name)=> {
    try {
        const query = {
            where: [
                `body = "${email}"`,
                `name = "${name}"`
            ]
        };

        let emailReplyModel;
        const modelList = await models();
        emailReplyModel = modelList.email_reply_new; 
        
        if (!emailReplyModel) {
            throw new Error('modles are not ready');
        }

        const reply = await emailReplyModel.query(query);
        return reply.value;
    } catch (err) {
        throw err;
    }
}
