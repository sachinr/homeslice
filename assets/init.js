// Make an empty Object to be added to.
cities = {}

// Setup
var defaultCities           = "melbourne,sanfrancisco,"
var interval                = 500
var hoursInTheFuture        = 24 * 7
                            // Regex to match if a time difference is plus or minus 30min.
                            // E.g. Adelaide is +0930.
var plusOrMinusThirty       = /(\+|\-)\d{2}3\d{1}/g
                            // Negative lookahead of the above regex.
                            // So you can say "doesn't match".
var notPlusOrMinusThirty    = /^(?!(\+|\-)\d{2}3\d{1})/g
var settingsEl              = document.getElementById("settings");
var settingsButtonEl        = document.getElementById("settingsbutton");
var settingsButtonContent   = document.createTextNode("Set Cities");
var timeFormatButtonEl      = document.getElementById("timeformatbutton");
var citiesEl                = document.getElementById("cities");
var headingsEl              = document.getElementById("headings");
var cookieString            = getCookie("cities");
var selectedIndex           = undefined;
var creditEl                = document.createElement("div");
                              creditEl.setAttribute("class", "credit");
var creditCopy              = "<p>Homeslice is a project by <a href=\"http://andytaylor.me/\">Andy&nbsp;Taylor</a> (@<a href=\"http://twitter.com/andytlr/\">andytlr</a>).</p> <p>If you find it useful (I hope you do), why not <a href=\"http://twitter.com/home?status=Homeslice: Find time across timezones. http://homeslice.in\">Tweet about it</a> or <a href=\"https://www.facebook.com/sharer/sharer.php?u=http://homeslice.in\">post it on&nbsp;Facebook</a>.</p> <p>Please submit bugs and requests on <a href=\"https://github.com/andytlr/homeslice/issues/\">GitHub</a>.</p>"
