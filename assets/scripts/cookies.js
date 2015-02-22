App = {};
App.Cookie = {
  isEnabled: function() {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;
    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
      document.cookie="testcookie";
      cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    return (cookieEnabled);

  },

  set: function(c_name,value,exdays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : ("; expires="+exdate.toUTCString()));
    document.cookie=c_name + "=" + c_value;
  },

  get: function(c_name) {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++) {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name) {
       return unescape(y);
      }
    }
  },

  removeCity: function(city) {
    var regex = city + ",";
    cookieString = cookieString.replace(new RegExp(regex,"g"), "");
    App.Cookie.set("cities", cookieString, 365);
    var cookieCities = App.Cookie.get("cities").split(",");
  },

  addCity: function(city) {
    cookieString += city + ",";
    App.Cookie.set("cities", cookieString, 365);
    var cookieCities = App.Cookie.get("cities").split(",");
  },

};

if (App.Cookie.isEnabled() == false) {
  alert("Homeslice uses cookies to remember which cities you compare. Please turn on cookies if you want it to work.")
}

var defaultCities = "melbourne,sanfrancisco,"

if (! App.Cookie.get("cities")) {
  App.Cookie.set("cities", defaultCities, 365)
}

var cookieCities = App.Cookie.get("cities").split(",");
