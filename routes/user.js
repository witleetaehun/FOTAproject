
/*
 * GET users listing.
 */
var fs = require('fs')
, path = require('path');

var encrypt = require('file-encrypt');
exports.list = function(req, res){
	//console.log(__dirname+"/../download/hello.txt");
	 fs.open(path.join(__dirname, '../download', '20170728_132000.jpg'), 'r', function(status, fd) {
 	    if (status) {
 	        console.log(status.message);
 	        return;
 	    }
 	    var buffer = new Buffer(100);
 	    fs.read(fd, buffer, 0, 100, 0, function(err, num) {
 	        console.log(buffer.toString('utf8', 0, num));
 	    });
 	});
	var key = '1234';
	encrypt.encryptFile(path.join(__dirname, '../download', '20170728_132000.jpg'), path.join(__dirname, '../download', 'encrypt.jpg'), key, 'aes-128-cbc' , function(err){
	    if(err){
	        console.log("Something went wrong", err);
	    }
	    else{
	        console.log("Successfully encrypted");
	    }
	})
	
	/*encrypt.decryptFile(path.join(__dirname, '../download', '20170728_132000_de.jpg'), path.join(__dirname, '../download', '20170728_132000_de2.jpg'), key, function(err){
    if(err){
        console.log("Something went wrong", err);
    }
    else{
        console.log("Successfully decrypted");
    }
	});*/
	
	
	res.send("encryption testing...");
};