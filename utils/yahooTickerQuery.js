

searchTickers = async function(ticker){

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

    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${ticker}&lang=en-US&region=US&quotesCount=6&newsCount=2&listsCount=2&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true&enableResearchReports=true&researchReportsCount=2`;
    return fetch(url, params)
        .then(response => response.json())
        .then(response => {
            response = response.quotes;
            response = response.filter(quote => quote.hasOwnProperty('symbol') == true);
            return response
        }, error => console.log('Error while searching tickers ' + error.message))
}


exports.searchTickers = searchTickers;