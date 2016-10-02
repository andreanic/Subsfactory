var setSeasonInfo = function(season){
  var n = season.length;
  var lbl,k,epList;
  for(var i = 0;i < n;i++){
    lbl = createLabel("season",season[i].SeasonTitle);
    $.season.add(lbl);
    epList = season[i].ListEpisodes;
    k = epList.length;
    for(var j = 0;j < k;j++){
      lbl = createLabel("episode",epList[j].Title);
      $.season.add(lbl);
    }
  }
}

var createLabel = function(type,title){
  var textSize;
  if(type == "season"){
    textSize = 20;
  }
  else{
    textSize = 15;
  }
  var lbl = Ti.UI.createLabel({
    height: textSize+20,
    width: Ti.UI.FILL,
    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    text: title,
    color: "white",
    font:{
      fontSize: textSize
    }
  });
  return lbl;
}

var initSeason = function(json){
  setSeasonInfo(json);
}

exports.initSeason = initSeason;
