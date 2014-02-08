var request = require('../better_request');

request('http://imnews.imbc.com/rss/news/news_01.xml', function(xml) {
    console.log(xml);
});

request('http://nms.media.daum.net/service/api/news_read.js?newsId=20140207163007422&textContentYn=Y&removeTagYn=Y&nitfYn=N', function(xml) {
    console.log(xml);
});
