var args = $.args;
var url = "http://subfactorysapi.azurewebsites.net/api/show?value=" + args.url;
var image, title, miniUrl = args.url;
var json;
var favourite = false;

var downloadJSON = Ti.Network.createHTTPClient({
  onload: function(){
    Ti.API.info("Download complete");
    json = JSON.parse(this.responseText);
    setTimeout(function(){
      setInfo(json);
      isFavourite(title);
      setViewVisibility();
    },500);
  },
  onerror: function(){
    alert("Error with subtitle download");
    setTimeout(function(){
      $.tab.close();
    },1000);
  },
  ondatastream: function(e){
    $.download.value = e.progress;
  }
});

$.tab.addEventListener("open",function(){
  setMenu();
  $.tab.setActiveTab(0);
  $.tab.setSwipeable(false);
  downloadJSON.open("GET",url);
  downloadJSON.send();
});

$.tab.addEventListener("androidback",function(){
  if(args.favourite == true){
    var mainBoxCtrl = Alloy.createController("index");
    var mainBoxCtrl = mainBoxCtrl.getView();
    mainBoxCtrl.open();
  }
  else{
    $.tab.close();
  }
});

$.favourite.addEventListener("click", function(){
  if(!favourite){
    var db = Ti.Database.open('Favourite');
    db.execute('INSERT INTO favourite (title,url,image) VALUES (?,?,?)', title, miniUrl, image);
    db.close();
    favourite = true;
    $.favourite.setTitle("Remove Favourite");
    alert("Added to Favourite");
  }
  else{
    var db = Ti.Database.open('Favourite');
    db.execute('DELETE FROM favourite WHERE title = ?',title);
    db.close();
    favourite = false;
    $.favourite.setTitle("Add Favourite");
    alert("Removed from Favourite");
  }
});

var setMenu = function(){
  var activity = $.tab.getActivity();
  var actionBar = activity.actionBar;
  activity.onCreateOptionsMenu = function(e) {
      var menuItem = e.menu.add({
          icon: Ti.Android.R.drawable.ic_menu_search,
          showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
      });
      menuItem.addEventListener("click", function(){
        var searchCtrl = Alloy.createController("search");
        var searchCtrlView = searchCtrl.getView();
        searchCtrlView.open();
      });
  };
  activity.invalidateOptionsMenu();
}

var setInfo = function(json){
  image = json.Poster;
  title = json.Title;
  $.image.setImage(image);
  $.title.setText(title);
  $.plotTxt.setText(json.ShowSummary);
  $.season.initSeason(json.SeasonList);
  $.cast.initCast(json.ListOfActors);
}

var isFavourite = function(title){
  var db = Ti.Database.open('Favourite');
  var result = db.execute('SELECT * FROM favourite WHERE title = ?',title);
  if(result.isValidRow()){
    favourite = true;
    $.favourite.setTitle("Remove Favourite");
  }
}

var setViewVisibility = function(){
  $.down.setVisible(false);
  $.container.setVisible(true);
  $.container2.setVisible(true);
  $.container3.setVisible(true);
  $.tab.setSwipeable(true);
}
