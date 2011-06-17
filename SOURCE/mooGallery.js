var mooGallery = new Class({

	Implements : Options,

	options : {
		requestLocation : './../gallery.php',
		gallery : $('mooGallery'),
		galleryPage : 1,
		pageNavigation : false,	//Element or ID
		navigationStyle : false //'dots' / 'numbers' / 'image-url' : 'URL' / 'arrows' (left/right)
		//galleryLength is defined after request
	},

	initialize : function (options) {
		that = this;
		this.setOptions(options);

		this.reqObj = new Request.JSON({
			url : that.options.requestLocation,

			//show preloader onRequest and slide the active gallery out
			//
			//onRequest : function (...) show preloader
			//

			onComplete : function (resObj) {

				//draw pageNavigation if it is true
				if (that.options.pageNavigation) {
					//sets the actual
					that.options.galleryLength = resObj.GalleryLength;

					//clears the Navigation Element
					that.options.pageNavigation.set('html','');

					//draw pagelinks till gallerylength
					//must rethink e.g. for numbers type:
					//pagelinks from -> till (0 ... 5 or 2 ... 7)
					for (i = 0; i < that.options.galleryLength; i++) {
						var pageLink = new Element('a', {
							href : '#'
							//pageNavigationClick needs to be added
						});
						var pageList = new Element('li', {'class' : 'noactive'});

						//print the actual pageLink as an active Link
						//which view is defined in the css-File
						that.options.pageNavigation.grab(pageList);
						if (i == galleryPage - 1) {
							pageList.removeClass('noactive');
							pageList.addClass('active');
						}
						pageList.grab(pageLink);
					}

					//adds the click-Event to the pageNavigation links
					$$('noactive').addEvent('click', addPageNavigation(that.getChildren()));
				}

				//clears the Gallery Element
				that.options.gallery.set('html', '');

				//draw images in gallery
				//instead of 9 a variable for the total number of images in the gallery
				//must be defined in options!!
				//this code goes into the addImageToGallery-Function
				for (i = 0; i < 9; i++) {
					try {
						//if an item of the responsed object don't exists
						//show an empty image
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

	//**********************************************************
	//adds the pagenavigation to its type, defaults to 'dots'
	//**********************************************************
	addPageNavigation : function (element) {
		this.pageNavigation = $(element);

		if (!navigationStyle){
			that.options.navigationStyle = 'dots';
		}
	},

	//**********************************************************
	//if the user wants to change the navigationStyle
	//**********************************************************
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

	//**********************************************************
	//*1 try-catch block of the responsed object
	//**********************************************************
	addImageToGallery : function () {
		//some code
	}.protect()
});