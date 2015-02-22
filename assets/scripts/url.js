App.Url = {
  set: function(value) {
    history.pushState({}, document.title, "#" + value)
  },

  get: function() {
    return window.location.hash.substring(1);
  },

  removeCity: function(city) {
    var regex = city + "\/";
    urlString = App.Url.get().replace(new RegExp(regex,"g"), "");
    console.log(regex, urlString);
    App.Url.set(urlString);
    var urlCities = App.Url.get().split("/");
  },

  addCity: function(city) {
    urlString = App.Url.get();
    urlString += city + "/";
    App.Url.set(urlString);
    var urlCities = App.Url.get().split("/");
  },

};

var defaultCities = "melbourne/sanfrancisco/"

if (!App.Url.get()) {
  console.log('here')
  App.Url.set(defaultCities)
}

var urlCities = App.Url.get().split("/");
