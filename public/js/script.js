$(function(){	
	$(".btn-default").click(function(){
		$(".modal-dialog").css("top", (Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                $(window).scrollTop()))-250 + "px");
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