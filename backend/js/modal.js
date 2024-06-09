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

function handleImagePreview() {
    $('.post-container').on('click', '.post-image', function() {
        var imageUrl = $(this).attr('src');

        var modal = $('<div class="image-preview-modal">');
        var modalContent = $('<div class="modal-content">');
        var img = $('<img>').attr('src', imageUrl);

        modalContent.append(img);
        modal.append(modalContent);
        $('body').append(modal);

        // Show modal
        modal.addClass('show');

        // Close modal when clicking outside the image
        modal.click(function(e) {
            if (!$(e.target).is('img')) {
                modal.removeClass('show');
                $(this).remove();
            }
        });
    });
}

// Call the function to enable image preview
handleImagePreview();

});
