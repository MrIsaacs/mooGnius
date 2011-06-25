var mooGnius = new Class({

	Implements : Options,

	options : {
		requestLocation : './../gallery.php',
		gniusDependentElement : $('gniusDependentElement'),
		gniusPage : 1,
		//pageNavigation : false,	//Element or ID
		//navigationStyle : false //'dots' / 'numbers' / 'image-url' : 'URL' / 'arrows' (left/right)
		//galleryLength is defined after request
	},

	initialize : function (gde, options) {
		that = this;

		this.gniusDependentElement = gde;
		this.setOptions(options);

		this.reqObj = new Request.JSON({
			url : that.options.requestLocation,

			//show preloader onRequest and slide the active gallery out
			//
			//onRequest : function (...) show preloader
			//

			onComplete : function (resObj) {

				//fetch gniusTypeObject and gdeLength
				//set pageNavigation if gdeLenght is greater than 1
				//otherwise pageNavigation is undefined and set
				//pageNavigationStyle in addPageNavigation()
				that.options.gniusTypeObject = resObj.gniusTypeObject;

				//draw pageNavigation if it is true
				if (that.options.pageNavigation) {

					//clears the Navigation Element
					that.options.pageNavigation.set('html','');

					//draw pagelinks till gallerylength
					//must rethink e.g. for numbers type:
					//pagelinks from -> till (0 ... 5 or 2 ... 7)
					for (i = 0; i < that.options.gniusDependentElementLength; i++) {
						var pageLink = new Element('a', {
							href : '#'
							//pageNavigationClick needs to be added
						});
						var pageList = new Element('li', {'class' : 'noactive'});

						//print the actual pageLink as an active Link
						//which view is defined in the css-File
						that.options.pageNavigation.grab(pageList);
						if (i == gniusPage - 1) {
							pageList.removeClass('noactive');
							pageList.addClass('active');
						}
						pageList.grab(pageLink);
					}

					//adds the click-Event to the pageNavigation links
					$$('noactive').addEvent('click', addPageNavigation(that.getChildren()));
				}

				//clears the gniusDependentElement
				//can add some transition to clear out the element
				that.options.gniusDependentElement.set('html', '');

				//draw items in gniusDependentElement
				//instead of 9 a variable for the total number of items in the gniusDependentElements
				//must be defined in options!!
				//this code goes into the addGtoToGde-Function
				for (i = 0; i < 9; i++) {
					try {
						//if an item of the responsed object don't exists
						//show an empty item
						if (resObj.Item[i] === undefined) {
							throw false;
						}
						else {
							throw true;
						}
					}
					catch (e) {
						if (e) {
							var gniusDependentElementList = new Element('li');		//<< define as property
							//var gniusDependentItems = new Element('a', {
								
							//});

							gniusDependentElementList.inject(that.options.gniusDependentElement);
							gniusDependentElementList.set('html', '<a href=#>\n<img id=Item' + i + ' src="' + resObj.Item[i].hyperlink + '"/>\n</a>\n<span class="galleryInfo"><strong>' + resObj.Item[i].artist + '</strong> - ' + resObj.Item[i].title + '</span>');
						}
						else {
							var gniusDependentElementList = new Element('li');		//<<define as property

							gniusDependentElementList.inject(that.options.gniusDependentElement);
							gniusDependentElementList.set('html', '<img id=Item' + i + ' src="http://crude.whatsmusic.net/Items/emptyItem.png"/>');
							this.addGtoToGde();
						}
					}
				}

				//turn off the preloader and slide the nonactive gniusDependentElement in
			}
		}).post('gde_id=' + this.options.gniusDependentElement + '&page=' + this.options.gniusPage);
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
		//Item-URL
	},

	//**********************************************************
	// *1 try-catch block of the responsed object
	// parameters: argumentlist of gniusTypeObjects
	//**********************************************************
	addGtoToGde : function () {
		//draw gniusTypeObjects to gniusDependentElements
	}.protect()
});