const axios = require('axios');
const cheerio = require('cheerio');

const yahooHeaderContent = ['^GSPC', '^DJI', '^IXIC', '^RUT', 'GC=F', 'SI=F', 'EURUSD=X',
                            '^TNX', 'GBPUSD=X', 'JPY=X', 'BTC-USD', '^CMC200', '^FTSE',
                            'BTC-USD', '^N225']

getData = function(ticker){
    return fetch(`https://finance.yahoo.com/quote/${ticker}/`)
        .then(response => response.text())
        .then(response => {
            let changePercent = 0
            const $ = cheerio.load(response);
            console.log('Finding ticker ' + ticker)
            
            let value = $(`fin-streamer[data-symbol=${ticker}]`).first().attr('value');  
            changePercent = $(`fin-streamer[data-symbol=${ticker}]:nth-child(2)`).first().attr('value') * 100;

            // if (yahooHeaderContent.includes(ticker)){
            //     changePercent = $(`fin-streamer[data-symbol=${ticker}]:nth-child(2)`).first().attr('value') * 100;
            // } else {
            //     changePercent = $(`fin-streamer[data-symbol=${ticker}]:nth-child(2)`).first().attr('value') * 100;
            // }
            
            console.log('Value: ' + value + '; Changepercent ' + changePercent);
            return [value, changePercent];
        },
        error => console.log('Error while scraping yahoo ' + error.message))        
}
exports.getData = getData;