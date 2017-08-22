
/*
 * GET users listing.
 */
var fs = require('fs')
, path = require('path')
, jsonfile = require('jsonfile')
, bodyParser = require('body-parser')
, jsonfile = require('jsonfile')
, archiver = require('archiver')
, md5 = require('md5');
exports.uploadproc = function(req, res){
	var filePath = path.join( __dirname, '../download' );
	//console.log("before : "+req.session.user);
	var origin_Fname = req.query.filename.split(".")[0];
	var _md5 = md5(fs.readFileSync(filePath+"/"+req.query.filename));
	var Jfile = path.join(__dirname, '../download' , origin_Fname+".json")
	var Jobj = {
		fileName: req.query.filename ,
		md5: _md5
		};
	jsonfile.writeFile(Jfile, Jobj, function (err) {
		if(err){
			console.error(err)
		}
		else{
			res.send("<script>alert('업로드 되었습니다.');location.href='/firmware';</script>");
		}
	  
	});
		
	
};