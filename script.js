// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var today = dayjs();
  var timeblockClass = $('.time-block');
  var saveButtontEl = $('button')

  // https://stackoverflow.com/questions/20007455/creating-array-of-empty-strings
  var textArraySaved = Array(timeblockClass.length).fill("");



  if (window.localStorage.getItem('savedTextObj') === null) {
    var savedTextObj = {
      'hour-9': '',
      'hour-10': '',
      'hour-11': '',
      'hour-12': '',
      'hour-1': '',
      'hour-2': '',
      'hour-3': '',
      'hour-4': '',
      'hour-5': '',

    }
    console.log("1")
  } else {
    var savedTextObj = JSON.parse(window.localStorage.getItem("savedTextObj"))
    console.log(savedTextObj[0])
    console.log("2")
    for (i = 0; i < timeblockClass.length; i++) {
      console.log(i)
      console.log(timeblockClass[i].id)
      for (j = 0; i < timeblockClass.length; i++) {
        var hoursObj = [9,10,11,12,1,2,3,4,5]
        var compareObj = savedTextObj[timeblockClass[i].id]
        console.log(compareObj)
        if (timeblockClass[i].id === compareObj) {
        console.log(timeblockClass[i].id)
        console.log('worked')
        }
      }
    }

  }

  console.log(compareObj)

  console.log(textArraySaved)
  console.log(savedTextObj)
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  function enterEvent() {

    for (i = 0; i < 9; i++) {
      // at each button
      // create an event listener
      var button = saveButtontEl[i]

      button.addEventListener('click', function () {
        var clickedSaveButton = this.previousElementSibling.value;
        var textareaHTML = this.previousElementSibling;
        textareaHTML.textContent = clickedSaveButton
        var index = $('.container-fluid').index(timeblockClass)
        console.log(index)
        console.log($('.container-fluid'))
        console.log(textareaHTML.textContent)
        console.log(textareaHTML.parentNode.id)
        console.log(clickedSaveButton)
        console.log(textareaHTML)
        console.log(timeblockClass)

        savedTextObj[textareaHTML.parentNode.id] = clickedSaveButton

        window.localStorage.setItem('savedTextObj', JSON.stringify(savedTextObj));

      })
    }

  }


  // check if anything in local storage and load in if there is

  // add to array anything that is saved in its correct spot
  // figure out where in the DOM we are
  // in an array, add in that location
  // save array in local storage

  // on refresh, add the locally stored stuff back in their correct spots




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
    console.log(hourCompare)
    for (i = 0; i < 9; i++) {
      // at hour X compare if current
      var hourId = timeblockClass[i].id;
      businessHours.push(hourId)
      if (hourCompare === hourId) {
        timeblockClass[i].classList.add("present")
        var indexPoint = i;
      }

    }

    for (i = 0; i < 9; i++) {
      // if user is using webpage not during business hours
      if (hour === (6 || 7 || 8 || 9 || 10 || 11) && amPm === 'pm') {
        timeblockClass[indexPoint].classList.remove("present");
        timeblockClass[i].classList.add("past");
      } else if (hour === (12 || 1 || 2 || 3 || 4 || 5) && amPm === 'am') {
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
  enterEvent();
});
