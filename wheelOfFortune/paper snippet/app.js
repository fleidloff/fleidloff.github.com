var wof = {
	token: null,
	init: function() {
		this.appendSnippet();
	},
	appendSnippet: function() {
		var snippet = $('<div></div>')
			.addClass('snippet')
			.css('display', 'none');
		
		this.token = $('<input type="text" placeholder="-> add token" />')
			.addClass('snippetInput')
			.keypress(function(e) { wof.enter(e); });
		snippet.html(this.token);
		
		$('#token').html(snippet.fadeIn());
		this.token.focus();
	},
	addSnippet: function(value) {
		wof.appendSnippet();
		
		var smallSnippet = $('<div></div>')
			.addClass('smallSnippet')
			.html(value.substring(0, 10));	
		
		$('#lastToken').append(smallSnippet);
		smallSnippet.animate({top: '250px'}, complete=function(){smallSnippet.remove();});
		this.addToken(value);
	},
	addToken: function(value) {
		console.log("add: " + value);
	},
	enter: function(event) {
		if ( event.which == 13 ) {
			event.preventDefault();
			//if (this.token.val() != "") {
				this.addSnippet(this.token.val());
			//}
		}
	}
}

$(function() {
	wof.init()
});