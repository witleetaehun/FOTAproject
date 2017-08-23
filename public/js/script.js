$(function(){	
	$(".btn-default").click(function(){
		$(".modal-dialog").css("top", (Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                $(window).scrollTop()))-250 + "px");
	});
	
	link = document.location.href;
	console.log(link);
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
	location.href="/createMOandDD?filename="+file+"&time="+time;
	//alert(file);
}