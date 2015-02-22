setCookie("timeformat", "12hr", 365);

timeFormatButtonEl.addEventListener("click", changeTimeFormatting, false);
timeFormatButtonEl.addEventListener("click", setTimeFormats, false);
timeFormatButtonEl.addEventListener("click", updateCities, false);

function showSettings() {
  settingsEl.classList.remove("is-hidden");
  citiesEl.classList.add("is-hidden");
  settingsButtonEl.classList.add("is-hidden");
  timeFormatButtonEl.classList.add("is-hidden");
  headingsEl.classList.add("is-hidden");
  document.body.classList.add("settingsvisible");
  window.scrollTo(0, 0);
}

function hideSettings() {
  settingsEl.classList.add("is-hidden");
  citiesEl.classList.remove("is-hidden");
  settingsButtonEl.classList.remove("is-hidden");
  timeFormatButtonEl.classList.remove("is-hidden");
  headingsEl.classList.remove("is-hidden");
  document.body.classList.remove("settingsvisible");
  window.scrollTo(0, 0);
}

hideSettings();

if (! cookieString) {
  var cookieString = defaultCities
  setCookie("cities", cookieString, 365)
}

var cookieCities = getCookie("cities").split(",");

function removeCityFromCookie(city) {
  var addButton = document.getElementById('add' + city);

  if (addButton.classList.contains('is-active')) {
    addButton.classList.remove('is-active');

    var regex = city + ",";
    cookieString = cookieString.replace(new RegExp(regex,"g"), "");
    setCookie("cities", cookieString, 365);
    var cookieCities = getCookie("cities").split(",");
    // console.log("Cookie String: " + cookieString);
    // console.log("Cookie Array: " + cookieCities);
  } else {
    addCityToCookie(city)
  }
};

function addCityToCookie(city) {
  var addButton = document.getElementById('add' + city);

  if (addButton.classList.contains('is-active')) {
    removeCityFromCookie(city)
  } else {
    addButton.classList.add('is-active');

    cookieString += city + ",";
    setCookie("cities", cookieString, 365);
    var cookieCities = getCookie("cities").split(",");
    // console.log("Cookie String: " + cookieString);
    // console.log("Cookie Array: " + cookieCities);
  }
};

settingsButtonEl.onclick = function showSettingsScreen() {
  showSettings();
}

headingsEl.onclick = function showSettingsScreen() {
  showSettings();
}

var saveButtonEl            = document.createElement("div");
var saveButtonCopy          = document.createTextNode("↫ I'm done pickin’");

settingsButtonEl.appendChild(settingsButtonContent);
settingsEl.insertBefore(saveButtonEl, settingsEl.firstChild);
saveButtonEl.appendChild(saveButtonCopy);
saveButtonEl.classList.add("savebutton");

saveButtonEl.onclick = function closeSettingsScreen() {
  // hideSettings();
  window.location = "/";
}

for (var city in cityOptions) {

  var cityOptionEl                 = document.createElement("div");
  var cityName                     = document.createTextNode(cityOptions[city][0]);
  var cityOptionCurrentTimeEl      = document.createElement("span");
  var cityOptionCurrentGmtOffsetEl = document.createElement("span");
  var currentTime                  = document.createTextNode(moment().tz(cityOptions[city][1]).format(formatTimeForList));
  var currentGmtOffset             = document.createTextNode(moment().tz(cityOptions[city][1]).format('Z'));

  settingsEl.appendChild(cityOptionEl);
  cityOptionEl.appendChild(cityName);
  cityOptionEl.appendChild(cityOptionCurrentTimeEl);
  cityOptionEl.appendChild(cityOptionCurrentGmtOffsetEl);
  cityOptionCurrentTimeEl.appendChild(currentTime);
  cityOptionCurrentGmtOffsetEl.appendChild(currentGmtOffset);
  cityOptionEl.classList.add("addbutton");
  cityOptionEl.id = "add" + city;

  var addButton = document.getElementById('add' + city);

  if (cookieCities.indexOf(city) > -1) {
    addButton.onclick = removeCityFromCookie.bind(this, city);
    addButton.classList.add("is-active");
    cities[city] = [
      cityOptions[city][0],
      cityOptions[city][1]
    ];
  } else {
    addButton.onclick = addCityToCookie.bind(this, city);
    addButton.classList.remove("is-active");
  }
}

