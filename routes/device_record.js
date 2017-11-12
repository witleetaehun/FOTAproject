
/*
 * GET users listing.
 */
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var mysql     = require('mysql');
var dbconfig  = require('./database');
var connection= mysql.createConnection(dbconfig);
var Promise = require('promise');

var totalfile = new Array();
exports.device_record = function(req, res){	
  if(req.session.user){	 
		var asyncfunction1 = function(){
			return new Promise(function(resolved,rejected){
				connection.query("select count(*) totalcount from device_record", function(err, rows , fields) {
					if(!err){
								resolved(rows[0].totalcount);
					}else{
								rejected(Error(err));
					}
				});

			});
		}
		var asyncfunction2 = function(totalCount){
					return new Promise(function(resolved,rejected){
						var page = (req.query.page!=undefined||req.query.page!=null)?req.query.page:1;
						var perPage = 10;
						var perBlock = 10;
						var totalPage = Math.floor(totalCount % perPage > 0 ? totalCount / perPage + 1 : totalCount / perPage);
						var startPage;
						var endPage;
						startPage = Math.floor(Math.floor((page - 1) / perBlock) * perBlock + 1);
						endPage = startPage + perBlock - 1;
						if (endPage > totalPage)
							endPage = totalPage;
						var dataObj = new Object();
						dataObj.page = page;
						dataObj.perPage = perPage;
						dataObj.perBlock = perBlock;
						dataObj.totalPage = totalPage;
						dataObj.startPage = startPage;
						dataObj.endPage = endPage;
						connection.query("select * from device_record limit "+(page -1)*perPage+" , "+perPage, function(err, rows , fields) {
							if(!err){
								//console.log(rows[0].email);
								dataObj.rows = rows;
								resolved(dataObj);
							}
							else{
								rejected(Error(err));
							}
						});
					});
		}
		var asyncfunction3 = function(dataObj){
					return new Promise(function(resolved,rejected){
						res.render('device_record', {
							rowData: dataObj.rows,
							totalPage: dataObj.totalPage,
							startPage: dataObj.startPage,
							endPage: dataObj.endPage,
							currentPage: dataObj.page,
							uclass: req.session.uclass
						})
					});
		}

		var promise = asyncfunction1();

		promise
		.then(asyncfunction2)
		.then(asyncfunction3);
  }
  else{
	  res.send("<script>alert('로그인이 필요한 페이지입니다.');location.href='/';</script>");
  }
  
};