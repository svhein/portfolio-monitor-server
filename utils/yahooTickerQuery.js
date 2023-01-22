const axios = require('axios');

searchTickers = function(ticker){
    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${ticker}&lang=en-US&region=US&quotesCount=6&newsCount=2&listsCount=2&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true&enableResearchReports=true&researchReportsCount=2`;
    return axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0;Win64) AppleWebkit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
        }
    })
        .then(response => {
            response = response.data.quotes;
            response = response.filter(quote => quote.hasOwnProperty('symbol') == true);
            //console.log(response)
            return response
        }, error => console.log('Virhe ' + error.message))
}

exports.searchTickers = searchTickers;