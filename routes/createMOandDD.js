
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
var builder = require('xmlbuilder');
exports.createMOandDD = function(req, res){
	if(req.session.user && (req.session.uclass==1)){ 
	var filePath = path.join( __dirname, '../download' );
	//console.log("before : "+req.session.user);
	var origin_Fname = req.query.filename.split(".")[0];
	var _md5 = md5(fs.readFileSync(filePath+"/"+req.query.filename));
	var d = new Date();
	var nowTime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	var strDateTime = req.query.time;
	var myDate = new Date(strDateTime);
	
	var xml = builder.create('root')
	  .ele('MO')
	    .ele('FileName', req.query.filename)
	    .up()
	    .ele('md5Hash' , _md5)
	    .up()
	    .ele('CreatedTime' , nowTime)
	    .up()
	    .ele('UploadTime' , myDate.toLocaleString())
	    .up()
	   .up()
	  .ele('DD')
	  	.ele('cloudPath' , "http://linuxit.com/firmware")
	  .end({ pretty: true});
	console.log(xml);
	fs.writeFileSync(filePath+'/'+origin_Fname+'.xml',xml,encoding='utf-8');
	
		res.send("<script>alert('생성되었습니다.');location.href='/firmware';</script>");
	}
	else{
		res.send("<script>alert('인증되지 않은 접근입니다.');location.href='/';</script>");
	}
		
	
};