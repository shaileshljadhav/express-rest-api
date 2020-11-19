const express = require('express');
const router = express.Router();
const mySqlCommection = require('../connection');

router.get('/', (req,res) => {
    mySqlCommection.query('select * from employees', (err, rows, fields) => {
        if(!err){
            //res.send(rows);
            res.send(JSON.stringify({"status": 200, "error": null, "data": rows}));
        }else{
            console.log(err);
        }
    });
});

router.get('/:id',(req, res) => {
  let sql = "select * from employees where id="+req.params.id;
  mySqlCommection.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

router.post('/', (req,res) => {
    let data = {name: req.body.name, email: req.body.email, mobile: req.body.mobile};
    let sql = "INSERT INTO employees SET ?";
    mySqlCommection.query(sql, data,(err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

router.put('/:id',(req, res) => {
  let sql = "UPDATE employees SET name='"+req.body.name+"', email='"+req.body.email+"', mobile='"+req.body.mobile+"' WHERE id="+req.params.id;
  mySqlCommection.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 202, "error": null, "data": results}));
  });
});

router.delete('/:id',(req, res) => {
  let sql = "DELETE FROM employees WHERE id="+req.params.id+"";
  mySqlCommection.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

module.exports = router;