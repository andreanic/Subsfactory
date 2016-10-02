var params,columns,space,data,screenWidth,newWidth,columnWidth,frameBGcolor,itemsOptions,onItemClick;

var init = function(opts){
	params = opts || {};
	columns = params.columns || 4;
	space = params.space || 5;
	data = params.data || {};

	screenWidth = params.width || Ti.Platform.displayCaps.getPlatformWidth();
    if (OS_ANDROID) {
        screenWidth /= Ti.Platform.displayCaps.logicalDensityFactor;
    }
	newWidth = screenWidth - space;
	columnWidth = (newWidth / columns) - space;

	//ADJUST THE SCROLLVIEW
	$.fgScrollView.left = space;
	$.fgScrollView.top = 0;
	$.fgScrollView.right = -1;

	//MAIN BG COLOR
	frameBGcolor = params.gridBackgroundColor || '#fff';
	$.fgMain.backgroundColor = frameBGcolor;

	//ITEMS OPTIONS
	itemsOptions = {
		heightDelta: params.itemHeightDelta || 0,
		backgroundColor: params.itemBackgroundColor || 'transparent',
		borderWidth: params.itemBorderWidth || 0,
		borderColor: params.itemBorderColor || 'transparent',
		borderRadius: params.itemBorderRadius || 0
	};

	//ITEM CLICK FUNCTION
	onItemClick = params.onItemClick || function(){Ti.API.info('TiFlexiGrid -> onItemClick is not defined.');};

	Ti.API.info('TiFlexiGrid -> Widget initialized.');
	Ti.API.info('TiFlexiGrid -> Items dimension: ' + columnWidth + ' x '+ (columnWidth + itemsOptions.heightDelta));
	addGridItems(data);
};

var addGridItems = function(args){
	clearGrid();
	data = args || {};
	for (var x=0;x < data.length; x++){
		addGridItem(data[x]);
	}
};

var addGridItem = function(item){
	var frame = Ti.UI.createView({
		width:columnWidth,
		height:columnWidth + itemsOptions.heightDelta,
		backgroundColor:itemsOptions.backgroundColor,
		top:0,
		left:0,
		right:space,
		bottom:space,
		borderColor:itemsOptions.borderColor,
		borderRadius:itemsOptions.borderRadius,
		borderWidth:itemsOptions.borderWidth
	});

	var overlay = Ti.UI.createImageView({
		top: 0,
		width:Ti.UI.FILL,
		height:"60%",
		backgroundColor:params.itemBackgroundColor,
		//backgroudImage:item.data.image,
		image: item.data.image,
		zIndex:1,
		data:item.data
	});

	var gridElement = item.view;

	var itemTitle = Ti.UI.createLabel({
	  color: 'white',
		backgroundColor: params.itemBackgroundColor,
	  font: { fontSize:20 },
	  text: item.data.title,
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top:"60%",
	  bottom: 0,
	  width: Ti.UI.FILL, height: Ti.UI.FILL
	});

	//ADD CUSTOM FUNCTION ONCE AN ITEM IS CLICKED
	overlay.addEventListener('click',function(e){
		onItemClick(e);
	});

	//frame.add(gridElement);
	frame.add(overlay);
	frame.add(itemTitle);
	$.fgScrollView.add(frame);
};

var clearGrid = function(){
	$.fgScrollView.removeAllChildren();
};

var getItemWidth = function(){
	return columnWidth;
};

var getItemHeight = function(){
	return columnWidth + itemsOptions.heightDelta;
};

var setOnItemClick = function(fnt){
	onItemClick = fnt || function(){Ti.API.info('TiFlexiGrid -> onItemClick is not defined.');};
};


exports.init=init;
exports.addGridItems = addGridItems;
exports.clearGrid = clearGrid;
exports.addGridItem = addGridItem;
exports.getItemWidth = getItemWidth;
exports.getItemHeight = getItemHeight;
exports.setOnItemClick = setOnItemClick;
