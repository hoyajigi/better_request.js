var test1 = require('./new_example_curl')

test1.http_request('http://nms.media.daum.net/service/api/news_read.js?newsId=20140207163007422&textContentYn=Y&removeTagYn=Y&nitfYn=N',function(str){console.log(str)});
