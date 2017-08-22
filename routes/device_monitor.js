
/*
 * GET users listing.
 */

exports.device_monitor = function(req, res){
  if(req.session.user){
	  //console.log(req.session.user)
	  res.render('device_monitor');
	  
  }
  else{
	  res.send("<script>alert('로그인이 필요한 페이지입니다.');location.href='/';</script>");
  }
  
};