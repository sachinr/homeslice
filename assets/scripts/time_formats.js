App.TimeFormats = {
  button: document.getElementById("timeformatbutton"),

  set: function() {
    if (App.Cookie.get("timeformat") == "12hr" || App.Cookie.get("timeformat") == undefined) {
      App.TimeFormats.button.innerHTML = "Use 24hr"
      App.TimeFormats.CurrentTime            = 'ddd h:mma'
      App.TimeFormats.Time                   = 'ddd ha'
      App.TimeFormats.NewDay                 = 'ddd Do MMM'
      App.TimeFormats.TimePlusThirty         = 'ddd h:[30]a'
      App.TimeFormats.Midday                 = 'ddd [Midday]'
      App.TimeFormats.TimeForList            = 'h:mma'
      App.TimeFormats.ForEmail               = 'ha on dddd Do MMMM'
      App.TimeFormats.ForEmailPlusThirty     = 'h[:30]a on dddd Do MMMM'
    } else {
      App.TimeFormats.button.innerHTML = "Use 12hr"
      App.TimeFormats.CurrentTime            = 'ddd HH:mm'
      App.TimeFormats.Time                   = 'ddd HH[:00]'
      App.TimeFormats.NewDay                 = 'ddd DD/MM'
      App.TimeFormats.TimePlusThirty         = 'ddd HH[:30]'
      App.TimeFormats.Midday                 = 'ddd HH[:00]'
      App.TimeFormats.TimeForList            = 'HH:mm'
      App.TimeFormats.ForEmail               = 'HH[:00] on DD/MM/YYYY'
      App.TimeFormats.ForEmailPlusThirty     = 'HH[:30] on DD/MM/YYYY'
    }
  },

  change: function() {
    if (App.Cookie.get("timeformat") == "12hr" || App.Cookie.get("timeformat") == undefined) {
      App.Cookie.set("timeformat", "24hr", 365);
      App.TimeFormats.set();
    } else {
      App.Cookie.set("timeformat", "12hr", 365);
      App.TimeFormats.set();
    }
  }

}

App.TimeFormats.set();
