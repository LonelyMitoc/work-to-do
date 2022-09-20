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

// Clear data button function
var clearData = document.getElementById('clear-data');

clearData.onclick = function() {
    localStorage.clear();
    $('textarea').val("");
};

//Pull from local storage to show in blocks
function renderEvents() {
    for (var i = 0; i < timeArr.length; i++) {
        $('[id^=tb-]').each(function (i, x) {
            $(x).val(localStorage.getItem('t b ' + timeArr[i]));
        })
    }

    // Failed codes for future notes
        // if (localStorage.getItem("tb") !== null) {
    //     var savedEvents = JSON.parse(localStorage.getItem("tb"));
    // }

    // savedEvents.id = will retrieve the id number
    // savedEvents.text = will retrieve the text value
    // for (var i = 0; i < timeArr.length; i++) {
    //     if (savedEvents.id[i]) {
    //         $('tb-[i]').textContent = savedEvents.text[i];
    //         $('tb-[i]').val(savedEvents.text[i]);
    //     }
    // }

    // $('#tb-8').val(localStorage.getItem("t b 8"));

    // for (var i = 0; i < timeArr.length; i++) {
    //     $('[id^=tb-]').each(function (i, x) {
    //         $(x).val(savedEvents.text[i]);
    //     })
    // }

};

// Save button function
var saveButton = $('.saveBtn');

saveButton.on('click', buttonSaving);

function buttonSaving(event) {
    // Prevents form from sending
    event.preventDefault();
    // Sets the time value to the timeblock the save button was selected in
    blockEventTime = $(this).attr('id').split('-')[1];
    // // Sets the text value to the input from the user
    blockEventText = $(this).siblings('textarea[name^="tb"]').val().trim();
    localStoreEvents();
};

// Save to local storage
function localStoreEvents() {
    localStorage.setItem('t b ' + blockEventTime, blockEventText);
    // Other solution to saving locally into one key instead of multiple
    // var localData = JSON.parse(localStorage.getItem("tb")) || [];
    // console.log(localData); 
    // [{ id: ,text:},{}]
    // var newData = { "id": blockEventTime , "text": blockEventText}
    // console.log(newData);
    // localData.push(newData);
    // localStorage.setItem('tb', JSON.stringify(localData));
};

// Change timeblock color according to the relativity to the current time
var blockHour = '';
var timeBlockHour = $("textarea[id*='tb']");


function setBlockColors() {
    // var timeBlockHour = $(".textArea");
    // console.log(timeBlockHour);
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
renderEvents();

// Check for loop separately to confirm that it functions correctly
// $('#tb-8').val(localStorage.getItem("t b 8"));
// $('#tb-9').val(localStorage.getItem("t b 9"));
// $('#tb-10').val(localStorage.getItem("t b 10"));

// for (var i = 0; i < timeArr.length; i++) {
//     $('[id^=tb-]').each(function (i, x) {
//         $(x).val(localStorage.getItem('t b ' + timeArr[i]));
//         })
//     }