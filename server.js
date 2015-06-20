/**
 * Created by k1 on 6/17/15.
 */
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');


/*app.get('/', function (request, response) {
 response.send('Hello World from js .')
 });*/

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/contactlist', function (request, response) {
    console.log('contactlist received get request !!!');
    db.contactlist.find(function (err, doc) {
        response.json(doc);
    });
});


app.post('/contactlist', function (request, response) {
    console.log(request.body);
    db.contactlist.insert(request.body, function (err, doc) {
        response.json(doc);
    })

});

app.delete('/contactlist/:id', function (request, response) {
    var id = request.params.id;
    console.log('ID : ' + id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        response.json(doc);
    });
});

app.get('/contactlist/:id', function (request, response) {
    var id = request.params.id;
    console.log('Update contactID : ' + id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        response.json(doc);
    });
});


app.put('/contactlist/:id', function (request, response) {
    var id = request.params.id;
    console.log('put contact id : ', id, ' name : ' + request.body.name);

    db.contactlist.findAndModify({
        query: {
            _id: mongojs.ObjectId(id),
            update: {$set: {name: request.body.name, email: request.body.email, number: request.body.number}},
            new: true
        }
    }, function (err, doc) {
        response.json(doc);
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('ContactList running at http://%s:%s', host, port);

});