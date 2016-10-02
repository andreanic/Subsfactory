var gridItems = [];
var url = "http://subfactorysapi.azurewebsites.net/api/subs";
var json, deviceToken;
var allGridElementsColor = "#14141f";

$.mainTab.open();

var downloadJSON = Ti.Network.createHTTPClient({
    onload: function() {
        initGrid(this.responseText);
        $.favouriteList.initFavourite();
        $.downloadView.setVisible(false);
        $.mainTab.setSwipeable(true);
    },
    onerror: function(){
      alert("Error with episode list download");
    },
    ondatastream: function(e){
      $.download.value = e.progress;
    }
});

$.mainTab.addEventListener("open",function(){
  $.mainTab.setActiveTab(0);
  $.mainTab.setSwipeable(false);
  setMenu();
  //registerPushNotification();
  downloadJSON.open("GET", url);
  downloadJSON.send();
});

$.favourite.addEventListener("selected",function(){
  $.favouriteList.checkNewElement();
});

var setMenu = function(){
  var activity = $.mainTab.getActivity();
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

var isEmpty = function(array){
  return array.length == 0;
}

//Create grid without elements
var createGrid = function(){
  $.fg.init({
      columns:2,
      space:5,
      gridBackgroundColor:allGridElementsColor,
      itemHeightDelta: 0,
      itemBackgroundColor:allGridElementsColor,
      itemBorderColor:allGridElementsColor,
      itemBorderWidth:0,
      itemBorderRadius:0
  });
}

var openEpisodeInfo = function(e){
  var episodeInfoCtrl = Alloy.createController("episodeInfo",{
    title: e.source.data.title,
    image: e.source.data.image,
    url: e.source.data.url,
    date: e.source.data.date
  });
  var episodeInfoView = episodeInfoCtrl.getView();
  episodeInfoView.open();
}

var initGrid = function(response){
  if(isEmpty(gridItems)){
      createGrid();
      json = JSON.parse(response);
      for (var i = 0,len = json.length; i < len; i++) {
        var gridItem = {
           title: json[i].Title,
           image: json[i].Image,
           url:json[i].Link,
           date: json[i].Date
        };
        gridItems.push({
          view: null,
          data: gridItem
        });
      }
  }
  $.fg.addGridItems(gridItems);
  $.fg.setOnItemClick(function(e){
      openEpisodeInfo(e);
  });
}

$.mainTab.addEventListener("androidback",function(){
  var activity = Titanium.Android.currentActivity;
  activity.finish();
});

/*
$.subscribeBtn.addEventListener("click",function(){
  subscribePushNotification();
})

$.sendPushBtn.addEventListener("click",function(){
  sendPushNotification();
})

var registerPushNotification = function(){
  var gcm = require('ti.goosh');
  gcm.registerForPushNotifications({

        senderId: '848259111761',

        callback: function(e) {
            Ti.API.info(e);
            var message = JSON.parse(e.data).notifications[0].data.message;
            alert(message);
        },
        success: function(e) {
            deviceToken = e.deviceToken;
            alert('Notifications: device token is ' + e.deviceToken);
            Ti.App.Properties.setString("deviceToken", e.deviceToken);

        },
        error: function(err) {
            Ti.API.error('Notifications: Retrieve device token failed', err);
        }
  });
}

var subscribePushNotification = function(){
    var subscribe = Ti.Network.createHTTPClient();
    subscribe.open("POST", "192.168.1.10:8000/subscribe");
    subscribe.setRequestHeader("Content-Type",  "application/json");
    var options = {
      "user":"Andrea",
      "type":"android",
      "token":deviceToken
    };
    Ti.API.info(options);
    subscribe.send(JSON.stringify(options));
}

var sendPushNotification = function(){
  var sendPush = Ti.Network.createHTTPClient();
  sendPush.open("POST", "192.168.1.10:8000/subscribe");
  sendPush.setRequestHeader("Content-Type",  "application/json");
  var options = {
    "notifications": [{
        "users": ["Andrea"],
        "android": {
          "collapseKey": "optional",
          "data": {
            "message": "New subs for The Flash!"
          }
        },
      },
    ]
  };
  Ti.API.info(options);
  sendPush.send(JSON.stringify(options));
}*/
