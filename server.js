var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var crypto = require('crypto');

var articles = {
    'article-one': {
        title: 'Article One | Revathi',
        heading: 'Article One',
        date: 'August 16, 2017',
        content: `<p>
                        This is the first HTML page created using code console. First link the HTML file with the server file. Commit the changes to the server and restart the server. Then view the HTML file and its content using the URL on a browser.
                    </p>
                    <p>
                        This is the first HTML page created using code console. First link the HTML file with the server file. Commit the changes to the server and restart the server. Then view the HTML file and its content using the URL on a browser.
                    </p>
                    <p>
                        This is the first HTML page created using code console. First link the HTML file with the server file. Commit the changes to the server and restart the server. Then view the HTML file and its content using the URL on a browser.
                    </p>`
    },
    'article-two': {
        title: 'Article Two | Revathi',
        heading: 'Article Two',
        date: 'August 19, 2017',
        content: `<p>
                        This is the second HTML page created using code console. First link the HTML file with the server file. Commit the changes to the server and restart the server. Then view the HTML file and its content using the URL on a browser.
                    </p>
                    <p>
                        This is the secocnd HTML page created using code console. First link the HTML file with the server file. Commit the changes to the server and restart the server. Then view the HTML file and its content using the URL on a browser.
                    </p>
                    <p>
                        This is the second HTML page created using code console. First link the HTML file with the server file. Commit the changes to the server and restart the server. Then view the HTML file and its content using the URL on a browser.
                    </p>`
    },
    'article-three': {
        title: 'Article Three | Revathi',
        heading: 'Article Three',
        date: 'August 18, 2017',
        content: `<p>
                        This is the third HTML page created using code console. First link the HTML file with the server file. Commit the changes to the server and restart the server. Then view the HTML file and its content using the URL on a browser.
                    </p>
                    <p>
                        This is the third HTML page created using code console. First link the HTML file with the server file. Commit the changes to the server and restart the server. Then view the HTML file and its content using the URL on a browser.
                    </p>
                    <p>
                        This is the third HTML page created using code console. First link the HTML file with the server file. Commit the changes to the server and restart the server. Then view the HTML file and its content using the URL on a browser.
                    </p>`
    },
};
function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `<!Doctype html>
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href=/>Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;    
    return htmlTemplate;
}

function hash (input, salt)
//how do we create a hash?
{
   var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
   return hashed.toString('hex');
}
app.get('/hash/:input', function(req, res)
  {
      var hashedString = hash(req.params.input, 'this-is-some-random-string');
      res.send(hashedString); 	
  }
);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter=counter + 1;
    res.send(counter.toString());
});

app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
