var mysql     = require('mysql');
var dbconfig  = require('./database');
var connection= mysql.createConnection(dbconfig);

exports.joinproc = function(req, res){
	var sql = "insert into user values (? , ? , sha1(?) , 0 , now())";
	var email = req.body.email;
	var name = req.body.name;
	var password = req.body.password;
	var params = [email , name , password];
	connection.query(sql,params, function(err, result) {
		if(err)
		 throw err;
		else {
			console.log(result);
			res.send("<script>alert('정상 등록되었습니다');location.href='/';</script>");
		}
	});
};
