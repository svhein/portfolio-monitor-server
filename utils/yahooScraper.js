const axios = require('axios');
const cheerio = require('cheerio');

const yahooHeaderContent = ['^GSPC', '^DJI', '^IXIC', '^RUT', 'GC=F', 'SI=F', 'EURUSD=X',
                            '^TNX', 'GBPUSD=X', 'JPY=X', 'BTC-USD', '^CMC200', '^FTSE',
                            'BTC-USD', '^N225']

getData = function(ticker) {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9,fi-FI;q=0.8,fi;q=0.7',
      'Referer': `https://finance.yahoo.com/quote/${ticker}?p=${ticker}`,
      'Upgrade-Insecure-Requests': '1',
      'Origin': 'https://finance.yahoo.com',
      'Sec-Fetch-Site': 'same-site'
    };
  
    const requestOptions = {
      headers: headers
    };
  
    return fetch(`https://finance.yahoo.com/quote/${ticker}/`, requestOptions)
      .then(response => response.text())
      .then(response => {
        let changePercent = 0;
        const $ = cheerio.load(response);
        console.log('Finding ticker ' + ticker);
  
        let value = $(`fin-streamer[data-symbol=${ticker}]`).first().attr('value') * 1;
        changePercent = $(`fin-streamer[data-symbol=${ticker}]:nth-child(2)`).first().attr('value') * 100;
  
        console.log('Value: ' + value + '; Changepercent ' + changePercent);
  
        return {
          ticker: ticker,
          value: value,
          changePercent: changePercent
        };
      })
      .catch(error => console.log('Error while scraping Yahoo: ' + error.message));
  };


exports.getData = getData;