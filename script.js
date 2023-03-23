// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var today = dayjs();
  var timeblockClass = $('.time-block');
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?


  // identify which save button is pressed
  // 

  // var saveButtonEl = $('.btn')
  var saveButtontEl = $('button')
  var textareaEl = $('textarea')
  for (i = 0; i < 9; i++) {
    // at each button
    // create an event listener
    var button = saveButtontEl[i]
    var singleTextarea = textareaEl[i]
    console.log(singleTextarea )
    console.log(button)
    
    button.addEventListener('click', function () {
      
      console.log(saveButtontEl);
      console.log("saved" + button);
      console.log(button);
      // textareaEl.textContent = userTextEl.value


    })
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function colorCode() {
    var hour = today.format('h');
    var amPm = today.format('a');

    var businessHours = [];
    var hourCompare = "hour-" + hour;
    // TESTING Hardcode
    // var hourCompare = "hour-1";
    for (i = 0; i < 9; i++) {
      // at hour X compare if current
      var hourId = timeblockClass[i].id;
      businessHours.push(hourId)
      if (hourCompare === hourId) {
        timeblockClass[i].classList.add("present")
        var indexPoint = i
      }

    }

    for (i = 0; i < 9; i++) {
      // if user is using webpage not during business hours
      if ((hour === 6 || 7 || 8 || 9 || 10 || 11) && (amPm === 'pm')) {
        timeblockClass[indexPoint].classList.remove("present");
        timeblockClass[i].classList.add("past");
      } else if ((hour === 12 || 1 || 2 || 3 || 4 || 5) && (amPm === 'am')) {
        timeblockClass[indexPoint].classList.remove("present");
        timeblockClass[i].classList.add("future");
      } else {
        // if user is using webpage during business hours
        if (i < indexPoint) {
          timeblockClass[i].classList.add("past");
        } else if (i > indexPoint) {
          timeblockClass[i].classList.add("future");
        }
      }
    }

  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(today.format('dddd, MMMM D, YYYY'));


  colorCode();
});
