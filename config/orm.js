// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}


// Object for all our SQL statement functions.
var orm = {
	selectAll: function(table, cb){
		connection.query("SELECT * FROM ??", [table], function(err, result){
			if(err) throw err;
			cb(result);''
		});
	},
	insertOne: function(table, columns, values, cb){
		var queryString = "INSERT INTO " + table;
		queryString += " (";
		queryString += columns.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(values.length);
		queryString += ") ";

		console.log(queryString);
		connection.query(queryString, values, function(err, result){
			if (err) throw err;
			cb(result);
		});
	},
	updateOne: function(table, objColVals, condition, cb){
		var queryString = "UPDATE " + table;
		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;
		
		console.log(queryString);
		connection.query(queryString, function(err, result){
			if (err) throw err;
			cb(result);
		});
	}
}


// Export the orm object for the model (burger.js).
module.exports = orm;