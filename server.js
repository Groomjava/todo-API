var express = require('express');
var bodyparser = require('body-parser');
var _ = require('underscore');
var app = express();

var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;


app.use(bodyparser.json());


app.get('/', function(req,res){
	res.send('To do API Root');
});

//GET todos
app.get('/todos', function(req,res){
	res.json(todos);
});

//GET todos/:id

app.get('/todos/:id', function(req,res){
	var todoId = parseInt(req.params.id, 10);
	/*var matchedTodo ;
	 refactored using _ js
	todos.forEach(function(todo){
		if(todoId === todo.id){
			matchedTodo = todo;
		}
	});

	
*/
	var matchedTodo = _.findwhere(todos, {id: todoId});
	if(matchedTodo){
		res.json(matchedTodo);
	} else
	{
		res.status(404).send();
	}
});

//POST  /todos

app.post('/todos', function(req, res){


	var body = _.pick(req.body, 'description', 'completed');

	/*body.id = todoNextId;
	todoNextId ++
	or
	*/
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}

	body.description = body.description.trim();
	body.id = todoNextId++;
	todos.push(body);
	res.json(body);


});

app.listen(PORT, function(){
	console.log('Express listing on port '+ PORT +'!');
});