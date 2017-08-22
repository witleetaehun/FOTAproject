
/**
 * Module dependencies.
 */


var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , firmware = require('./routes/firmware')
  , device_record = require('./routes/device_record')
  , device_monitor = require('./routes/device_monitor')
  , loginproc = require('./routes/loginproc')
  , uploadproc = require('./routes/uploadproc')
  , morgan = require('morgan')
  , methodOverride = require('method-override')
  , favicon = require('serve-favicon')
  , bodyParser = require('body-parser')
  ,cookieParser = require('cookie-parser')
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
//app.post('/loginproc', loginproc.loginproc);




app.get('/session', function(req, res){
	 req.session.name='asdf';
	 res.send(req.session.name);
});



app.post('/loginproc', function(req, res){
		var sql = "select count(*) cnt from user where email = ? and password = password(?)";
		var email = req.body.email;
		var pass = req.body.pass
		var params = [email , pass];
		req.session.user = email;
	  connection.query(sql,params, function(err, rows , fields) {
	    if(err) throw err;

	    //console.log('The solution is: ', rows);
	    var cnt = rows[0].cnt;
	    console.log("session id :"+req.session.user);
	    //console.log(cnt);
	    if(cnt==1){
	    	res.send("<script>alert('정상 로그인 되었습니다');location.href='/firmware';</script>");
	    }
	    else{
	    	res.send("<script>alert('계정정보를 확인해주십시오.');location.href='/';</script>");
	    }
	    
	  });
});



app.post('/download/:file',function(req, res){
	var down = req.body.path;
	console.log("downpath : "+down);
	res.download(down);
});

app.post('/upload' , function(req, res){
	upload(req, res, function (err) {
	    if (err) {
	      // An error occurred when uploading
	    	console.log("File Upload Error!")
	    	return
	    }	    
	    else{
	    	
			//res.send("<script>alert('업로드 되었습니다.');location.href='/firmware';</script>");
	    	//console.log(req.body);
	    	
			res.redirect('/uploadproc?filename='+req.file.originalname);
	    }
	  })
});
app.get('/uploadproc', uploadproc.uploadproc);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
