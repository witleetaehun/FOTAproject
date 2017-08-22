
/*
 * GET users listing.
 */
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');

var totalfile = new Array();
exports.device_record = function(req, res){	
  //if(req.session.user){
	  var _path = path.join(__dirname, '../download/');
	 
	  fs.readdir(_path, function (err, files) {		  
		  if(err) throw err;
		  var f_index = 0;
		  var f_length = files.length;
		  files.forEach(function(file , index) {			 
		    console.log(_path+file);
		    fs.stat(_path+file, function(err, stats) {
		    	stats["filetype"] = stats.isDirectory()==true?"directory":"file";
		    	
		    	stats["filename"]=files[index];
		    	totalfile[index] = stats;
		      console.log(index+"-"+stats);
		      if(index == files.length - 1){ // 마지막 인덱스로 조건을 걸어주지않으면 마지막 인덱스까지 값이넣어지기도 전에 랜딩 되버림 동기방식으로 바꿔야 할 듯함(leetaehun)
		    	 stats["filetype"] = stats.isDirectory()==true?"directory":"file";
			    	
			    stats["filename"]=files[index];
			    totalfile[index] = stats;
		    	console.log(totalfile[1].filename);
		    	res.send(totalfile[1].filename);
			    }
		    });
		  });		  
	  });
  //}
  //else{
	  //res.send("<script>alert('로그인이 필요한 페이지입니다.');location.href='/';</script>");
  //}
  
};