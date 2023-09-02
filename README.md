# Wizard AI is an AI assistant that helps save your time. 
Full demo: 


https://github.com/7adidaz/Wizard/assets/86894852/01534011-133f-4531-93ba-d1336dbab631


Summarizing a video demo: 

https://github.com/7adidaz/Wizard/assets/86894852/eca6e004-e914-464c-9ee1-d0c8fe9c3b85

Summarizing an article demo: 

https://github.com/7adidaz/Wizard/assets/86894852/7dd64f75-84ab-4c3e-817e-6077b70dd359

Replying to an Email demo: 

https://github.com/7adidaz/Wizard/assets/86894852/11ed2d67-fc8c-4032-9def-5ed02d884984

Summarizing a text demo: 

https://github.com/7adidaz/Wizard/assets/86894852/3c2c03fa-5ce4-4ea7-8a0f-66cdf03d3e22

Explaining something demo:

https://github.com/7adidaz/Wizard/assets/86894852/6f7c8925-12fa-43a1-aad8-97930eefdaa2

### How to install the extension? 

https://github.com/7adidaz/Wizard/assets/86894852/ce634214-9fd2-4148-a277-be7b5517debc

1. Downloads the extension from the [extension](./extension) folder
2. Go to the extension manager in your browser
3. Enable **Developer mode**
4. Choose **Load unpacked**
5. Choose the downloaded folder as the extension directory

### What is the best way to use the extension? 
- Don't try to summarize videos longer than 20 minutes (it will just make you wait, then respond with an error!).
- Article summary only works for websites with the `<article>` tag (we extract the article from the tag and its children).
- For all text-related services, please don't try to put text that is longer than 2500 characters, it will just reject the request!

### Technologies & Packages used: 
-   Node.js 
    - Mindsdb-js-sdk
    - Node-cache
    - Mongoose (YES! We cache YouTube videos' summaries)
    - Node-html-parser
    - Youtube-transcript
    - Jest 
-   React 
    - Axios
    - Chrome API 
    - Mantine


### How do you duplicate the server? 
1.  Make an [MindsDB](https://mindsdb.com) demo Account
2.  Run this SQL command, but! change the model's name with the corresponding prompt template.

```SQL 
CREATE MODEL -- ADD A MODlE NAME FROM THE TABLE
PREDICT highlights
USING
    engine = 'openai',
    -- prompt_template = 'CHANGE THIS WITH prompt_template FROM THE TABLE'
```

|model_name|prompt_tamplate|
|---|---|
|email_reply_new|' From input message -finishes with a set of 5 colons-: {{body}} ::::: In less than 500 characters, write an email response in the following format: Start with a proper salutation and respond with a short message in a casual tone, and sign the email with my name: {{name}}'|
|explain_model|'Explain this text text:{{text}}. in these than 500 words, using full sentences'|
|text_summarization_model|'provide an informative summary of the text text:{{article}} using full sentences'|
|text_summarization_model_compine|' Given two summarizations of the same article each part corresponds to two parts of the article, part 1 and part 2, combine the two parts summarization into one summarization. part 1:{{part1}}, part 2:{{part2}} using full sentences'|
|video_summarization_model|' Given a transcript of a video, provide an informative summary of the text:{{article}} using full sentences'|
|video_summarization_model_compine|' given two summarizations of a video transcript where each part corresponds to two parts of the same video, part 1 and part 2, combine the two parts summarization into one summarization. part 1:{{part1}}, part 2:{{part2}} using full sentences'|

3. Add .env file to the [server](./server) directory 
4. Add the environment variables such as `MindsDB_EMAIL` and `MindsDB_PASSWORD` to the .env file
5. Use this [tutorial](https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database) to connect your mongo  and add your `MONGODB_URI` to the .env file; for the mongo to work as cashe :).

Now the .env file should look like this: 
```text 
# .env file
MONGODB_URI="mongodb+srv://YOUR_NAME:PASSWORD@cluster0.XXXXX.mongodb.net/extension"
MindsDB_EMAIL="YOUR_MINDSDB_EMAIL"
MindsDB_PASSWORD="YOUR_MINDSDB_PASSWORD"
```

6. Change the .env file in the [extension_source](./extension_source) to have your api's link.
7. **Voila**! it works!

This project was for a hackathon conducted by the amazing people in [MindDB](https://mindsdb.com/) 
