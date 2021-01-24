let express = require('express');
let bodyParser = require('body-parser');
let rootURL = '/';
const PORT = process.env.PORT || 80;

let app = express();

let fs = require('fs').promises;
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented: true}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})


// app.get(rootURL, function(req, res) {
//     fs.readFile(__dirname + "/index.html")
//         .then(contents => {
//             res.setHeader("Content-Type", "text/html");
//             res.writeHead(200);
//             res.end(contents);
//         })
//
// });
// app.get(rootURL + 'style.css', function(req, res) {
//     res.sendFile(__dirname + "/style/style.css");
// });
// app.get(rootURL + 'bundle.js', function(req, res) {
//     res.sendFile(__dirname + "/bundle.js");
// });
app.get(rootURL + 'cities', (req, res) => {
    collection.find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs)
    })
})
app.delete(rootURL + ':id', (req, res) => {
    collection.deleteOne({_id: ObjectId(req.params.id)}, (err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
})
app.post(rootURL + 'add', (req, res) => {
    if (req.body.name) {
        let city = {
            name: req.body.name
        }
        collection.insertOne(city, (err, result) => {
            if (err) {
                return res.sendStatus(500);
            } else {
                res.send(result.ops[0]._id);
            }
        })
    }

})
app.put(rootURL + ':id', (req, res) => {
    collection.updateOne({_id: ObjectId(req.params.id)}, {$set: {
            name: req.body.name
        }}, (err) => {
        if (err) {
            return res.sendStatus(500);
        }
        res.sendStatus(200);

    })
})


client.connect(function (err) {

    collection = client.db("weatherDB").collection("cities");
    console.log('Connected successfully to server...');
    app.listen(PORT, () => {
        console.log('API started at port', PORT);
    });

})

