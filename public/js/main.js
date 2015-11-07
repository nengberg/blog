$(document).ready(function() {
	$("header button").click(function() {
		$('html,body').animate({
			scrollTop: $("main").offset().top
		},
		800);
	});

	$('code').addClass('language-csharp');

	$(".paging button").click(function(e) {
		e.preventDefault();
		var nextPage = $(this).data("nextpage");
		$.ajax({
			type: "GET",
            url: "/posts/get?page=" + nextPage,
			success: createPost
        });
    });

    function createPost(data) {
		data.posts.results.forEach(function(entry){
			var date = moment(entry.publishedDate).format('YYYY-MM-DD');
			var div = $("<div></div>")
			.addClass("post");
			var a = $("<a></a>")
			.attr("href", "/" + entry.slug + "#main")
			.appendTo(div);
			$("<h2></h2>").text(entry.title)
			.appendTo(a);
			$("<time></time>")
			.attr("datetime", date)
			.text(date)
			.appendTo(div);
			$("<hr>")
			.appendTo(div);
			div.append(entry.content.extended.html);
	 		
	 		var codeBlock = div.find('code').each(function(){
	 			var element = $(this);
 				element.addClass('language-csharp');
	 		});
			div.insertAfter('.post:last');
		});

		if(!data.posts.next){
			$('.paging').remove();
		} else {
			$('.paging button').data('nextpage',data.posts.next);
		}

		Prism.highlightAll();
		$("html,body").animate({scrollTop: $('.post:last').offset().top}, 1200);
	}
});