var createRow = function(role,image){
  Ti.API.info("r: " + role);
  var row = Ti.UI.createView({
    height:150,
    width: Ti.UI.FILL,
    layout: "horizontal",
    bottom: 5
  });

  var image = Ti.UI.createImageView({
    image: image
  });

  var lbl = Ti.UI.createLabel({
    left: 5,
    height: Ti.UI.FILL,
    width: Ti.UI.FILL,
    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    text: role,
    color: "white",
    font:{
      fontSize: 15
    }
  });
  row.add(image);
  row.add(lbl);

  return row;
}

var setCastInfo = function(info){
  var n = info.length;
  var row;
  Ti.API.info("N = " + n);
  for(var i = 0;i < n;i++){
    row = createRow(info[i].FullDescription,info[i].Photo);
    $.cast.add(row);
  }
}

var initCast = function(json){
  setCastInfo(json);
}

exports.initCast = initCast;
