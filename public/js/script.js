$(function(){
	$(".btn-default").click(function(){
		$(".modal-dialog").css("top", (Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                $(window).scrollTop()))-250 + "px");
	});
	$('input:radio[name="update_type"][value="개별적"]').prop('checked', true);	
	$("#upfile").change(function() {
		var resultData = fileCheckFn();
		var outHtml = "";
		
		for(var i in resultData){
			outHtml +="<option g_name='"+resultData[i].gateway.p_name+"' g_address='"+resultData[i].gateway.ip+"'>"+resultData[i].gateway.m_name+"["+resultData[i].gateway.p_name+"]"+"</option>";
			for(var j in resultData[i].nodes){
				var _outHtml = "";
				_outHtml += "<option style='display:none;' gm_name='"+resultData[i].gateway.m_name+"' g_name='"+
					resultData[i].gateway.p_name+"' g_address='"+resultData[i].gateway.ip+"' sensor_type='"+resultData[i].nodes[j].p_name+"'>"+resultData[i].nodes[j].m_name+
					"["+resultData[i].nodes[j].p_name+"]"+"</option>";
				$("#singly").children("select").eq(1).append(_outHtml);
			}
		}
		$("#singly").children("select").eq(0).append(outHtml);
		
	});	
	
	$("input:radio[name='update_type']").change(function(){
		var selfVal = $(this).val()
		$("#g_address").val("");
		if($("#upfile").val() == "" || $("#upfile").val() == undefined){
			$(this).prop('checked' , false);
			$(this).siblings().prop('checked' , true);
			alert("파일선택 안됨")
		}
		else{			
			$("#node-list").children("select").empty();
			//var outHtml = "";
			if(selfVal == "일괄적"){
				/* $("#singly").empty();				
				outHtml += "<select><option>노드타입 선택</option></select>"
				$("#collective").append(outHtml);*/
				$("#collective").show();
				$("#singly").hide();
			}
			else if(selfVal == "개별적") {
				/* $("#collective").empty();
				outHtml += "<select><option>게이트웨이 선택</option></select><select><option>노드 선택</option></select>"
				$("#singly").append(outHtml);*/
				
				$("#singly").show();				
				$("#collective").hide();
				
			}
		}
	});
	  
	$("#singly").children("select").eq(0).change(function(){
		var _index = $(this).children("option").index($(this).children("option:selected")); 
		
		var selfVal = $(this).children("option:selected").attr("g_name");
		if(_index != 0){
			$("#singly").children("select").eq(1).children("option").each(function(i , v){			
				//console.log(selfVal);
				//console.log($(v).attr("g_name"));				

				if(i > 0){
					if($(v).attr("g_name") == selfVal){	
						$(v).show();
					}
					else{
						$(v).hide();
					}
				}
				else{
					$(v).prop("selected", true);
				}
			});
		}		
	});

	$("#singly").children("select").eq(1).change(function(){
		var index = $("#singly").children("select").eq(1).children("option").index($("#singly").children("select").eq(1).children("option:selected"));
		var _index = $(this).children("option").index($(this).children("option:selected"));
		var _selfVal = $("#singly").children("select").eq(0).children("option:selected").text();
		var selfVal = $(this).children("option:selected").text();
		var g_address = $("#singly").children("select").eq(0).children("option:selected").attr("g_address");
		var valueCheck = true;
		if(_index != 0){
			$("#node-list").children("select").children("option").each(function(i , v){
				if($(v).text() == _selfVal+" "+selfVal)
					valueCheck = false;
				else
					valueCheck = true;
			});

			if(valueCheck){
				$("#node-list").children("select").append("<option selected>"+_selfVal+" "+selfVal+"</option>");
				if($("#g_address").val() == "")
					$("#g_address").val(g_address);
				else
					$("#g_address").val($("#g_address").val()+","+g_address);
					
				if($("#g_address").val().indexOf(",") != -1){
					var g_addressArray = $("#g_address").val().split(",");
					g_addressArray = g_addressArray.reduce(function(a,b){
						if (a.indexOf(b) < 0 ) a.push(b);
						return a;
						},[]);
						$("#g_address").val(g_addressArray);
				}
			}
			else{
				alert("이미 목록에 있는 노드 입니다.")
			}
				
		}
	});

	$("#collective").children("select").change(function(){
		var $self = $(this).children("option:selected");
		var outHtml = "";
		$("#singly").children("select").eq(1).children("option").each(function(i , v){
			if($(v).attr("sensor_type") == $self.val()){
				var g_address = $(v).attr("g_address");
				if($("#g_address").val() == ""){
					$("#g_address").val(g_address)
				}
				else{
					$("#g_address").val($("#g_address").val()+","+g_address)
				}
				
				outHtml += "<option selcted>"+$(v).attr("gm_name")+"["+$(v).attr("g_name")+"]"+" "+$(v).text()+"</option>";				
			}
		});
		if($("#g_address").val().indexOf(",") != -1){
			var g_addressArray = $("#g_address").val().split(",");
			g_addressArray = g_addressArray.reduce(function(a,b){
				if (a.indexOf(b) < 0 ) a.push(b);
				return a;
			  },[]);
			  $("#g_address").val(g_addressArray);
		}
		if(outHtml != ""){
			$("#node-list").children("select").append(outHtml);			
		}
		else{			
			$(this).children("option:eq(0)").prop("selected" , true);
			alert("해당 센서타입의 노드가 존재하지 않습니다.");
		}
			
	});
	



	link = document.location.href;
	//console.log(link);
	var linkarray = link.split("http://")[1];
	$("ul.nav-sidebar > li > a").parent().removeClass("active");
	$("ul.nav-sidebar > li > a").each(function(index) {
		//console.log($(this).attr("href").split("/")[1]);
		//console.log(linkarray.split("/")[1]);
		if($(this).attr("href").split("/")[1]==linkarray.split("/")[1]){
			$(this).parent().addClass("active");
		}
	});


});
function overLapCheck(obj){
	var email = $("#email").val();
	var check = true;
	var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if(email == '' || email == 'undefined'){
		check = false;
		alert("Please enter email");
	}
	else {
		if(!regex.test(email)){
			check = false;
			alert("This is not an email format.");
		}
	}
	if(check){
		$.ajax({
			url : "/overLapCheck",
			type : "get",
			data : {"email" : email},
			dataType : "json",
			success : function(data){
				if(!data){
					alert("중복되는 Email 입니다.");
					$("#email").attr("check","false");
				}
				else{
					alert("등록가능한 Email 입니다.");
					$("#email").attr("check","true");
				}

			},
			statusCode : {
				404 : function() {
					alert("No data.");
				},
				500 : function() {
					alert("Server or grammatical error.");
				}
			}
		});
	}

}
function authorityUpdate(email , page , authority){
	var confirmText = "권한변경 ["+email+"] " + (parseInt(authority)==1?"관리자를 사용자로 변경":"사용자를 관리자로 변경") + " 하시겠습니까?"
	if (confirm(confirmText)){    //확인
		location.href="/authorityUpdate?email="+email+"&page="+page+"&authority="+authority;
	}else{   //취소
	    return;
	}


}
function deleteUser(email , page){
	if(confirm(email+" 계정을 삭제하시겠습니까?")){
			location.href="/deleteUser?email="+email+"&page="+page;
	}
	else{
		return;
	}

}
function downloadAsPost(file){
	//$("#fileValue").val(file);
	var f=document.downloadForm;   //폼 name
    f.path.value = file;    //POST방식으로 넘기고 싶은 값(hidden 변수에 값을 넣음)
    f.action="/download/fileDown"; //이동할 페이지
    f.method="post"; //POST방식
    f.submit();
}
function deleteProc(file){
	//alert(file);
	if (confirm("["+file+"] 정말 삭제하시겠습니까??") == true){    //확인
	    /*document.form.submit();*/
		location.href="/deleteproc?filename="+file;
	}else{   //취소
	    return;
	}
}

