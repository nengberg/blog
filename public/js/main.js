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
        	success: function(data){
        		data.posts.results.forEach(function(entry){
					var div = $("<div></div>")
					.addClass("post");
					var a = $("<a></a>")
					.attr("href", "/" + entry.slug + "#main")
					.appendTo(div);
					$("<h2></h2>").text(entry.title)
					.appendTo(a);
					$("<time></time>")
					.attr("datetime", entry.publishedDate)
					.text(entry.publishedDate)
					.appendTo(div);
					$("<hr>")
					.appendTo(div);
					div.append(entry.content.extended.html);
			 
			 		div.insertAfter('.post:last');
			});

        	if(!data.posts.next){
	 			$('.paging').remove();
	 		} else {
	 			$('.paging button').data('nextpage',data.posts.next)
	 		}
        	
			$("html,body").animate({scrollTop: $('.post:last').offset().top}, 1200);

        	}
        });

        function createPost(post) {
			var div = $("<div></div>")
			.addClass("post");
			var a = $("<a></a>")
			.attr("href", "/" + post.slug + "#main")
			.attr("id", "close-note");
			$("<h2></h2>").text(post.title)
			.appendTo(div);
			$("<time></time>").text(post.publishedDate)
			.appendTo(div);
			$("<hr>")
			.appendTo(div);
        }
	});
});