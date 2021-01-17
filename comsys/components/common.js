
var mktpl = function (functionObject) {
    return functionObject.toString().match(/\/\*([\s\S]*?)\*\//)[1];
};

var sheet = document.getElementsByTagName("style")[0].sheet;
var addcss = function(cssval) {
    //console.log(cssval);
    var cssvalarr = cssval.split(/}[^}]/);
   // console.log(cssvalarr)
    var len = cssvalarr.length;
    var sheetcnt = sheet.cssRules.length;
	for(var i = 0; i < len; i++) {
		var cssava = cssvalarr[i];
		cssava = cssava + "}";
			
		if(cssava.trim() != "}")
		{	
		//	console.log(i)
		//	console.log(cssava)
		var sheetcnt = sheet.cssRules.length;
		sheet.insertRule(cssava,sheetcnt);
		}
	}
}

// 使用 Event Bus
const bus = new Vue();


