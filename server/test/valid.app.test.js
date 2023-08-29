// async function main() {
const { app, init } = require('../app');
const request = require('supertest');
const { article } = require('./test_data.json');


describe('Basic Service API', () => {
    beforeAll(async () => {
        await init();
    }, 20000);

    const inputs = [
        {
            route: '/summarize/url',
            input: { url: 'https://bluepnume.medium.com/intentionally-unleashing-zalgo-with-promises-ab3f63ead2fd', }
        }, {
            route: '/summarize/youtube-video',
            input: { url: 'https://www.youtube.com/watch?v=r6tH55syq0o' }
        }, {
            route: '/email/reply',
            input: { email: "Hi Abdallah, how you're doing?", }
        }, {
            route: '/explain',
            input: { keyword: 'nutella', }
        }, {
            route: '/text/summarize',
            input: { text: article, }
        }, {
            route: '/text/longer',
            input: { text: 'nutella', }
        }, {
            route: '/text/shorter',
            input: { text: article, }
        }, {
            route: '/text/proofread',
            input: { text: article, }
        },
    ];

    inputs.forEach(i => {
        const { route, input } = i;
        it(`POST ${route} with a valid text`, async () => {
            let response = await request(app)
                .post(route)
                .send(input)
                .expect('Content-Type', /json/);

            response = response.body;
            expect(response).toHaveProperty('text');
            expect(response.text).not.toBeNull();
            expect(response.text).not.toBeUndefined();
            expect(typeof (response.text)).toEqual(typeof ('.'));
        }, 60000);
    })

});
