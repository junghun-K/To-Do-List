// // This is an entirely fake version of this database file.
// // Your job will be to rewrite this file to use an actual database.
// // You'll know you've done it when you can restart the server and still use it!
var mysql = require("mysql");

var connPool = mysql.createPool({
  connectionLimit: 5, // it's a shared resource, let's not go nuts.
  host: "127.0.0.1", // "cse-mysql-classes-01.cse.umn.edu" OR "127.0.0.1" with port forwarding
  user: "C4131F22U53",
  database: "C4131F22U53",
  password: "admin" // we really shouldn't be saving this here long-term -- and I probably shouldn't be sharing it with you...
});

async function getToDoList(status) {
  return new Promise((resolve, reject)=>{
    let sql = 'select * from ToDoList ORDER BY dueDate ASC';
    if (status != 'all') {
      sql = 'select * from ToDoList where status=? ORDER BY dueDate ASC';
      if (status == 'active') {
        status = 0;
      } else {
        status = 1;
      }
      connPool.query(sql, status, (err, rows)=> {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    } else {
      connPool.query(sql, (err, rows)=> {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    } 
  })
}
exports.getToDoList = getToDoList

async function addToDoList(todo, dueDate) {
  return new Promise((resolve, reject)=>{
    const sql = 'insert into ToDoList (todo, dueDate) values (?, ?)';
    connPool.query(sql, [todo, dueDate], (err, rows)=>{
      if (err) {
        // console.log('error')
        reject(err);
      } else {
        // console.log('resolved')
        resolve(rows)
      }
    })
  })
}
exports.addToDoList = addToDoList

async function removeToDoList(id) {
  return new Promise((resolve, reject)=>{
    const sql = 'delete from ToDoList where id = ?';
    console.log(id);
    connPool.query(sql, [id], (err, rows)=>{
      if (err) {
        // console.log('error')
        reject(err);
      } else {
        // console.log('resolved')
        resolve(rows)
      }
    })
  })
}
exports.removeToDoList = removeToDoList

async function updateStatus(value, id) {
  return new Promise((resolve, reject)=>{
    let sql = 'update ToDoList set status=? where id=?';
    connPool.query(sql, [value, id], (err, rows)=> {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}
exports.updateStatus = updateStatus
