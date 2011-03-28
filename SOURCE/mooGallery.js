var mooGallery = new Class({

	Implements : Options,

	options : {
		requestLocation : './../gallery.php',
		gallery : $('mooGallery'),
		galleryPage : 1,
		pageNavigation : false,	//Element or ID
		navigationStyle : false //'dots' / 'numbers' / 'image-url' : 'URL'
	},

	initialize : function (options) {
		that = this;
		this.setOptions(options);

		this.reqObj = new Request.JSON({
			url : that.options.requestLocation,

			//show preloader onRequest and slide the active gallery out
			onComplete : function (resObj) {

				if (that.options.pageNavigation) {
					that.options.galleryLength = resObj.GalleryLength;

					that.options.pageNavigation.set('html','');

					for (i = 0; i < that.options.galleryLength; i++) {
						var pageLink = new Element('a', {
							href : '#'
							//pageNavigationClick needs to be added
						});
						var pageList = new Element('li', {'class' : 'noactive'});

						that.options.pageNavigation.grab(pageList);
						if (i == galleryPage - 1) {
							pageList.removeClass('noactive');
							pageList.addClass('active');
						}
						pageList.grab(pageLink);
					}

					$$('noactive').addEvent('click', addPageNavigation(that.getChildren()));
				}

				that.options.gallery.set('html', '');

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
							
							galleryList.inject(that.options.gallery);
							galleryList.set('html', '<a href=#>\n<img id=image' + i + ' src="' + resObj.Image[i].hyperlink + '"/>\n</a>\n<span class="galleryInfo"><strong>' + resObj.Image[i].artist + '</strong> - ' + resObj.Image[i].title + '</span>');
						}
						else {
							var galleryList = new Element('li');		//<<define as property

							galleryList.inject(that.options.gallery);
							galleryList.set('html', '<img id=image' + i + ' src="http://crude.whatsmusic.net/images/emptyImage.png"/>');
							this.addImageToGallery();
						}
					}
				}

				//turn off the preloader and slide the nonactive gallery in
			}
		}).post('gallery=' + this.options.galleryPage);
	},

	addPageNavigation : function (element) {
		this.pageNavigation = $(element);

		if (!navigationStyle){
			that.options.navigationStyle = 'dots';
		}
	},

	changeNavigationStyle : function (navigationType) {

		//pruefen ob navigationstype vom typ string ist!
		if (navigationType == 'dots'){
			that.options.navigationStyle = 'dots';
		}
		else if (navigationType == 'numbers') {
			//add a numberlist
		}
		//Image-URL
	},

	addImageToGallery : function () {
		//try-catch block of the responsed object
	}.protect()
});