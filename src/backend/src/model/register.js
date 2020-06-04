//user regisrtation
Register = (title,first_name,last_name,email, password,confirmPassword,acceptTerms) =>
 {
var mysql = require('mysql');  
var con = mysql.createConnection({  
host: "localhost",  
user: "root",  
password: "iiht",  
database: "candidate"  
});  
return con.connect(function(err,result) {  
if (err) throw err;  
console.log("Connected!");  
var sql = "INSERT INTO candidate VALUES(?,?,?,?,?,?,?);";  

con.query(sql,[title,first_name,last_name,email,password,confirmPassword,acceptTerms],function (err, result) {  
if (err) throw err; 
console.log("Registeration successful"); 
return result[0].email
});  
return result;
});

}
//login
logInData = (email,password)=>{
    var mysql = require('mysql');  
    var con = mysql.createConnection({  
    host: "localhost",  
    user: "root",  
    password: "iiht",  
    database: "candidate"  
    });  
    con.connect(function(err) {  
    if (err) throw err; 
    console.log("Connected!");
    var sql = "select email,password from candidate where email=? and password=?;";
    con.query(sql,[email,password],function (err,results) {  
        if (err) throw err;
        console.log(results)
    });
    }); 
}
module.exports.Register = Register
module.exports.logInData = logInData
