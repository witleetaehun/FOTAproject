
/*
 * GET users listing.
 */

var fs = require('fs');
var path = require('path');
var filePath = path.join( __dirname, '../download' );
var filePathre = filePath.replace(/\\/gi,"/");
var remotedirPath = "/Developer/FOTA_nodeE/FOTA_nodeE/download";
function bytesToSize(bytes) {
	   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	   if (bytes == 0) return '0 Byte';
	   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	};
var totalfile;
exports.firmware = function(req, res){
	//console.log("session!!! : "+req.session.user);
		  if(req.session.user){ 
			  var  _path = path.join(__dirname, '../download/');			  
			  fs.readdir(_path, function (err, files) {
				  totalfile = new Array();
				  if(!files.length){
					  res.render('firmware', {
						  filepath: filePathre,
						  totalfile: totalfile
					});
				  }
				  
				  if(err) throw err;
				  
				  files.forEach(function(file , index) {			 
				    console.log(_path+file);
				    fs.stat(_path+file, function(err, stats) {
				    	stats["filetype"] = stats.isDirectory()==true?"directory":"file";
				    	stats["size"] = bytesToSize(stats["size"]);
				    	//console.log(typeof(stats["size"]));
				    	stats["filename"]=files[index];
				    	totalfile[index] = stats;
				      
				    	//console.log(totalfile[1].filename);
				    	
				    });
				  });	  
			  });
			  setTimeout(function(){
				  res.render('firmware', {
					  filepath: filePathre,
					  totalfile: totalfile
				  });
			  }, 200);
			  
			  
		  }
		  else{
			  res.send("<script>alert('로그인이 필요한 페이지입니다.');location.href='/';</script>");
		  }
	
	
  
  
};