// variables
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const urlEncoded = bodyParser.urlencoded({extended: false})
const dummyData = [{taskItem: "Week 1" },{taskItem: "Week 2"},{taskItem: "Week 3"}];
const mysql      = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'pablo',
  database : 'websiteblog'
});



db.connect(function(err){
    if (err) throw err
    console.log("My SQL is connected, looking good")
});

app.set("view engine","ejs");

app.use(express.static('./public'));

// ############### ROUTES ##############






app.get('/', (req, res) => {
    let sql = 'SELECT * FROM profile'
    db.query(sql, function (err, results) {
        if (err) throw err;
        res.render('blog', {taskToDo: results});
    }); 
});




app.get('/mblog', (req, res) => {

    res.render('mblog');
});

app.get('/blog', (req, res) => {

    res.render('blog', {taskToDo: results})
});


app.post('/blog', urlEncoded, (req, res) => {
    let task = req.body
    console.log(task)
    let sql = 'INSERT INTO profile SET ?';
    db.query(sql, task, function (err, results) {
         if (err) throw err;
         console.log(results)
         res.redirect('/')
        });
});






app.delete("/blog/:id", (req, res) => {
    let sql = 'DELETE FROM profile WHERE ID=' + req.params.id;
    db.query(sql,(err, result) =>{
        if(err) throw err;
        console.log(result);
        res.json(result)
       })
    });

app.listen(3000, function(err){
    if (err)
        console.log(err)
    console.log('Server is live on port 3000')
})