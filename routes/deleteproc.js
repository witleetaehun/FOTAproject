
/*
 * GET users listing.
 */
var fs = require('fs')
, path = require('path')
, jsonfile = require('jsonfile')
, bodyParser = require('body-parser')
, jsonfile = require('jsonfile')
, archiver = require('archiver');

exports.deleteproc = function(req, res){
	
	var origin_Fname = req.query.filename.split(".")[0];
	
	fs.exists(path.join(__dirname, '../download' , req.query.filename),function(exists){
		  // handle result
		if(exists){
			fs.unlink(path.join(__dirname, '../download' , req.query.filename), function (err) {
				if (err) throw err;
				console.log('successfully deleted');
			});
			res.send("<script>alert('삭제 되었습니다.');location.href='/firmware';</script>");
		}
		else{
			res.send("<script>alert('삭제 오류 다시 시도해주세요.);location.href='/firmware';</script>")
		}
	});
	
	
	
};