(function(exports){
  exports.button = "#timeformatbutton";

  exports.set = function(timeformat) {
    if (timeformat == "12hr") {
      $(TimeFormats.button).html("Use 24hr");
      TimeFormats.CurrentTime            = 'ddd h:mma';
      TimeFormats.Time                   = 'ddd ha';
      TimeFormats.NewDay                 = 'ddd Do MMM';
      TimeFormats.TimePlusThirty         = 'ddd h:[30]a';
      TimeFormats.Midday                 = 'ddd [Midday]';
      TimeFormats.TimeForList            = 'h:mma';
      TimeFormats.ForEmail               = 'ha on dddd Do MMMM';
      TimeFormats.ForEmailPlusThirty     = 'h[:30]a on dddd Do MMMM';
    } else {
      $(TimeFormats.button).html("Use 12hr");
      TimeFormats.CurrentTime            = 'ddd HH:mm';
      TimeFormats.Time                   = 'ddd HH[:00]';
      TimeFormats.NewDay                 = 'ddd DD/MM';
      TimeFormats.TimePlusThirty         = 'ddd HH[:30]';
      TimeFormats.Midday                 = 'ddd HH[:00]';
      TimeFormats.TimeForList            = 'HH:mm';
      TimeFormats.ForEmail               = 'HH[:00] on DD/MM/YYYY';
      TimeFormats.ForEmailPlusThirty     = 'HH[:30] on DD/MM/YYYY';
    }
  };

})(this.TimeFormats = {})

TimeFormats.set();
