const express = require('express')
const app = express()
var mysql = require('mysql')
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'node_blog'
});

connection.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine', 'pug')


app.get('/', function (req, res) {
  res.send('Tayee Blog!')
})

app.get('/posts',function(req,res){
	connection.query('SELECT * FROM posts', function (error, results, fields) {
	  if (error) throw error;
	  console.log(results);
	  res.render('index', { posts: results });
	});
})


app.get('/posts/:id',function(req,res){
	connection.query("SELECT * FROM posts where id = " + req.params.id,function (error, results, fields) {
	  if (error) throw error;
	  console.log(results);
	  res.render('show', { post: results[0] });
	});
})

app.get('/admin/posts/create', function (req, res) {
	res.render('create', { title: 'Hey', message: 'Hello there!' })
})

app.post('/admin/posts',function(req,res){
	let postData = req.body;
	connection.query('INSERT INTO posts SET ?',postData, function (error, results, fields) {
	  if (error) throw error;
	  postId = results.insertId;
	  res.redirect('/posts/' + postId);
	});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})