const jsdom = require('jsdom')


module.exports = async (url) => {
    try {
        let article = null;
        const res = await fetch(url);
        const text = await res.text();
        const dom = new jsdom.JSDOM(text);
        article = dom.window.document.querySelector('article').textContent;

        return article
    } catch (err) {
        return undefined;
    }
}
