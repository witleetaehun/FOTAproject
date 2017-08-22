exports.loginproc = function(req, res){
	
  res.render('loginproc', {email:req.body.email , pass:req.body.pass});
};