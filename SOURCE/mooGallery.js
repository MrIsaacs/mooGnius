var mooGallery = new Class({

	Implements : [Options],

	options : {
		requestLocation : './gallery.php',
		gallery : $('mooGallery'),
		galleryPage : 1,
		pageNavigation : false,	//Element or ID
		navigationStyle : false //Element or ID
	},

	initialize : function (options) {
		this.setOptions(options);

		this.reqObj = new Request.JSON({
			url : this.requestLocation,

			//show preloader onRequest and slide the active gallery out
			onComplete : function (resObj) {
				this.galleryLength = resObj.GalleryLength;

				if (pageNavigation) {
					pageNavigation.set('html','');

					for (i = 0; i < galleryLength; i++) {
						var pageLink = new Element('a', {
							href : '#'
							//pageNavigationClick needs to be added
						});
						var pageList = new Element('li', {'class' : 'noactive'});

						pageNavigation.grab(pageList);
						if (i == galleryPage - 1) {
							pageList.removeClass('noactive');
							pageList.addClass('active');
						}
						pageList.grab(pageLink);
					}

					$$('noactive').addEvent('click', addPageNavigation(this.getChildren()));
				}

				gallery.set('html', '');

				//instead of 9 a variable for the total number of images in the gallery
				for (i = 0; i < 9; i++) {
					try {
						if (resObj.Image[i] === undefined) {
							throw false;
						}
						else {
							throw true;
						}
					}
					catch (e) {
						if (e) {
							var galleryList = new Element('li');		//<< define as property
							//var galleryImages = new Element('a', {
								
							//});
							
							galleryList.inject(gallery);
							galleryList.set('html', '<a href=#>\n<img id=image' + i + ' src="' + resObj.Image[i].hyperlink + '"/>\n</a>\n<span class="galleryInfo"><strong>' + resObj.Image[i].artist + '</strong> - ' + resObj.Image[i].title + '</span>');
						}
						else {
							var galleryList = new Element('li');		//<<define as property

							galleryList.inject(gallery);
							galleryList.set('html', '<img id=image' + i + ' src="http://crude.whatsmusic.net/images/emptyImage.png"/>');
							this.addImageToGallery();
						}
					}
				}

				//turn off the preloader and slide the nonactive gallery in
			}
		});
	},

	addPageNavigation : function (element) {
		this.pageNavigation = $(element);

		if (!navigationStyle){
			this.navigationStyle = 'dots';
		}
	},

	changeNavigationStyle : function (navigationType) {

		//pruefen ob navigationstype vom typ string ist!
		if (navigationType == 'dots'){
			this.navigationStyle = 'dots';
		}
		//Number & Image-URL
	},

	addImageToGallery : function () {
		//try-catch block of the responsed object
	}.protect()
});