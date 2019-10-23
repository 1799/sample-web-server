const express = require('express')
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(`${now}: ${req.method} ${req.url}`);
    fs.appendFile('server.log', log + '\n', (err) => {
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('mainternance.hbs')
// });

app.use(express.static(__dirname + '/public'));

app.get('/about', ((req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        // currentYear: new Date().getFullYear()
    });
}))

app.get('/', ((req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'Welcome to my website',
        // currentYear: new Date().getFullYear()
    });
}))
app.listen(4000, () => {
    console.log('Server is up in port 4000.')
});


// app.get('/', ((req, res) => {
//     res.send({
//         name: 'PhuBQ',
//         age: 27
//     })
// }))