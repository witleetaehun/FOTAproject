
/*
 * GET users listing.
 */
var Fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');

var totalfile = new Array();
exports.device_record = function(req, res){	
  if(req.session.user){
	  //console.log(req.session.user)
	  var Client = require('ftp');
	  var c = new Client();
	  c.connect({
		  host: "118.40.113.129",
		  port: 30021, // defaults to 21 
		  user: "genotech", // defaults to "anonymous" 
		  password: "1234", // defaults to "@anonymous"
	  });
	  var filePath = path.join( __dirname, '../download' );
	  var filePathre = filePath.replace(/\\/gi,"/");
	  c.on('ready', function() {
		  //var list_index = 0;
	    c.list("/Developer/FOTA_nodeE/download",function(cerr, list) {
	      if (cerr){console.dir(cerr); throw err;}
	      list.forEach(function(file , index) {
				//console.log(file);
			    //console.log(file.name);
				  //console.log("size : "+number_to_human_size(file.size));

	    	  
	    	  
	    	  //console.dir(list[index].name);
		  });
	      //console.dir(list);
	      totalfile = list
	      console.log(totalfile);
	      console.log("totalfile"+totalfile[0].date);
		  
	      c.end();
	      res.render('device_record',{filepath:filePathre , totalFile:totalfile});
	    });
	  });
	  // connect to localhost:21 as anonymous 
	 
	  //console.log(filePath);
	  //console.log(totalfile);
	  
  }
  else{
	  res.send("<script>alert('로그인이 필요한 페이지입니다.');location.href='/';</script>");
  }
  
};

/*export function download(req, res) {
    
    var down = req.body.path;
 
    res.download(down);
 
};*/