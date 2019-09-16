const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/1995_api', {useNewUrlParser : true, useUnifiedTopology: true})

// allow express to display json
app.use(express.json());

const PersonSchema = new mongoose.Schema( {
    name: {type: String, required: true},
}, {timestamps: true });

const Person = mongoose.model('Person', PersonSchema);

// serve up the full collection of people born in 1955
app.get('/', (req, res) => {
    Person.find()
    .then(person => res.json(person))
    .catch(err => res.json(err));
});

// add a name into the database
app.get('/new/:name/', (req, res) => {
    Person.create({name : req.params.name })
    .then(() => {
        res.redirect('/')
    })
    .catch(err => res.json(err));
})

// delete a name from the database
app.get('/remove/:name/', (req, res) => {
    Person.deleteOne({name : req.params.name})
    .then(() => {
        res.redirect('/')
    })
    .catch(err => res.json(err));
})

// bring up the document of that particular person
app.get('/:name', (req, res) => {
    Person.find({name : req.params.name})
    .then(person => res.json(person))
    .catch(err => res.json(err));
})

app.listen(3333, () => console.log("we lit on 3333"))