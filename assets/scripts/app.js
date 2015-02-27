// Setup
var interval                = 500;
var hoursInTheFuture        = 24 * 7;
                            // Regex to match if a time difference is plus or minus 30min.
                            // E.g. Adelaide is +0930.
var plusOrMinusThirty       = /(\+|\-)\d{2}3\d{1}/g;
                            // Negative lookahead of the above regex.
                            // So you can say "doesn't match".
var notPlusOrMinusThirty    = /^(?!(\+|\-)\d{2}3\d{1})/g;
var urlString               = App.Url.get();
var selectedIndex;
var creditEl                = document.createElement("div");
                              creditEl.setAttribute("class", "credit");
var creditCopy              = "<p>Homeslice is a project by <a href=\"http://andytaylor.me/\">Andy&nbsp;Taylor</a> (@<a href=\"http://twitter.com/andytlr/\">andytlr</a>).</p> <p>If you find it useful (I hope you do), why not <a href=\"http://twitter.com/home?status=Homeslice: Find time across timezones. http://homeslice.in\">Tweet about it</a> or <a href=\"https://www.facebook.com/sharer/sharer.php?u=http://homeslice.in\">post it on&nbsp;Facebook</a>.</p> <p>Please submit bugs and requests on <a href=\"https://github.com/andytlr/homeslice/issues/\">GitHub</a>.</p>";


App.Cookie.set("timeformat", "12hr", 365);

App.start = function(){
  cities = {};
  App.Cities.initializeList();
  loadCities();
  updateCities();
  // Then re-run it every second.
  setInterval(updateCities, interval);

};

$(App.TimeFormats.button).on("click", function() {
  App.TimeFormats.change();
  App.TimeFormats.set();
  updateCities();
});

window.onpopstate = function(event) {
  App.start();
};

function loadCities(){
  $('#cities').html("");
  $('#headings').html("");
  // For each city
  for (var city in cities) {
    console.log(city);

    // Generate markup for each city
    var cityEl        = document.createElement("div");
    var headingEl     = document.createElement("h2");

    // Nice name for city, e.g. 'San Francisco'
    var cityName      = document.createTextNode(cities[city][0]);

    // The name in the URL, e.g. 'sanfrancisco'
    var cityShortName = city;

    // Append generated elements and add classes
    App.Cities.el.appendChild(cityEl).classList.add("city", cityShortName);
    App.Settings.headingsEl.appendChild(headingEl).classList.add("heading");
    headingEl.appendChild(cityName);

    // Append div.hour with data-hour="cityshortname" X times.
    // Where X is the number of hours in the future.
    // `hoursInTheFuture` is set at the top of this script.
    for (var i = 0; i < hoursInTheFuture; i++) {
      var hourEl     = document.createElement("div");
      cityEl.appendChild(hourEl).classList.add("hour");
      hourEl.setAttribute("data-hour", cityShortName);
    }
  }
}

