var fs = require('fs');
var path = require('path');
var localDirectoryName = "device_info";
var filePath = path.join( __dirname, '../'+localDirectoryName+'/' );
var filePathre = filePath.replace(/\\/gi,"/");

var getIP = require('ipware')().get_ip;
exports.firmwareUploadCheck = function(req, res){
  if( (req.session.user && req.session.uclass==1) || true){

    var to = new Array();    
    var totalfile = new Array();

    var promfunction1 = function(){
        return new Promise(function(resolved,rejected){        
            fs.readdir(filePath, function (err, files) {                    
                    if(!files.length){
                        res.json(null);
                    }
                    else if(err){
                        console.log("device_info read file error!!!!");
                        rejected(Error(err));
                    }
                    else{       
                        resolved(files);                     
                    }            
            });
        });
    }
     var promfunction2 = function(param){
        return new Promise(function(resolved,rejected){        
            
            param.forEach(function(file , index) {		    
                var regexp = /[a-zA-Z0-9]+[\_]+device[\_]+information[\.]+json/;
                //console.log(file + " : " + regexp.test(file));
                if(regexp.test(file))
                    to[index] = filePath + file;
            });
            resolved(to);
        });    
                        
     }

     var promfunction3 = function(param){
        return new Promise(function(resolved,rejected){        
            //console.log(param)
            for(t in param){                
                var _stats = fs.statSync(param[t]);
                if((Date.parse(new Date()) - Date.parse(new Date(_stats.mtime))) <= 300000 || true){
                    //totalfile.push(_stats);
                    //console.log("aaaaa");
                    totalfile.push(JSON.parse(fs.readFileSync(param[t], 'utf8')));
                    
                }
            }
            //console.log(totalfile);
            resolved(totalfile);
        });    
     }
    
     

    promfunction1(true)
    .then(promfunction2)
    .then(promfunction3)
    .then(function (param) {        
        res.json(param);
    });
	  
  }
  else{
	  res.send("<script>alert('권한이 필요합니다..');location.href='/';</script>");
  }
  
};