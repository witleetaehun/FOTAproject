$(function(){
	$(".btn-default").click(function(){
		$(".modal-dialog").css("top", (Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                $(window).scrollTop()))-250 + "px");
	});

	$("#upfile").change(function() {
        alert('changed!');
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
