var thisMenu;
var itemMenu = [];
var itemTitle = ["Blog","Login","Search"];

var initMenu = function(menu){
  thisMenu = menu;
  var n = itemTitle.length;
  for(i = 0;i < n;i++){
    item = thisMenu.add({
      itemId: i,
      title: itemTitle[i]
    });

    item.addEventListener('click',function(){
      alert("Hai premuto " + this.title);
    });

    itemMenu[itemTitle[i]] = item;
  }
}
var setFunc = function(itemTitle,func){
  itemMenu[itemTitle].addEventListener('click',function(){
    func();
  });
}

var setTitle = function(itemTitle,newItemTitle){
  itemMenu[itemTitle].title = newItemTitle;
}

var setEnabled = function(enable){
  for(var item in itemMenu){
    itemMenu[item].setEnabled(enable);
  }
}

var initMyMenu = function(win){
  var activity = win.activity;
  activity.onCreateOptionsMenu = function(e){
    takeMenu = e.menu;
    initMenu(takeMenu);
  };
  activity.onPrepareOptionsMenu = function(){
    setEnabled(true);
  };
}

var openSelectedOption = function(){
	var ctrl = Alloy.createController(this.title.toLowerCase());
  var view = ctrl.getView();
  view.open();
}

exports.initMenu = initMenu;
exports.setFunc = setFunc;
exports.setTitle = setTitle;
exports.setEnabled = setEnabled;
exports.initMyMenu = initMyMenu;
exports.openSelectedOption = openSelectedOption;
