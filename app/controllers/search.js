var args = $.args;
var url = "http://subfactorysapi.azurewebsites.net/api/show?value=";
var title, infoLink;

var downloadJSON = Ti.Network.createHTTPClient({
    onload: function() {
      var json = JSON.parse(this.responseText);
      setResult(json);
      setTimeout(function(){
          $.download.setVisible(false)
      },500);
    },
    onerror: function(){
      alert("Error with search");
    },
    ondatastream: function(e){
      $.progress.value = e.progress;
    }
});

$.searchButton.addEventListener("click",function(){
  Ti.UI.Android.hideSoftKeyboard();
  $.download.setVisible(true);
  if($.searchBar.value.length == 0){
    alert("No value for search");
    return;
  }
  title = $.searchBar.value.toLowerCase();
  title = title.replace(" ","+");
  downloadJSON.open("GET", url+title);
  downloadJSON.send();
});

var setResult = function(json){

  $.result.removeAllChildren();

  if((json == null) || (json == undefined)){
    alert("No result find");
    return;
  }
  var view = Ti.UI.createView({
    width: Ti.UI.FILL,
    height: 150,
    layout: "horizontal",
  });

  var image = Ti.UI.createImageView({
    image: json.Poster,
  });

  var textView = Ti.UI.createView({
    width: Ti.UI.FILL,
    height: Ti.UI.FILL,
    layout: "vertical",
  });

  var title = Ti.UI.createLabel({
    left: 5,
    top: 5,
    height: 30,
    width: Ti.UI.FILL,
    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    text: json.Title,
    color: "white",
    font:{
      fontSize: 20
    }
  });

  var plotTxt = json.ShowSummary.substr(0,100);
  plotTxt = plotTxt + "[..]";

  var plot = Ti.UI.createLabel({
    left: 5,
    top: 5,
    height: 55,
    width: Ti.UI.FILL,
    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    text: plotTxt,
    color: "white",
    font:{
      fontSize: 15
    }
  });

  textView.add(title);
  textView.add(plot);
  view.add(image);
  view.add(textView);

  infoLink = json.Link;
  Ti.API.info("infoLink = " + infoLink);

  view.addEventListener("click",function(){
    var infoBoxCtrl = Alloy.createController("info",{
      url: infoLink,
      favourite: false
    });
    var infoBoxView = infoBoxCtrl.getView();
    infoBoxView.open();
  });

  $.result.add(view)
}
