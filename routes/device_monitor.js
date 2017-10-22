var fs = require('fs');
var path = require('path');
var localDirectoryName = "device_info";
var filePath = path.join( __dirname, '../'+localDirectoryName+'/' );
var filePathre = filePath.replace(/\\/gi,"/");

var getIP = require('ipware')().get_ip;
exports.device_monitor = function(req, res){
  if(req.session.user){

    var to = new Array();    
    var totalfile = new Array();

    var promfunction1 = function(){
        return new Promise(function(resolved,rejected){        
            fs.readdir(filePath, function (err, files) {                    
                    /* if(!files.length){
                        res.render('firmware', {
                            filepath: filePathre,
                            totalfile: totalfile,
                            uclass: req.session.uclass
                    });
                    } */
                    if(err){
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
                    totalfile.push(JSON.parse(fs.readFileSync(param[t], 'utf8')));                   
            }
            resolved(totalfile);
        });    
     }

     var promfunction4 = function(param){
        return new Promise(function(resolved,rejected){        
            console.log(param.length);
            res.render('device_monitor', {
                filepath: filePathre,
                totalfile: param, //param is totalfile
                uclass: req.session.uclass
            });       
        });    
     }

    promfunction1(true)
    .then(promfunction2)
    .then(promfunction3)
    .then(promfunction4);
   


   /*  console.log(req.session.user)
    var ipInfo = getIP(req);
    console.log("ipInfo : " + ipInfo);
    for(key in ipInfo){
      console.log(key + " : " + ipInfo[key]);
    }
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    var ipAddr = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
    console.log("headers : " + req.headers["x-forwarded-for"]);
    
    console.log("ipAddr : " + ipAddr);
    console.log("aaa : " + req.connection.remoteAddress);
    console.log(req.connection.remotePort);
    console.log(req.connection.localAddress);
    console.log(req.connection.localPort);
    var ipAddress;
    
        if(!!req.hasOwnProperty('sessionID')){
            ipAddress = req.headers['x-forwarded-for'];
        } else{
            if(!ipAddress){
                var forwardedIpsStr = req.header('x-forwarded-for');
    
                if(forwardedIpsStr){
                    var forwardedIps = forwardedIpsStr.split(',');
                    ipAddress = forwardedIps[0];
                }
                if(!ipAddress){
                    ipAddress = req.connection.remoteAddress;
                }
            }
        }
        console.log(ipAddress);  */
    
    //res.render('device_monitor');
	  
  }
  else{
	  res.send("<script>alert('로그인이 필요한 페이지입니다.');location.href='/';</script>");
  }
  
};