function createMOandDD(file , time){
	if(file.split(".")[1]=="xml")
		alert("확장자가 xml인 파일은 MO,DD생성이 불가능합니다.");
	else
		location.href="/createMOandDD?filename="+file+"&time="+time;
	//alert(file);
}

function createMOandDD2(file , time){
	if(file.split(".")[1]=="xml")
		alert("확장자가 xml인 파일은 MO,DD생성이 불가능합니다.");
	else
		location.href="/createMOandDD2?filename="+file+"&time="+time;
	//alert(file);
}

function fileCheckFn() {
	var ajaxResultData;
	$.ajax({
		url : "/firmwareUploadCheck",
		type : "get",
		async : false ,		
		dataType : "json",
		success : function(data){
			ajaxResultData = data;
			console.log(ajaxResultData);
		},
		statusCode : {
			404 : function() {
				alert("No data.");
			},
			500 : function() {
				alert("Server or grammatical error.");
			}
		}
	});

	return ajaxResultData;
}

function upFormCheck() {
	var updateList = $("#node-list > select > option").length;
	var updateTime = $("#datetimepicker2 > input[name=update_time]").val();	
	var _upfile = $("#upfile").val();
	var allcheck = true;

	

	if(_upfile == "" || _upfile == undefined){
		allcheck = false;
		alert("파일선택 안됨");
	}
	else{

	}
	
	if(updateList > 0){ //업데이트 노드 리스트 존재할때
		$("#node-list > select > option").prop("selected" , true);
	}
	else{ //업데이트 노드 리스트 존재하지않을때
		allcheck = false;
		alert("업데이트 노드 리스트가 비어있습니다.");
	}
	
	if(updateTime !== ""){ //업데이트 일시 존재할때		
		var dateCheck = (new Date(updateTime).getTime()) - new Date().getTime() > 300000;
		if(!dateCheck){
			alert("업데이트 일시가 현재시간 5분 이상이어야 합니다.");
			allcheck = false;
		}
	}
	else{ //업데이트 일시 존재하지않을때
		allcheck = false;
		alert("업데이트 일시를 지정해주세요.");
	}


	return allcheck;
}

