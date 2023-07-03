# portfolio-monitor-server
Server for my [portfolio monitor](https://github.com/svhein/portfolio-monitor) app that mainly serves scraped data from Yahoo finance website

## Endpoints
```
GET /:ticker/
```
Returns json containing ticker price and changepercent  e.g.  `{"ticker":"KO",
                                                                  "value":60.58,
                                                                  "changePercent":0.597809}`

#

```
GET /search/:input
```
Search tickers avaible in Yahoo finance. <br> 
Returns search results, e.g `input='AAP'` returns
```json
[
   {
      "exchange":"NYQ",
      "shortname":"Advance Auto Parts Inc.",
      "quoteType":"EQUITY",
      "symbol":"AAP",
      "index":"quotes",
      "score":2518300,
      "typeDisp":"Equity",
      "longname":"Advance Auto Parts, Inc.",
      "exchDisp":"NYSE",
      "sector":"Consumer Cyclical",
      "industry":"Specialty Retail",
      "dispSecIndFlag":false,
      "isYahooFinance":true
   },
   {
      "symbol":"AAPL",
      ...
   },
   {
      "symbol":"AAPD",
      ...    
   },
   {
      "symbol":"AAPT",
      ...
   },
   {
      "symbol":"AAPL.NE",
      ...
   }
]
```
#
```
GET /portfolio/default
```
Returns [defaultPortfolio.json](https://github.com/svhein/portfolio-monitor-server/blob/master/defaultPortfolio.json) for users not signed in.






