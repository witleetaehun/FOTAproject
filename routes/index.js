
/*
 * GET home page.
 */

exports.index = function(req, res){
	if(req.session.user){
		res.redirect('/firmware');
	}
	else{
		res.render('index', { title: 'LINUXIT' });
	}
};