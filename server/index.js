var app = require('express')();
var mongoose = require('mongoose');
var Match = require('./models/match');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://admin:admin@ds135810.mlab.com:35810/smashcentral');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/match/:id', function(req, res) {
    Match.find({ _id: req.params.id }, function(err, matches) {
        if(err) throw err;
        res.send(matches);
    });
});

app.get('/api/allmatches', function(req, res) {
    Match.find({ hidden: false }, function(err, matches) {
        if(err) throw err;
        res.send(matches);
    });
});

app.post('/api/match', function(req, res) {
    console.log(req.body.post)
    var today = new Date();
    var newMatch = Match({
        post: {
            host: req.body.post.host,
            code: req.body.post.code,
            location: {
                country: req.body.post.location.country,
                state: req.body.post.location.state,
                city: req.body.post.location.city
            },
            main: req.body.post.main,
            description: req.body.post.description
        },
        created_at: today
    });
    newMatch.save(function(err) {
        if (err) throw err;
        res.send('match created!');
    });
});

app.patch('/api/match/:id', function(req, res) {
    Match.findOneAndUpdate({ _id: req.params.id }, { hidden: true }, function(err, match) {
        if (err) throw err;

        res.send('match hidden!');
    })
})

app.delete('/api/match/:id', function(req, res) {
    Match.find({ _id: req.params.id }, function(err, match) {
        if (err) throw err;
        match.remove(function(err) {
            if (err) throw err;

            res.send('Match deleted!');
        })
    })
})

 app.listen(3000);