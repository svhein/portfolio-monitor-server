const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const yahooScraper = require('./utils/yahooScraper')
const yahooTickerQuery = require('./utils/yahooTickerQuery')
const defaultPortfolio = require('./defaultPortfolio.json')

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/:ticker', async (req, res) => {
    const ticker = req.params.ticker;
    console.log(ticker + ' data request')
    const price = await yahooScraper.getData(ticker); 
    console.log('Price: ' + price);
    res.send(price);
})

app.get('/search/:input', async (req, res) => {
    const input = req.params.input;
    const tickers = await yahooTickerQuery.searchTickers(input);
    console.log(input +  ' ;Searchresults: ' + tickers);
    // console.log(tickers[0])
    res.set(
        {"Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true }  
    )
    res.send(tickers)
})

app.get('/portfolio/default', async (req, res) => {
    res.send(defaultPortfolio)
})

app.listen(8000);