// async function main() {
const { app, init } = require('../app');
const request = require('supertest');


describe('Failing Basic Service API', () => {
    beforeAll(async () => {
        await init();
    }, 20000);

    const inputs = [
        {
            route: '/summarize/url',
            input: {}
        }, {
            route: '/summarize/youtube-video',
            input: {}
        }, {
            route: '/email/reply',
            input: {}
        }, {
            route: '/explain',
            input: {}
        }, {
            route: '/text/summarize',
            input: {}
        }, {
            route: '/text/longer',
            input: {}
        }, {
            route: '/text/shorter',
            input: {}
        }, {
            route: '/text/proofread',
            input: {}
        },
    ];

    inputs.forEach(i => {
        const { route, input } = i;
        it(`POST ${route} with a empty input`, async () => {
            let response = await request(app)
                .post(route)
                .send(input)
                .expect('Content-Type', /text/);

            expect(response).toHaveProperty('error');
        }, 60000);
    });

});