// For each city
for (var city in cities) {

  // Generate markup for each city
  var cityEl        = document.createElement("div");
  var headingEl     = document.createElement("h2");

  // Nice name for city, e.g. 'San Francisco'
  var cityName      = document.createTextNode(cities[city][0]);

  // The name in the URL, e.g. 'sanfrancisco'
  var cityShortName = city;

  // Append generated elements and add classes
  citiesEl.appendChild(cityEl).classList.add("city", cityShortName);
  headingsEl.appendChild(headingEl).classList.add("heading");
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
    [].forEach.call(hours, function(hourNode, index) {

      // Set `currentTime` to the correct time with Moment Timezone.
      var currentTime = moment().tz(tzName);

      // Get the GMT offset and remove the : from +09:30
      var timeDiff = moment().tz(tzName).format('Z').replace(/:/, "")

      if (index == 0) {
        var format = formatCurrentTime;
        hourNode.classList.add("current");
      } else if (timeDiff.match(plusOrMinusThirty) && index != 0){
        format = formatTimePlusThirty;
        currentTime = currentTime.add('hours', index);
        currentTime = currentTime.subtract('hours', 0.5);
        hourNode.setAttribute("data-email-content", cities[city][0] + "%0D%0A" + currentTime.format(formatForEmailPlusThirty) + "%0D%0A%0D%0A");
      } else {
        var format = formatTime;
        currentTime = currentTime.add('hours', index);
        hourNode.setAttribute("data-email-content", cities[city][0] + "%0D%0A" + currentTime.format(formatForEmail) + "%0D%0A%0D%0A");
      }

      if (!hourNode.classList.contains("current")) {
        hourNode.onclick = function toggleClassOnSelectedHours() {
          selectedIndex = index;
        }
      }

      if (index == selectedIndex) {
        hourNode.classList.add("selectedhourforsharing");
        hourNode.onclick = function clearSelection() {
          selectedIndex = undefined;
        }
      } else {
        hourNode.classList.remove("selectedhourforsharing");
      }

      // If timezone doesn't have a half hour difference,
      // And it's midnight,
      // and it isn't the first item (current time).
      // Set the new time format.
      if (timeDiff.match(notPlusOrMinusThirty) && currentTime.format('HH') == 00 && index != 0) {
        var format = formatNewDay;
      }

      // If timezone doesn't have a half hour difference,
      // And it's midnight,
      // Add a class for styling.
      if (timeDiff.match(notPlusOrMinusThirty) && currentTime.format('HH') == 00) {
        hourNode.classList.add("daystart");
      }

      // If timezone doesn't have a half hour difference,
      // And it's midday,
      // and it isn't the first item (current time).
      // Set the new time format.
      if (timeDiff.match(notPlusOrMinusThirty) && currentTime.format('HH') == 12 && index != 0) {
        var format = formatMidday;
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

    });
  }
};

// Run the update cities function.
updateCities();

// Then re-run it every second.
setInterval(updateCities, interval);

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

  if (filterInputValue == "") {
    clearButton.classList.remove("is-active");
  } else {
    clearButton.classList.add("is-active");
    clearButton.onclick = function clearSearchInput() {
      document.getElementById("filter").value = "";
      window.scrollTo(0, 0);
    }
  }
}, 50);

var shareButtonEl = document.getElementById("sharebutton");

function hideOrShowEmailButton() {
  var shareableHours = document.querySelectorAll('.selectedhourforsharing');

  if (shareableHours.length == 0) {
    shareButtonEl.classList.add("is-hidden");
  } else {
    shareButtonEl.classList.remove("is-hidden");
  }
}
hideOrShowEmailButton();
setInterval(hideOrShowEmailButton, interval);

shareButtonEl.onclick = function emailSelectedHours() {
  var shareableHours = document.querySelectorAll('.selectedhourforsharing');

  var data = []

  for (var i = 0; i < shareableHours.length; i++) {
    data += shareableHours[i].getAttribute("data-email-content")
  }

  window.location = "mailto:?subject=Let's Chat&body=" + data + "Scheduled with http://homeslice.in";
}

// Analytics Stuff
shareButtonEl.addEventListener("click", function(){
  ga('send', 'event', 'button', 'click', 'Email');
}, true);

settingsButtonEl.addEventListener("click", function(){
  ga('send', 'event', 'button', 'click', 'Open Settings');
}, true);

timeFormatButtonEl.addEventListener("click", function(){
  ga('send', 'event', 'button', 'click', 'Switch Time Format');
}, true);
