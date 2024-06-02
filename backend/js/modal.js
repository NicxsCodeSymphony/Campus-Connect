$(document).ready(function(){
    $(document).on('click', '#edModal', function(){
        var modalContainer = $('.modal-container').parent();
        if (modalContainer.is(':visible')) {
            modalContainer.hide(); // Hide the modal container if it's visible
        } else {
            modalContainer.show(); // Show the modal container if it's hidden
        }
    });

    // Close the modal on button click
    $('.modal-container button').on('click', function(){
        $('.modal-container').parent().hide(); // Hide the modal container
    });

    // Make clickable-heart clickable and alert "HELLO"
    $('.clickable-heart').on('click', function(){
        alert("HELLO");
    });
});
