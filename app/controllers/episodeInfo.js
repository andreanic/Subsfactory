// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var title = args.title;
var image = args.image;
var date = args.date;
var url = "http://subfactorysapi.azurewebsites.net/api/subs?url=" + args.url;
var infoLink, downloadLink;
var epTitle, author;

var downloadJSON = Ti.Network.createHTTPClient({
  onload: function(){
    json = JSON.parse(this.responseText);
    setTimeout(function(){
      setSomeInfo(json);
      $.down.setVisible(false);
      $.container.setVisible(true);
    },500);
  },
  onerror: function(){
    alert("Error with subtitle download");
    alert("Download failed");
  },
  ondatastream: function(e){
    $.download.value = e.progress;
  }
});

var downloadSubs = Ti.Network.createHTTPClient({
  onload: function(){
    var subs = Ti.Filesystem.getFile("file:///mnt/sdcard/Download/", title+".zip");
		subs.write(this.responseData);
    alert("Download finished, you can find it into Download folder");
  },
  onerror: function(){
    alert("Download failed");
  }
});

$.infoWin.addEventListener("open",function(){
  $.menu.initMyMenu($.infoWin);
  setMenu();
  downloadJSON.open("GET",url);
  downloadJSON.send();
});

$.downloadBtn.addEventListener("click",function(){
  downloadSubs.open("GET",downloadLink);
  downloadSubs.send();
  alert("Download started");
});

$.infoBtn.addEventListener("click",function(){
  var infoBoxCtrl = Alloy.createController("info",{
    url: infoLink,
    favourite: false
  });
  var infoBoxView = infoBoxCtrl.getView();
  infoBoxView.open();
});

var setMenu = function(){
  var activity = $.infoWin.getActivity();
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

var setSomeInfo = function(json){
  author = json.AuthorName;
  epTitle = json.EpisodeTitle;
  downloadLink = json.DownloadLink;
  infoLink = json.ShowInfoLink;
  $.image.setImage(image);
  $.title.setText(title);
  $.episodeTitle.text = "Episode Title: " + epTitle;
  $.author.text = "Author Name: " + author;
  $.date.text = "Date: " + date;
}
