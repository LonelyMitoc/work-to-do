// Current date and time variables
var currentDateEl = document.getElementById('currentDay');
var currentDate;
var currentTime;

// Render date and time in the heading
function renderDateTime() {
    currentDate = moment().format('LLLL');
    currentDateEl.textContent = currentDate;
};

// Update the displayed date, time and timeblock color every minute
function perMinuteInterval () {
    var currentSeconds = new Date().getSeconds();
    if (currentSeconds == 0) {
        setInterval(renderDateTime, 60000);
        setInterval(setBlockColors, 60000);
    } else {
        setTimeout(function() {
            perMinuteInterval();
        }, (60000 - currentSeconds*1000));
    }
    renderDateTime();
    setBlockColors();
};

// Local storage save and retireve variables
var blockEventTime;
var blockEventText;

// Array for local storage time variables
var timeBeginning = 8;
var timeEnding = 18;
var timeArr = [];

for (var i = timeBeginning; i < timeEnding+1; i++) {
    timeArr.push(i);
};

// Check array
// console.log(timeArr);

// Clear data button function
var clearData = document.getElementById('clear-data');

clearData.onclick = function() {
    localStorage.clear();
    document.getElementsByTagName('textarea').val("");
};

// Save button function
var saveButton = document.getElementsByClassName('saveBtn');

saveButton.addEventListener('click', buttonSaving());

function buttonSaving(event) {
    // Prevents form from sending
    event.preventDefault();
    // Sets the time value to the timeblock the save button was selected in
    blockEventTime = $(this).attr('id').split('-')[1];
    // Sets the text value to the input from the user
    blockEventText = $(this).siblings('textarea[name^="tb"]').val().trim();
    localStoreEvents();
};

// Save to local storage
function localStoreEvents() {
    localStorage.setItem('tb ' + blockEventTime, blockEventText);
};

//Pull from local storage to show in blocks
function renderEvents() {
    for (var i = 0; i <timeArr.length; i++) {
        $('[id^=tb-]').each(function(i, x) {
            $(x).val(localStorage.getItem('tb ' + timeArr[i]));
        })
    }
};

// Change timeblock color according to the relativity to the current time
var blockHour = '';
var timeBlockHour = $("textarea[id*='tb']");

function setBlockColors() {
    timeBlockHour.each(function() {
        // Set the block hour to the number in the id
        blockHour = $(this).attr('id').split('-')[1];
        // Change the number into the moment.js format and then convert it into an integer
        blockHour = parseInt(moment(blockHour, 'H').format('H'));
        // Take the current time from moment() and fomat into hour (H) and then convert it into an integer
        currentTime = parseInt(moment().format('H'));

        // Compare the block hour and current hour to set the class to past, present or future so the block changes color
        if (blockHour < currentTime) {
            $(this).addClass('past');
        } else if (blockHour === currentTime) {
            $(this).removeClass('past');
            $(this).addClass('present');
        } else {
            $(this).removeClass('past');
            $(this).removeClass('present');
            $(this).addClass('future');
        }
    })
};

perMinuteInterval();

function init() {
    renderDateTime;
    renderEvents;
    setBlockColors;
}

init();