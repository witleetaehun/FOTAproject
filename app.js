
/**
 * Module dependencies.
 */


var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , firmware = require('./routes/firmware')
  , device_record = require('./routes/device_record')
  , device_monitor = require('./routes/device_monitor')
  , joinform = require('./routes/joinform')
  , joinproc = require('./routes/joinproc')
  , loginproc = require('./routes/loginproc')
  , admin = require('./routes/admin')
  , createMOandDD = require('./routes/createMOandDD')
  , createMOandDD2 = require('./routes/createMOandDD2')
  , uparchiver = require('./routes/archiver')
  , deleteproc = require('./routes/deleteproc')
  , morgan = require('morgan')
  , methodOverride = require('method-override')
  , favicon = require('serve-favicon')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , errorhandler = require('errorhandler')
  , http = require('http')
  , jsonfile = require('jsonfile')
  , path = require('path');


var mysql     = require('mysql');
var dbconfig  = require('./routes/database');
var connection= mysql.createConnection(dbconfig);

var session = require('express-session');
var mkdirp = require('mkdirp');
var archiver = require('archiver');
var fs = require('fs');
var multer = require('multer');
var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'download/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({storage:_storage}).single('upfile');
var app = express();

app.locals.pretty = true;
// all environments


app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(cookieParser("3CCC4ACD-6ED1-4844-9217-82131BDCB239"));
app.use(session({
	  secret: '123456', // 쿠키에 저장할 connect.sid값을 암호화할 키값 입력
	  resave: true,                                   //세션 아이디를 접속할때마다 새롭게 발급하지 않음
	  saveUninitialized: true                   //세션 아이디를 실제 사용하기전에는 발급하지 않음
	}));
//app.use(morgan());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', '/images/favicon.ico')));
// development only
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.use(errorhandler());
}


//app.use(cookieParser());



app.get('/', routes.index);
app.get('/users', user.list);
app.get('/firmware', firmware.firmware);
app.get('/device_record', device_record.device_record);
app.get('/device_monitor', device_monitor.device_monitor);
app.get('/join', joinform.joinform);
app.get('/admin', admin.admin);
app.post('/joinproc', joinproc.joinproc);
//app.post('/loginproc', loginproc.loginproc);


app.get('/overLapCheck', function(req, res){
	 console.log("reqData : "+req.query.email);
   connection.query("select email from user where email = ?",[req.query.email], function(err, rows , fields) {
     if(err) throw err;

     if(rows.length==0){
       res.send(true);
     }
     else{
       res.send(false);
     }

   });
});

app.get('/authorityUpdate', function(req, res){
  if(req.session.user && (req.session.uclass==1)){
    var page = (req.query.page==null||req.query.page=='undefined')?1:req.query.page
    var authority = req.query.authority==1?0:1;
    var queryParam = [authority,req.query.email];
     connection.query("update user set class = ? where email = ?",queryParam, function(err, result) {
       if(err) throw err;
       if(result.changedRows > 0)
          res.redirect("/admin?page="+page);
       else
          res.send("<script>alert('권한변경 실패');location.href='/admin';</script>");
      });
  }
  else{
    res.send("<script>alert('잘못된 접근입니다.');location.href='/';</script>");
  }

});
app.get('/deleteUser', function(req, res){
  if(req.session.user && (req.session.uclass==1)){
    var page = (req.query.page==null||req.query.page=='undefined')?1:req.query.page
    console.log(page);
    var queryParam = [req.query.email];
     connection.query("delete from user where email = ?",queryParam, function(err, result) {
       if(err) throw err;
       console.log(result);
       res.redirect("/admin?page="+page);
      });
  }
  else{
    res.send("<script>alert('잘못된 접근입니다.');location.href='/';</script>");
  }
});

app.post('/loginproc', function(req, res){
		var sql = "select * from user where email = ? and password = sha1(?)";
		var email = req.body.email;
		var pass = req.body.pass
		var params = [email , pass];

	  connection.query(sql,params, function(err, rows , fields) {
	    if(err) throw err;

	    if(rows.length==0){
	    	res.send("<script>alert('계정정보를 확인해주십시오.');location.href='/';</script>");
	    }
	    else{
	    	if(rows[0].class==1)
	    		req.session.uclass = "1";
	    	else
	    		req.session.uclass = "0";

	    	req.session.user = email;
	    	res.send("<script>alert('정상 로그인 되었습니다');location.href='/firmware';</script>");
	    }

	  });
});

app.get('/logout', function(req, res){
	req.session.destroy(function(){
		req.session;
	});
	res.redirect('/');
});

app.post('/download/:file',function(req, res){
	var down = req.body.path;
	console.log("downpath : "+down);
	res.download(down);
});

app.post('/upload' , function(req, res){
	//console.log("asdfasdfa : "+req.body.upfile);
	upload(req, res, function (err) {
	    if (err) {
	      // An error occurred when uploading
	    	console.log("File Upload Error!")
	    	return
	    }
	    else{

			res.send("<script>alert('업로드 되었습니다.');location.href='/firmware';</script>");
	    	//console.log(req.body);
	    }
	  })
});
app.get('/createMOandDD', createMOandDD.createMOandDD);
app.get('/createMOandDD2', createMOandDD2.createMOandDD);
app.get('/archiver', uparchiver.archiver);
app.get('/deleteproc', deleteproc.deleteproc);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
