$(document).ready(function() {
    $(document).on('click', '.addFriend', function(){
        var id = $(this).find('.user-id').val();
        // console.log(id);

        $.ajax({
            url: '../backend/php/friend.php',
            type: "POST",
            data: { addFriend: true, friend_id: id },
            success: function(response) {
            }
        });
        console.log("You follow a new friend wait for them to accept the request");
        window.location.reload();
    });

    $(document).on('click', '.accept', function() {
        let friend_id = $('.friend_id').val();
        $.ajax({
            url: '../backend/php/friend.php',
            type: "POST",
            data: { accept: true, friend_id: friend_id },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    console.log("You are now friends with this user");
                } else {
                    console.log(response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX request failed:", status, error);
                console.log("An error occurred while processing your request.");
            }
        });
    });
    
});
