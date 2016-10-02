var urlList = {};
var numberOfChilder = 0;

var createRow = function(title,image){

  var row = Ti.UI.createView({
    height: 150,
    width: Ti.UI.FILL,
    layout: "horizontal"
  });

  var image = Ti.UI.createImageView({
    image: image
  });

  var lbl = Ti.UI.createLabel({
    left: 5,
    top: 50,
    height: 30,
    width: Ti.UI.FILL,
    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    text: title,
    color: "white",
    font:{
      fontSize: 20
    }
  });

  lbl.addEventListener("click",function(e){
    openShow(this.text);
  });

  row.add(image);
  row.add(lbl);

  return row;
}

var openShow = function(title){
  data = urlList[title];
  var infoBoxCtrl = Alloy.createController("info",{
    url: data,
    favourite: true
  });
  var infoBoxView = infoBoxCtrl.getView();
  infoBoxView.open();
}

var setFavouriteInfo = function(title, url, image){
  var row = createRow(title,image);
  urlList[title] = url;
  $.favourite.add(row);
}

var setNoFavourite = function(){
  var lbl = Ti.UI.createLabel({
    top: "45%",
    height: "10%",
    width: Ti.UI.FILL,
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    text: "You haven't Favourite in your list",
    color: "white",
    font:{
      fontSize: 20
    }
  });
  $.favourite.add(lbl);
}

var databaseSearch = function(){
  var db = Ti.Database.open('Favourite');
  db.execute('CREATE TABLE IF NOT EXISTS favourite(title TEXT PRIMARY KEY, url TEXT, image TEXT);');
  var result = db.execute('SELECT * FROM favourite');

  return result;
}

var initFavourite = function(res){
  var result;

  if(res == undefined){
    result = databaseSearch();
  }
  else{
    result = res;
  }

  if(result.getRowCount() > 0){
    while(result.isValidRow()){
      setFavouriteInfo(result.fieldByName('title'), result.fieldByName('url'), result.fieldByName('image'));
      result.next();
      numberOfChilder++;
    }
  }
  else{
    setNoFavourite();
  }
}

var clearList = function(){
  $.favourite.removeAllChildren();
}

var checkNewElement = function(){
  var db = Ti.Database.open('Favourite');
  var result = db.execute('SELECT * FROM favourite');

  if(result.getRowCount() != numberOfChilder){
    numberOfChilder = 0;
    clearList();
    initFavourite(result);
  }
}

exports.initFavourite = initFavourite;
exports.clearList = clearList;
exports.checkNewElement = checkNewElement;
