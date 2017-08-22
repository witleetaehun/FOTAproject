
/*
 * GET users listing.
 */
var fs = require('fs')
, path = require('path')
, jsonfile = require('jsonfile')
, bodyParser = require('body-parser')
, archiver = require('archiver');

exports.archiver = function(req, res){
	//console.log(__dirname+"/../download/hello.txt");

	var origin_Fname = req.query.filename.split(".")[0];
	//create a file to stream archive data to.	    	
	var output = fs.createWriteStream(path.join(__dirname, '../download' , origin_Fname+".zip"));
	var archive = archiver('zip', {
	    zlib: { level: 9 } // Sets the compression level. 
	});
	// listen for all archive data to be written
	output.on('close', function() {
	  console.log(archive.pointer() + ' total bytes');
	  console.log('archiver has been finalized and the output file descriptor has closed.');
	});

	// good practice to catch warnings (ie stat failures and other non-blocking errors)
	archive.on('warning', function(err) {
	  if (err.code === 'ENOENT') {
	      // log warning
	  } else {
	      // throw error
	      throw err;
	  }
	});
	archive.pipe(output);
	var file1 = path.join(__dirname, '../download' , req.query.filename);
	archive.file(file1, { name:  req.query.filename});	    	
	archive.finalize();

	/*fs.unlink(path.join(__dirname, '../download' , req.query.filename), function (err) {
		if (err) throw err;
		console.log('successfully deleted');
	});*/
	console.log(req.query.filename);
	res.redirect("/firmware");
};



