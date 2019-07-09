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

app.post('/blog', urlEncoded, (req, res) => { 
    let incomingItem = {};
    console.log("working")
    incomingItem.taskItem = req.body.task;
    dummyData.push(incomingItem);
    res.redirect('/blog');

app.get("/createposttable", (req, res) => {
    let sql = 'CREATE TABLE users (ID int NOT NULL AUTO_INCREMENT, title varchar(255), body varchar(255), PRIMARY KEY (ID))'
    db.query( sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Table created ...");
    });
});


app.get("/addpost", (req, res) => {
     let incomingItem = {};
     let post = {title: "", body: ""}
     let sql = 'INSERT INTO users SET ?';
      db.query( sql, post,  (err, result) => {
         if (err) throw err;
         console.log(result);
          res.send("first post add");
      })
  });



  });
  app.delete("/destroyer", () => {
      console.log(req.params.id);
      dummyData.splice(req.params.id, 1);
      console.log("hitting delete route");
      res.redirect('/blog')
  });
  app.delete("/blog/:id", (req, res) => {
      console.log("its getting hit")
      dummyData.splice(req.params.id, 1);
      res.json(dummyData)
  });

app.get('/blog', (req, res) => {

    res.render('blog', {taskToDo: dummyData});
});

app.get('/mblog', (req, res) => {

    res.render('mblog');
});



app.get("/moreblogs", (req, res) => {
    let sql = 'CREATE TABLE postsss (ID int NOT NULL AUTO_INCREMENT, title varchar(255), body varchar(255), PRIMARY KEY (ID))'
    db.query( sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Table created ...");
        res.redirect('/blog')
    });
});
















app.listen(3000, (err) => {
    if (err)
        console.log(err)
    console.log('Server is live on port 3000')
})  