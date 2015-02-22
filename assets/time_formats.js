function setTimeFormats() {
  if (getCookie("timeformat") == "12hr" || getCookie("timeformat") == undefined) {
    timeFormatButtonEl.innerHTML = "Use 24hr"
    formatCurrentTime            = 'ddd h:mma'
    formatTime                   = 'ddd ha'
    formatNewDay                 = 'ddd Do MMM'
    formatTimePlusThirty         = 'ddd h:[30]a'
    formatMidday                 = 'ddd [Midday]'
    formatTimeForList            = 'h:mma'
    formatForEmail               = 'ha on dddd Do MMMM'
    formatForEmailPlusThirty     = 'h[:30]a on dddd Do MMMM'
  } else {
    timeFormatButtonEl.innerHTML = "Use 12hr"
    formatCurrentTime            = 'ddd HH:mm'
    formatTime                   = 'ddd HH[:00]'
    formatNewDay                 = 'ddd DD/MM'
    formatTimePlusThirty         = 'ddd HH[:30]'
    formatMidday                 = 'ddd HH[:00]'
    formatTimeForList            = 'HH:mm'
    formatForEmail               = 'HH[:00] on DD/MM/YYYY'
    formatForEmailPlusThirty     = 'HH[:30] on DD/MM/YYYY'
  }
}

setTimeFormats();

function changeTimeFormatting() {
  if (getCookie("timeformat") == "12hr" || getCookie("timeformat") == undefined) {
    setCookie("timeformat", "24hr", 365);
    // console.log(getCookie("timeformat"));
  } else {
    setCookie("timeformat", "12hr", 365);
    // console.log(getCookie("timeformat"));
  }
}
