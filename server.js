const express = require("express");
const session = require('express-session');

var db = require("./db")


// setup the app object
const app = express();
const PORT = 3006


app.use(express.static("resources"));
// Parse URL-encoded bodies requires express 4.16+
// (older versions of express had external libraries for this)
app.use(express.urlencoded({extended:true})); 
app.use(session({secret:"oauhsdlmfnaliustydfialjbkwegf"}))

app.set("views", "templates");
app.set("view engine", "pug");

// routes
app.get("/", function(req, res) {
    // send to template.
    res.redirect("/main")
});

app.get("/main", async function(req, res) {
  let optradio = req.query.optradio || 'all';
  req.session.optradio = optradio;
  let ToDoLists = await db.getToDoList(optradio)

  let message =  req.session.message || '';
  let message_bool =  req.session.message_bool || false;
  req.session.message = '';
  req.session.message_bool = false;

  let today = new Date;  
  today = today.getTime(); // utc time

  for (let i = 0; i < ToDoLists.length; i++) {
    ToDoLists[i].dueDate.setHours(18); // set hours to T00:00:00 so due date is until TODAY
    ToDoLists[i].date = ToDoLists[i].dueDate.getTime(); 
    ToDoLists[i].dueDate = ToDoLists[i].dueDate.toDateString();
  }
  res.render("main.pug", {ToDoLists: ToDoLists, optradio:optradio, today:today, message:message, message_bool:message_bool});
});

// ADD item
app.post("/main", async function(req, res) {
  let todo = req.body.todo || null;
  let due = req.body.due || null;

  try {
    await db.addToDoList(todo, due);
  } catch(err) {
    req.session.message = 'Please fill in both title and date';
    req.session.message_bool = true
  }

  res.redirect('/main')
});

// DELETE item
app.post("/main/:id", async function(req, res) {
  let id = req.params.id;
  try {
    await db.removeToDoList(id);
  } catch(err) {
    throw err;
  }
  req.session.message = '';
  req.session.message_bool = false;
  res.redirect("/main")
});

// PUT status item STATUS
app.put("/main/put/:id/:value", async function(req, res) {
  let id = req.params.id;
  let value = req.params.value;
  console.log(id, value)
  try {
    await db.updateStatus(value, id);
  } catch(err) {
    throw err;
  }
});

// Start the web server
app.listen(PORT, function() {
   console.log(`Listening on http://localhost:${PORT}`);
});