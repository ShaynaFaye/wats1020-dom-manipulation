//////////////////////////////////////////////////
// WATS1020 Dom Manipulation
// Custom script goes here.
//////////////////////////////////////////////////

$( document ).ready(function() {
    var userInfo = {
        firstName: 'Jane',
        lastName: 'Doe'
    };
    var voteCounts = {
        great: 0,
        greatest: 0,
        total: 0
    };
    
 
    // Place all your Javascript code inside this "document ready" function so
    // it does not run until the DOM is ready for Javascript manipulation.

       
    // This function listens for clicks on the "login" button.      
    /*  When user clicks on "login" button, hide the login form elements and show "Welcome, name".  Not actually validating or checking any data here, but going to use the name from above in variable "userInfo"" for a mock user.  This function checks var userInfo and inputs that text.*/
    $('.login-button').on('click', function(event){
        console.log(event);
        $('#login-form').hide();
        $('.user-fullname').text(userInfo.firstName + ' ' + userInfo.lastName);
        $('.user-info').show(400);
    });

    // When user clicks "logout" button, show the login form elements again
    $('.logout-button').on('click', function(event){
            console.log(event);
            $('.user-info').hide();
            $('#login-form').show(400);
    });

   

    // This function listens for clicks on any of the view details buttons.  
    $('.view-details').on('click', function(event){
        console.log(event);
        var targetElement = event.target;
        
        // when button is clicked, find that element's grandparent
        var container = targetElement.parentElement.parentElement;
        
        // within this element find all elements with the class "details"
        $(container).find('.details').each(function(index, el){
            
            // Using if/else, toggle the visibility of all elements within the parent "details" element when the 'View Details' button is clicked
            // Also, if the details are showing, then change text of the button to "Hide details"
            if ($(el).is(':visible')){
                $(el).fadeOut();
                targetElement.innerText = "View Details"
            } else {
                $(el).fadeIn();
                targetElement.innerText = "Hide Details"
            }
        });
    });
    
    var updateBars = function (voteCounts) {
        var greatBar = $('.great-progress');  
        var greatestBar = $('.greatest-progress');
        
        // determine percentage of total votes for each progress bar based on voteCounts from function below
        var greatWidth = voteCounts.great/voteCounts.total; 
        var greatestWidth = voteCounts.greatest/voteCounts.total;
        
        // Change width of each bar according to its percentage of the votes
        // Multiply results from above by 100 to get percentages out of 100
        greatBar.css('width', greatWidth*100 + '%');  
        greatestBar.css('width', greatestWidth*100 + '%');
        
    };

    // Function listening for clicks on the buttons with class of "vote"
    $('.vote').on('click', function (event) {
        var button = $(event.target);
        
        // determine whether user is clicking on "great"" or "greatest" button and then add 1 to the vote count for that item
        if(button.data('vote') == 'great') {
            voteCounts.great += 1;
        }else if (button.data('vote') == 'greatest') {
            voteCounts.greatest += 1;
        }
        
        voteCounts.total += 1;
        updateBars(voteCounts);
    });

});
