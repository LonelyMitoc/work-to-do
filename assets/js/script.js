// Current date and time variables
var currentDateEl = document.getElementById('currentDate');
var currentDate;
var currentTime;

// Render date and time in the heading
function renderDateTime() {
    currentDate = moment().format('LLLL');
    currentDateEl.textContent(currentDate);
}

// Local storage save and retireve variables
var blockEventTime;
var blockEventText;

// Array for local storage time variables
var timeBeginning = 8;
var timeEnding = 18;
var timeArr = [];

for (var i = timeBeginning; i < timeEnding+1; i++) {
    timeArr.push(i);
}

// Check array
// console.log(timeArr);

// Clear data button function
var clearData = document.getElementById('clear-data');

clearData.onclick = function() {
    localStorage.clear();
    document.getElementsByTagName('textarea').val("");
}

// Save button function
var saveBtn = document.getElementsByClassName('saveBtn');

saveBtn.addEventListener('click', buttonSaving);

function buttonSaving(event) {
    // Prevents form from sending
    event.preventDefault();
    // Sets the time value to the timeblock the save button was selected in
    blockEventTime = $(this).attr('id').split('-')[1];
    // Sets the text value to the input from the user
    blockEventText = $(this).siblings('textarea[name^="timeblock"]').val().trim();
    locallyStoreEvents();
}

