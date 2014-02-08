var test1 = require('./new_example_curl')

test1.http_request('http://imnews.imbc.com/rss/news/news_01.xml',function(str){console.log(str)});