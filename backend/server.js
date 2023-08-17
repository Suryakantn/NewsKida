import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config.json" assert { type: "json" };
import fetch from "node-fetch";
app.use(cors({ origin: true }))
app.use(bodyParser.json());
app.listen(config.port, () => [
    console.log(`listening on ${config.port}`)
]);
app.get('/', (req, res) => {
    res.send('HHIHIHI')
})
app.post('/getnews', async (req, res) => {
    console.log('req', req.body);
    let news = await getNewsApi(req.body);
    console.log('req', news);
    res.send(news);
})
async function getNewsApi(req) {
    try {
        const newsapikey = config.REACT_APP_NEW_API_KEY;
        let url = `https://newsapi.org/v2/top-headlines?country=${req.country}&category=${req.category}&apiKey=${newsapikey}&page=${req.page}&pageSize=${req.pageSize}`;
        let fetchRes = await fetch(url);
        return fetchRes.json();
    } catch (error) {
        return error.message;
    }
}
