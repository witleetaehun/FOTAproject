
/*
 * GET users listing.
 */
/*var JSFtp = require("jsftp");
var Ftp = new JSFtp({
	  host: "118.40.113.129",
	  port: 40021, // defaults to 21 
	  user: "root", // defaults to "anonymous" 
	  pass: "1234", // defaults to "@anonymous"
	  debugMode: true
});*/
var Fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var filePath = path.join( __dirname, '../download' );
var filePathre = filePath.replace(/\\/gi,"/");
var remotedirPath = "/Developer/FOTA_nodeE/FOTA_nodeE/download";
function number_to_human_size(x) {
	  var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
	  var e = Math.floor(Math.log(x) / Math.log(1024));
	  return (x / Math.pow(1024, e)).toFixed(2) + " " + s[e];
	};
var totalfile = new Array();

exports.firmware = function(req, res){
	console.log("session!!! : "+req.session.user);
		  if(req.session.user){	
			  console.log(req.query.upfilename);				
			  var Client = require('ftp');
			  var c = new Client();			  
			  c.connect({
				  host: "118.40.113.129",
				  port: 30021, // defaults to 21 
				  user: "genotech", // defaults to "anonymous" 
				  password: "1234", // defaults to "@anonymous"
			  });			  
			  c.on('ready', function() {
				  //var list_index = 0;
			    c.list(remotedirPath,function(cerr, list) {
			      if (cerr){console.dir(cerr); throw err;}
			      list.forEach(function(file , index) {
			    	  //console.log(list[index].date);
			    	
			    	  list[index].size = list[index].size>0?number_to_human_size(list[index].size):0+" bytes";
			    	  console.log(list[index].name);
			    	  
			    	  //console.dir(list[index].name);
					  });
			      
			      totalfile = list;
			      res.render('firmware', {
					  filepath: filePathre,
					  totalfile: totalfile
				  });
			      c.end();
			    });
			  });
			
			  
		  }
		  else{
			  res.send("<script>alert('로그인이 필요한 페이지입니다.');location.href='/';</script>");
		  }
	
	
  
  
};