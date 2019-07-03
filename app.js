// variables
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const urlEncoded = bodyParser.urlencoded({extended: false})
const dummyData = [{taskItem: "Week 1" },{taskItem: "Week 2"},{taskItem: "Week 3"}];
app.set("view engine","ejs");

app.use(express.static('./public'));

app.post('/blog', urlEncoded, (req, res) => { 
    let incomingItem = {};
    console.log("working")
    incomingItem.taskItem = req.body.task;
    dummyData.push(incomingItem);
    res.redirect('/blog');
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



















app.listen(3000, (err) => {
    if (err)
        console.log(err)
    console.log('Server is live on port 3000')
})  