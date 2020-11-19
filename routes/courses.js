const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
    { id : 1, name: "couese 1", email: "test@test.com" },
    { id : 2, name: "couese 2", email: "test@test.com" },
    { id : 3, name: "couese 3", email: "test@test.com" },
];

// app.get('/', (req,res) => {
//     res.send("hiiii");
// });

router.get('/', (req,res) => {
    res.send(courses);
});

router.get('/:id', (req,res) => {
    //res.send(req.params);
    //res.send(req.query);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('Course does not exist');
    res.send(course);
});

router.post('/', (req,res) => {
    const schema = {
        name : Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    };
    const result = Joi.validate(req.body, schema);
    //console.log(result);
    if(result.error){
        res.status(400).send(result);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
        email: req.body.email
    }
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('Course does not exist');

    const schema = {
        name : Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(result);
        return;
    }

    course.name = req.body.name;
    course.email = req.body.email;
    res.send(course);
});

module.exports = router;