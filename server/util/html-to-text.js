const parser = require('node-html-parser')


module.exports = async (url) => {
    try {
        let article = null;
        const res = await fetch(url);
        const text = await res.text();

        article = parser.parse(text)
        article = article.getElementsByTagName('article')[0].text

        return article
    } catch (err) {
        return undefined;
    }
}
