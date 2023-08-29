const MindsDB = require('mindsdb-js-sdk').default;

let models = require('./models');
const prettify = require('../util/prettify')

const partitions = (article) => {
    function splitArticleIntoDynamicPieces(article, pieces) {
        const sentences = article.split(/(?<=\.|\?|\!|\,)\s+/); // Split article into sentences
        const sentencesPerPiece = Math.ceil(sentences.length / pieces);
        const result = [];

        let currentPiece = "";
        let sentencesInCurrentPiece = 0;

        for (const sentence of sentences) {
            if (sentencesInCurrentPiece < sentencesPerPiece) {
                currentPiece += " " + sentence;
                sentencesInCurrentPiece++;
            } else {
                result.push(currentPiece.trim());
                currentPiece = sentence;
                sentencesInCurrentPiece = 1;
            }
        }

        if (currentPiece) {
            result.push(currentPiece.trim());
        }

        return result;
    }

    const pieces = Math.floor(article.length / 2500); // 2500 tokens per query 
    const dynamicPieces = splitArticleIntoDynamicPieces(prettify(article), pieces);
    return dynamicPieces;
}


module.exports = async (article, isVideo) => {
    try {
        let summarizeModel;
        let compineModel;

        const modelList = await models();
        if (isVideo) {
            summarizeModel = modelList.video_summarization_model;
            compineModel = modelList.video_summarization_model_compine;
        } else {
            summarizeModel = modelList.text_summarization_model;
            compineModel = modelList.text_summarization_model_compine;
        }
        article = prettify(article);
        const articleArray = partitions(article); // an array of article splited in equal parts 

        if (articleArray.length === 1) {
            const result = await summarizeModel.query({
                where: [
                    `article = "${articleArray[0]}"`
                ]
            });

            return result.value;
        }


        const initalArrayQueries = [];
        for (let i = 0; i < articleArray.length; i++) {
            const query = {
                where: [
                    `article = "${articleArray[i]}"`
                ]
            };
            initalArrayQueries.push(query);
        }
        const queryPromises = initalArrayQueries.map(query => summarizeModel.query(query));
        let results = await Promise.all(queryPromises);

        results = results.map(res => res.value.replaceAll('"', "'"));

        if (results.length % 2 === 1) {  // TODO: make sure this don't have bugs. 
            const compined = await compineModel.query({
                where: [
                    `part1 = "${results[results.length - 1]}"`,
                    `part2 = "${results[results.length - 2]}"`
                ]
            });
            results.pop();
            results.pop();
            results.push(compined.value.replaceAll('"', "'"));
        }

        let treeHeight = Math.floor(results.length / 2);
        let queryArr = [];

        for (let level = 0; level < treeHeight; level++) {

            queryArr = [];
            // console.log('at level: ', level, ', nodes numbers are: ', results.length );
            for (let step = 0; step < results.length - 1; step += 2) {
                const compined = {
                    where: [
                        `part1 = "${results[step]}"`,
                        `part2 = "${results[step + 1]}"`
                    ]
                };
                queryArr.push(compined);
                // console.log('compine query, ', compined);
            }
            const queryPromises = queryArr.map(query => compineModel.query(query));
            results = await Promise.all(queryPromises);

            results = results.map(res => res.value.replaceAll('"', "'"));
        }
        return results[0];
    } catch (err) {
        // console.log(Object.keys(err));
        const error = new Error(`Error with summarization service ${err}`);
        // console.log('err on summarize service ', err);
        throw error;
    }
}

