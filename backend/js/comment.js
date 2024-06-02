$(document).ready(function() {
    var editCommentID;

    // Event binding for comment button
    $(document).on('click', '#comment-btn', function(e) {
        e.preventDefault();
        var urlParams = new URLSearchParams(window.location.search);
        var id = urlParams.get('id');
        var comment = $('.commentInput').val();

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

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    $('.comments-container').load('template.html #comment-template', function() {
        var commentsDiv = $('#comment-template').html();
        $.ajax({
            url: '../backend/php/comment.php',
            method: 'GET',
            data: { id: postId },
            dataType: 'json',
            success: function(response) {
                console.log(response.comments);
                response.comments.forEach(function(comment) {
                    var $comments = $(commentsDiv);
                    $comments.find(".user_name").text('@' + comment.username);
                    $comments.find(".friend_image").attr('src', '../backend/php/' + comment.friend_image);
                    $comments.find(".comment-text").text(comment.comment);
                    $comments.find('.Edit').attr('data-post-id', comment.id);
                    $comments.find('.Delete').attr('data-post-id', comment.id);
                    $('.comments-container').append($comments);
                });
            }
        })
    })

    // Open edit modal
    $('.comments-container').on('click', '.Edit', function() {
        editCommentID = $(this).attr('data-post-id');
        $.ajax({
            url: '../backend/php/comment.php',
            method: 'POST',
            data: {
                getComment: true,
                comment_id: editCommentID,
            },
            dataType: 'json',
            success: function(response) {
                $('#commentText').val(response.comment);
                $('#editModal').show();
            },
            error: function(xhr, status, error) {
                console.error("AJAX request failed:", status, error);
                alert("An error occurred while making the request.");
            }
        });
    });

    // Close modal
    $('.modal .close').on('click', function() {
        $('#editModal').hide();
    });

    // Save edited comment
    $('.modal .close').on('click', function() {
        $('#editModal').hide();
    });

    // Save edited comment
    $('#saveComment').on('click', function() {
        var updatedComment = $('#commentText').val();
        $.ajax({
            url: '../backend/php/comment.php',
            method: 'POST',
            data: {
                updateComment: true,
                comment_id: editCommentID,
                comment: updatedComment
            },
            dataType: 'json',
            success: function(response) {
                alert("Comment updated successfully");
                $('#editModal').hide();
                window.location.reload();
            },
            error: function(xhr, status, error) {
                console.error("AJAX request failed:", status, error);
                alert("An error occurred while updating the comment.");
            }
        });
    });

    // Delete comment
    $('.comments-container').on('click', '.Delete', function() {
        var commentID = $(this).attr('data-post-id');
        $.ajax({
            url: '../backend/php/comment.php',
            method: 'POST',
            data: {
                deleteComment: true,
                comment_id: commentID,
            },
            dataType: 'json',
            success: function(response) {
                alert("Successfully Deleted");
                window.location.reload();
            },
            error: function(xhr, status, error) {
                console.error("AJAX request failed:", status, error);
                alert("An error occurred while making the request.");
            }
        });
    });
});
