const axios = require('axios');
const cheerio = require('cheerio');

const yahooHeaderContent = ['^GSPC', '^DJI', '^IXIC', '^RUT', 'GC=F', 'SI=F', 'EURUSD=X',
                            '^TNX', 'GBPUSD=X', 'JPY=X', 'BTC-USD', '^CMC200', '^FTSE',
                            'BTC-USD', '^N225']

getData = function(ticker){
    return axios(`https://finance.yahoo.com/quote/${ticker}/`)
        .then(response => {
            const html = response.data
            let changePercent = 0
            const $ = cheerio.load(html);
            console.log('Finding ticker ' + ticker)
            
            let value = $(`fin-streamer[data-symbol=${ticker}]`).first().attr('value');  

            if (yahooHeaderContent.includes(ticker)){
                changePercent = $(`fin-streamer[data-symbol=${ticker}]:nth-child(2)`).first().attr('value');
            } else {
                changePercent = $(`fin-streamer[data-symbol=${ticker}]:nth-child(3)`).first().attr('value') * 100;
            }
            
    
            console.log('Value: ' + value + '; Changepercent ' + changePercent);
            return [value, changePercent];
        },
        error => console.log('VIRHE ' + error.message))        
}
exports.getData = getData;