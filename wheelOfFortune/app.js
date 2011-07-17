var wof = {
	timeout: null,
	
	items: [],
	
	highlighted: false,
	
	autoGrowSettings: {
		comfortZone: 40,
		minWidth: 70,
		maxWidth: 500
	},
	
	init: function() {
		this.appendItem();
		$('#random').click(function(e) {
			e.preventDefault();
			wof.showRandomItem();
		});
		$('#reset').click(function(e) {
			e.preventDefault();
			wof.reset();
		});
		$('#shuffle').click(function(e) {
			e.preventDefault();
			wof.shuffleItems();
		});
	},
	
	reset: function() {
		while(this.items.length>0) {
			this.removeItemByIndex(0, 300);
		}
		setTimeout(function(){wof.appendItem();}, 300);
	},
	
	shuffleItems: function() {
		var itemsCount = this.items.length;
		shuffle(this.items);
		for (var i=0; i<itemsCount; i++) {
			this.appendItem(this.items[0].token.val());
			this.removeItemByIndex(0, 0);	
		}
	},
	
	appendItem: function(value) {
		
		var navi = $('<span></span>').
			addClass('navi');
			
		var plus = $('<a href="#">+</a>').
			click(function(e) {
				e.preventDefault();
				wof.appendItem();
			}).
			addClass('plus');
			
		var minus = $('<a href="#">-</a>').
			click(function(e) {
				e.preventDefault();
				if (wof.items.length > 1) {
					wof.removeItem(token);
				}
			}).
			addClass('minus');
		
		var inputDiv = $('<div></div>').
			addClass('inputDiv').
			hover(function(e) {
				wof.showNavi({plus: plus, minus: minus});
			});
		
		var token = $('<input type="text" value="'+(value?value:"")+'"/>').
			keydown(function(event) {
					event.token = token; 
					event.inputDiv = inputDiv; 
					wof.handleKeydown(event);
				}).
			focus(function(event) {
					wof.showNavi({plus: plus, minus: minus});
				});
		
		navi.append(plus);
		navi.append(minus);
			
		inputDiv.html(token);
		inputDiv.append(navi);
		
		this.items.push({inputDiv: inputDiv, token: token});
		
		$('#items').append(inputDiv.fadeIn());
		token.autoGrowInput(this.autoGrowSettings);
		token.focus();
		return token;
	},
	
	showNavi: function(o) {
		$('.navi a').css('display', 'none');
		if (wof.items.length>1) {
			//o.minus.fadeIn(o.delay);
			o.minus.css('display', 'inline');
		}
		//o.plus.fadeIn(o.delay);
		o.plus.css('display', 'inline');
	},
	
	handleKeydown: function(event) {
		if (this.highlighted) {
			this.resetInputDivs();
		}
		if (event.type == "keydown") {
			switch(event.keyCode) {
				case 8: wof.handleBackspace(event); break;
				case 9: wof.handleTab(event); break;
				case 13: wof.handleEnter(event); break;
				case 38: wof.handleKeyUp(event); break;
				case 40: wof.handleKeyDown(event); break;
				default: break;
			}
		}
	},
	
	handleBackspace: function(event) {
		if (event.token.val() === "") {
			if (this.items.length > 1) {
				event.preventDefault();
				this.removeItem(event.token);
			}
		}
	},
	
	handleTab: function(event) {
		var direction = event.shiftKey ? -1 : 1;
		event.preventDefault();
		var index = this.getItemIndex(event.token);
		var newIndex = index + direction;
		if (newIndex == this.items.length) {
			newIndex = 0;
		} else if (newIndex == -1) {
			newIndex = this.items.length - 1;
		}
		
		//if ((index<(this.items.length-1)) && (index>0)) {
			this.items[newIndex].token.focus();
			this.items[newIndex].token.select();
		//}
	},
	
	handleEnter: function(event) {
		event.preventDefault();
		var index = this.getItemIndex(event.token);
		if (index<(this.items.length-1)) {
			this.items[index+1].token.focus();
			this.items[index+1].token.select();
		} else if (index == (this.items.length-1)) {
			wof.appendItem();
		}
	},
	
	handleKeyUp: function(event) {
		var index = this.getItemIndex(event.token);
		if (index>0) {
			this.items[index-1].token.focus();
			this.items[index-1].token.select();
		}
	},
	
	handleKeyDown: function(event) {
		var index = this.getItemIndex(event.token);
		if (index<(this.items.length-1)) {
			this.items[index+1].token.focus();
			this.items[index+1].token.select();
		} else if ((index === (this.items.length-1)) && (event.token.val() !== "")) {
			wof.appendItem();
		}
	},
	
	getItemIndex: function(token) {
		for (var i=0; i < this.items.length; i++) {
			if (this.items[i].token == token) {
				return i;
			}
		}
		return -1;
	},
	
	removeItemByIndex: function(i, delay) {
		this.items[i].inputDiv.fadeOut(delay);
		this.items.remove(i);
		if (this.items.length>0) {
			this.items[(i<this.items.length)?i:(i-1)].token.focus();
		}
	},
	
	removeItem: function(token) {
		for (var i=0; i<this.items.length; i++) {
			if (this.items[i].token == token) {
				this.removeItemByIndex(i, 500);
				return;
			}
		}
	}, 
	
	resetInputDivs: function() {
		clearTimeout(this.timeout);
		this.highlighted = false;
		$('.inputDiv').animate({'padding-left': '90px'});
	},
	
	getRandomIndex: function() {
		return randno = Math.floor ( Math.random() * this.items.length );
	},
	
	showRandomItem: function() {
		// todo: highlight n items
		$('.inputDiv a').css('display', 'none');
		var random = this.getRandomIndex();
		this.resetInputDivs();
		this.highlighted = true;
		this.items[random].inputDiv.animate({'padding-left': '40px'});
		scrollTo(this.items[random].inputDiv);
		this.timeout=setTimeout((function(){wof.resetInputDivs();}),5000);
	}
};

// fired, when DOM is ready
$(function() {
	wof.init();
});

// console fallback 
if (!window.console) {
    var console = {
        log: function(string) {}
    };
}

var scrollTo = function(domObject) {
	var target;
    if ($.browser.opera) {
		target = 'html';
    } else {
        target = 'html,body';
    }
    $(target).animate({
        scrollTop: (domObject.offset().top - 40)
        }, 500);
};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]

shuffle = function(o){ //v1.0
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};