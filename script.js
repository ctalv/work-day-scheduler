// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var today = dayjs();
  var timeblockClass = $('.time-block');
  var saveButtontEl = $('button')


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
  } else {
    var savedTextObj = JSON.parse(window.localStorage.getItem("savedTextObj"))
    for (i = 0; i < timeblockClass.length; i++) {
      var savedTextSingle = savedTextObj[timeblockClass[i].id];
      var textareaAddBack = timeblockClass[i].children[1];
      textareaAddBack.innerHTML = savedTextSingle;

    }
  }

  function enterEvent() {

    for (i = 0; i < 9; i++) {
      // at each button
      var button = saveButtontEl[i]
      // create an event listener to save text at a particular time
      button.addEventListener('click', function () {
        var clickedSaveButton = this.previousElementSibling.value;
        var textareaHTML = this.previousElementSibling;
        textareaHTML.textContent = clickedSaveButton
        savedTextObj[textareaHTML.parentNode.id] = clickedSaveButton
        window.localStorage.setItem('savedTextObj', JSON.stringify(savedTextObj));
      })
    }

  }

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
    ((hour === 6) || (hour ===7) || (hour ===8) || (hour ===9) || (hour ===10) || (hour ===11) )) { 
      for (j = 0; j < timeblockClass.length; j++ ){
      timeblockClass[j].classList.add("past");
      }
    } else if ((amPm === 'am') && // morning
    ((hour === 12) || (hour ===1)||(hour===2)||(hour===3)||(hour===4)||(hour===5)||(hour===6)||(hour===7)||(hour===8))) { 
      for (j = 0; j < timeblockClass.length; j++ ){
        timeblockClass[j].classList.add("future");
        }
    } else {
      for (i = 0; i < timeblockClass.length; i++) {
        var hourId = timeblockClass[i].id;
        businessHours.push(hourId);

        // compare if indexed hour is the same as current hour
        if (hourCompare === hourId) {
          timeblockClass[i].classList.add("present");
          // indexPoint to build past and future off of
          var indexPoint = i;
        } else {
          if (i > indexPoint) {
            timeblockClass[i].classList.add("future");
          } else {
            timeblockClass[i].classList.add("past");
          }
        }
      }
    }
  }

  // display the current date in the header of the page.
  $('#currentDay').text(today.format('dddd, MMMM D, YYYY'));

  colorCode();
  enterEvent();
});
