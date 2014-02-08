

exports.http_request = function(url, callback) {
    var spawn = require('child_process').spawn;
    var Iconv = require('iconv').Iconv;
    var charsetDetector = require("node-icu-charset-detector");

    //  var url = ; // euc-kr 문서

    var curl = spawn('curl', [url]);

    var body = '';
    var str_err = null;

    curl.stdout.setEncoding('binary'); // euc-kr 문서는 binary 로 출력해야됨
    curl.stdout.on('data', function(chunk) {
        body += chunk;
    });

    curl.stderr.on('data', function(err) {
        if (str_err === null) {
            str_err = '';
        }
        str_err += err;
    });

    curl.on('close', function(code) {

        if (code != 0) {
            console.log('Failed: ' + code);
            //console.log(err);
        } else {



            //var buffer = new Buffer(body.length);

            var charset = charsetDetector.detectCharset(new Buffer(body, "binary"));


            if (charset.toString() == "EUC-KR") {
                var escape_text = escape(body);
                var toUTF8 = new Iconv('euckr', 'utf8//TRANSLIT//IGNORE');

                var toHex = function(n) {
                    return parseInt('0x' + n);
                };

                var str = escape_text.replace(/(%([^%]{2}))+/gim, function(chars) {
                    var b;

                    b = new Buffer(chars.split('%').slice(1).map(toHex));

                    var utf8_str = toUTF8.convert(b).toString();

                    return utf8_str;
                });
            } else {
                str = new Buffer(body, 'binary').toString('utf-8');
            }
            callback(str); // 한글이 잘 나옴..
        }

    });
}
