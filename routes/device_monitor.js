
/*
 * GET users listing.
 */
var getIP = require('ipware')().get_ip;
exports.device_monitor = function(req, res){
  if(req.session.user){
    //console.log(req.session.user)
    // var ipInfo = getIP(req);
    // console.log("ipInfo : " + ipInfo);
    // for(key in ipInfo){
    //   console.log(key + " : " + ipInfo[key]);
    // }
    // // { clientIp: '127.0.0.1', clientIpRoutable: false }
    // var ipAddr = req.headers['x-forwarded-for'] || 
    // req.connection.remoteAddress || 
    // req.socket.remoteAddress ||
    // req.connection.socket.remoteAddress;
    // console.log("headers : " + req.headers["x-forwarded-for"]);
    
    // console.log("ipAddr : " + ipAddr);
    // console.log("aaa : " + req.connection.remoteAddress);
    // console.log(req.connection.remotePort);
    // console.log(req.connection.localAddress);
    // console.log(req.connection.localPort);
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
        console.log(ipAddress);
    
    res.render('device_monitor');
	  
  }
  else{
	  res.send("<script>alert('로그인이 필요한 페이지입니다.');location.href='/';</script>");
  }
  
};