function printHour(city, tzName, hourNode, index) {

  // Set `currentTime` to the correct time with Moment Timezone.
  var currentTime = moment().tz(tzName);

  // Get the GMT offset and remove the : from +09:30
  var timeDiff = moment().tz(tzName).format('Z').replace(/:/, "");
  var format;

  if (index === 0) {
    format = App.TimeFormats.CurrentTime;
    hourNode.classList.add("current");
  } else if (timeDiff.match(plusOrMinusThirty) && index !== 0){
    format = App.TimeFormats.TimePlusThirty;
    currentTime = currentTime.add('hours', index);
    currentTime = currentTime.subtract('hours', 0.5);
    hourNode.setAttribute("data-email-content", cities[city][0] + "%0D%0A" + currentTime.format(App.TimeFormats.ForEmailPlusThirty) + "%0D%0A%0D%0A");
  } else {
    format = App.TimeFormats.Time;
    currentTime = currentTime.add('hours', index);
    hourNode.setAttribute("data-email-content", cities[city][0] + "%0D%0A" + currentTime.format(App.TimeFormats.ForEmail) + "%0D%0A%0D%0A");
  }

  if (!hourNode.classList.contains("current")) {
    hourNode.onclick = function toggleClassOnSelectedHours() {
      selectedIndex = index;
    };
  }

  if (index == selectedIndex) {
    hourNode.classList.add("selectedhourforsharing");
    hourNode.onclick = function clearSelection() { selectedIndex = undefined; };
  } else {
    hourNode.classList.remove("selectedhourforsharing");
  }

  // If timezone doesn't have a half hour difference,
  // And it's midnight,
  // and it isn't the first item (current time).
  // Set the new time format.
  if (timeDiff.match(notPlusOrMinusThirty) && currentTime.format('HH') == '00' && index !== 0) {
    format = App.TimeFormats.NewDay;
  }

  // If timezone doesn't have a half hour difference,
  // And it's midnight,
  // Add a class for styling.
  if (timeDiff.match(notPlusOrMinusThirty) && currentTime.format('HH') == '00') {
    hourNode.classList.add("daystart");
  }

  // If timezone doesn't have a half hour difference,
  // And it's midday,
  // and it isn't the first item (current time).
  // Set the new time format.
  if (timeDiff.match(notPlusOrMinusThirty) && currentTime.format('HH') == '12' && index !== 0) {
    format = App.TimeFormats.Midday;
  }

  if (currentTime.format('ha') == "12am") {
    hourNode.classList.add("sleep");
  }

  if (currentTime.format('ha') == "1am") {
    hourNode.classList.add("sleep");
    hourNode.classList.remove("daystart");
  }

  if (currentTime.format('ha') == "2am") {
    hourNode.classList.add("sleep");
  }

  if (currentTime.format('ha') == "3am") {
    hourNode.classList.add("sleep");
  }

  if (currentTime.format('ha') == "4am") {
    hourNode.classList.add("sleep");
  }

  if (currentTime.format('ha') == "5am") {
    hourNode.classList.add("sleep");
  }

  if (currentTime.format('ha') == "6am") {
    hourNode.classList.add("sleep");
  }

  if (currentTime.format('ha') == "7am") {
    hourNode.classList.add("outsidebusiness");
    hourNode.classList.remove("sleep");
  }

  if (currentTime.format('ha') == "8am") {
    hourNode.classList.add("outsidebusiness");
  }

  if (currentTime.format('ha') == "9am") {
    hourNode.classList.remove("outsidebusiness");
  }

  if (currentTime.format('ha') == "6pm") {
    hourNode.classList.add("outsidebusiness");
  }

  if (currentTime.format('ha') == "7pm") {
    hourNode.classList.add("outsidebusiness");
  }

  if (currentTime.format('ha') == "8pm") {
    hourNode.classList.add("outsidebusiness");
  }

  if (currentTime.format('ha') == "9pm") {
    hourNode.classList.add("outsidebusiness");
  }

  if (currentTime.format('ha') == "10pm") {
    hourNode.classList.add("sleep");
    hourNode.classList.remove("outsidebusiness");
    hourNode.classList.remove("evening");
  }

  if (currentTime.format('ha') == "11pm") {
    hourNode.classList.add("sleep");
  }

  if (currentTime.format('HH') >= 18 && currentTime.format('HH') < 22) {
    hourNode.classList.add("evening");
  }

  if (currentTime.format('ddd') == "Sat") {
    hourNode.classList.add("weekend");
  }

  if (currentTime.format('ddd') == "Sun") {
    hourNode.classList.add("weekend");
  }

  if (currentTime.format('ddd') == "Mon") {
    hourNode.classList.remove("weekend");
  }

  // Actually add the time to the document.
  hourNode.innerHTML = currentTime.format(format);

}


// Generate content and regenerate on a timer.
function updateCities(){

  // For each city
  for (var city in cities) {

    // The name in the URL, e.g. 'sanfrancisco'
    var cityShortName = city;

    // Time difference, offset from GMT. e.g. '+1000'
    var tzName        = cities[city][1];

    // Find elements with the matching data attribute.
    // Create an array with all these elements called `hours`
    var hours = document.querySelectorAll('[data-hour=' + cityShortName +']');

    // For every element in `hours` do...
    $.each(hours, function( index, value ) {
      printHour(city, tzName, value, index);
    });
  }
}

App.start();

$('.addbutton').on('click', function(e) {
  urlCities = App.Url.get().split("/");
  city = $(this).data('city');
  if (urlCities.indexOf(city) > -1) {
    App.Url.removeCity(city);
    $(this).removeClass("is-active");
  } else {
    App.Url.addCity(city);
    $(this).addClass("is-active");
  }
});

document.body.insertBefore(creditEl, document.body.lastChild);
creditEl.innerHTML = creditCopy;

// Filtering
window.setInterval(function(){
  var filterInputValue = document.getElementById("filter").value;

  var allAddButtons = document.querySelectorAll('.addbutton');
  for (var i = 0; i < allAddButtons.length; i++) {
    if (allAddButtons[i].textContent.toLowerCase().indexOf(filterInputValue.toLowerCase().trim()) >= 0) {
      allAddButtons[i].classList.remove("is-hidden");
    } else {
      allAddButtons[i].classList.add("is-hidden");
    }
  }

  var clearButton = document.getElementById("clearbutton");

  if (filterInputValue === "") {
    clearButton.classList.remove("is-active");
  } else {
    clearButton.classList.add("is-active");
    clearButton.onclick = function clearSearchInput() {
      document.getElementById("filter").value = "";
      window.scrollTo(0, 0);
    };
  }
}, 50);

var shareButtonEl = document.getElementById("sharebutton");

function hideOrShowEmailButton() {
  var shareableHours = document.querySelectorAll('.selectedhourforsharing');

  if (shareableHours.length === 0) {
    shareButtonEl.classList.add("is-hidden");
  } else {
    shareButtonEl.classList.remove("is-hidden");
  }
}
hideOrShowEmailButton();
setInterval(hideOrShowEmailButton, interval);

shareButtonEl.onclick = function emailSelectedHours() {
  var shareableHours = document.querySelectorAll('.selectedhourforsharing');

  var data = [];

  for (var i = 0; i < shareableHours.length; i++) {
    data += shareableHours[i].getAttribute("data-email-content");
  }

  window.location = "mailto:?subject=Let's Chat&body=" + data + "Scheduled with http://homeslice.in";
};
