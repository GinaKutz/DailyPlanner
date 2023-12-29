// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.

    

        // JavaScript/jQuery for saving text for the day
        $(function() {
        const saveButton = $('#save-button');
        const userInput = $('#user-input');
        
        // Function to get today's date in the format YYYY-MM-DD
        function getTodayDate() {
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }
        
        saveButton.on('click', function() {
          const todayDate = getTodayDate();
          const userText = userInput.val();
          
          // Save the text for today's date in local storage
          localStorage.setItem(todayDate, userText);
          alert('Text saved for today!');
        });
      });

      $(function() {
        const clearLocalStorageOnNewDay = () => {
          const currentDate = new Date().getDate();
          const storedDate = localStorage.getItem('savedDate');
      
          if (storedDate && parseInt(storedDate) !== currentDate) {
            localStorage.clear(); // Clear local storage when a new day starts
            localStorage.setItem('savedDate', currentDate);
          }
        };
      
        const saveText = () => {
          const userText = $('#user-input').val();
          localStorage.setItem('userText', userText);
          alert('Text saved!');
        };
      
        const loadText = () => {
          const storedText = localStorage.getItem('userText');
          if (storedText) {
            $('#user-input').val(storedText);
          }
        };
      
        $('#save-button').on('click', saveText);
      
        // Check and clear local storage when a new day starts
        clearLocalStorageOnNewDay();
      
        // Load text when the page loads
        loadText();
      });
      
      
        // Function to update time block classes
        function updateTimeBlocks() {
          const currentHour = new Date().getHours();
      
          $('.time-block').each(function() {
            const blockHour = parseInt($(this).attr('id').split('-')[1]);
      
            if (blockHour < currentHour) {
              $(this).removeClass('present future').addClass('past');
            } else if (blockHour === currentHour) {
              $(this).removeClass('past future').addClass('present');
            } else {
              $(this).removeClass('past present').addClass('future');
            }
          });
        }
      
        updateTimeBlocks(); // Initial update

        setInterval(updateTimeBlocks, 3600000); // Update every hour (3600000 milliseconds)

      
        // Retrieve user inputs from localStorage and set textarea values
        $('.time-block').each(function() {
          const blockID = $(this).attr('id');
          const savedDescription = localStorage.getItem(blockID);
      
          if (savedDescription !== null) {
            $(this).find('.description').val(savedDescription);
          }
        });
        
      
        // Display current date in the header
        const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        $('#current-date').text(currentDate); 

 
      
  });