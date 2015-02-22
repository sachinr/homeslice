App.Settings = {

  el:            document.getElementById("settings"),
  buttonEl:      document.getElementById("settingsbutton"),
  headingsEl:    document.getElementById("headings"),
  buttonContent: document.createTextNode("Set Cities"),

  show: function() {
    App.Settings.el.classList.remove("is-hidden");
    App.Cities.el.classList.add("is-hidden");
    App.Settings.buttonEl.classList.add("is-hidden");
    App.TimeFormats.button.classList.add("is-hidden");
    App.Settings.headingsEl.classList.add("is-hidden");
    document.body.classList.add("settingsvisible");
    window.scrollTo(0, 0);
  },

  hide: function() {
    App.Settings.el.classList.add("is-hidden");
    App.Cities.el.classList.remove("is-hidden");
    App.Settings.buttonEl.classList.remove("is-hidden");
    App.TimeFormats.button.classList.remove("is-hidden");
    App.Settings.headingsEl.classList.remove("is-hidden");
    document.body.classList.remove("settingsvisible");
    window.scrollTo(0, 0);
  }
}

App.Settings.buttonEl.onclick = function showSettingsScreen() {
  App.Settings.show();
}

App.Settings.headingsEl.onclick = function showSettingsScreen() {
  App.Settings.show();
}

App.Settings.hide();

var saveButtonEl            = document.createElement("div");
var saveButtonCopy          = document.createTextNode("↫ I'm done pickin’");

App.Settings.buttonEl.appendChild(App.Settings.buttonContent);
App.Settings.el.insertBefore(saveButtonEl, App.Settings.el.firstChild);
saveButtonEl.appendChild(saveButtonCopy);
saveButtonEl.classList.add("savebutton");

saveButtonEl.onclick = function closeSettingsScreen() {
  // hideSettings();
  window.location = "/";
}

