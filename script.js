$(function () {
  var today = dayjs();
  var timeblockClass = $('.time-block');
  var saveButtontEl = $('button')

  // check if anything already stored in local storage or not
  if (window.localStorage.getItem('savedTextObj') === null) {
    var savedTextObj = { // create save object variable
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
  } else {
    var savedTextObj = JSON.parse(window.localStorage.getItem("savedTextObj")) // pull what is in local storage
    for (i = 0; i < timeblockClass.length; i++) { // plave text back into text boxes
      var savedTextSingle = savedTextObj[timeblockClass[i].id];
      var textareaAddBack = timeblockClass[i].children[1];
      textareaAddBack.textContent = savedTextSingle;

    }
  }

  // pressing a save button
  function saveEvent() {
    for (i = 0; i < 9; i++) {
      var button = saveButtontEl[i] // at each button

      button.addEventListener('click', function () { // create an event listener to save text at a particular time
        var clickedSaveButton = this.previousElementSibling.value;
        var textareaHTML = this.previousElementSibling;
        textareaHTML.textContent = clickedSaveButton
        savedTextObj[textareaHTML.parentNode.id] = clickedSaveButton
        window.localStorage.setItem('savedTextObj', JSON.stringify(savedTextObj)); // store text entered
      })
    }

  }

  // colors the corresponding textarea with past, present, or future (grey, red, or green respectively)
  function colorCode() {
    var hour = today.format('h');
    var amPm = today.format('a');

    // TESTING HARDCODE
    // hourCompare = "hour-1";
    // hour = 1
    // amPm = 'pm'

    var businessHours = [];
    var hourCompare = "hour-" + hour;

    if ((amPm === 'pm') && // evening
      ((hour === 6) || (hour === 7) || (hour === 8) || (hour === 9) || (hour === 10) || (hour === 11))) {
      for (j = 0; j < timeblockClass.length; j++) {
        timeblockClass[j].classList.add("past");
      }
    } else if ((amPm === 'am') && // morning
      ((hour === 12) || (hour === 1) || (hour === 2) || (hour === 3) || (hour === 4) || (hour === 5) || (hour === 6) || (hour === 7) || (hour === 8))) {
      for (j = 0; j < timeblockClass.length; j++) {
        timeblockClass[j].classList.add("future");
      }
    } else {
      for (i = 0; i < timeblockClass.length; i++) {
        var hourId = timeblockClass[i].id;
        businessHours.push(hourId);
        if (hourCompare === hourId) {
          timeblockClass[i].classList.add("present");
          var indexPoint = i; // indexPoint to build future off of
        } else {
          if (i > indexPoint) {
            timeblockClass[i].classList.add("future");
          } else { // if indexPoint DNE
            timeblockClass[i].classList.add("past");
          }
        }
      }
    }
  }

  // display the current date in the header of the page.
  $('#currentDay').text(today.format('dddd, MMMM D, YYYY'));

  colorCode();
  saveEvent();
});
