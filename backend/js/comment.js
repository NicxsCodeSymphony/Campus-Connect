$(document).ready(function() {
    // Event binding for comment button
    $(document).on('click', '#comment-btn', function(e) {
        e.preventDefault();
        var urlParams = new URLSearchParams(window.location.search);
        var id = urlParams.get('id');
        var comment = $('.commentInput').val()

        $.ajax({
            url: '../backend/php/comment.php',
            method: 'POST',
            data: {
                addComment: true,
                post_id: id,
                comment: comment,
            },
            dataType: 'json',
            success: function(response) {
                alert("COMMENT ADDED SUCCESSFULLY");
                window.location.reload();
            },
            error: function(xhr, status, error) {
                console.error("An error occurred:", error);
                alert("Failed to add comment. Please try again.");
            }
        });
    });



    // Extract postId from the URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

$('.comments-container').load('template.html #comment-template', function(){
    var commentsDiv = $('#comment-template').html();
    // Make the AJAX request
    $.ajax({
        url: '../backend/php/comment.php',
        method: 'GET',
        data: { id: postId }, 
        dataType: 'json',
        success: function(response) {
            console.log(response.comments); 
           response.comments.forEach(function(comment){
            var $comments = $(commentsDiv)
            $comments.find(".user_name").text('@' + comment.username)
            $comments.find(".friend_image").attr('src', '../backend/php/' + comment.friend_image)
            $comments.find(".comment-text").text(comment.comment)
            $('.comments-container').append($comments);
           })
        },
        error: function(xhr, status, error) {
            console.error("AJAX request failed:", status, error);
            alert("An error occurred while making the request.");
        }
    });
});

});
