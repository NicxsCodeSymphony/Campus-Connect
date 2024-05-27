$(document).ready(function() {
    $(document).on('click', '.addFriend', function(){
        var id = $(this).find('.user-id').val();
        // alert(id);

        $.ajax({
            url: '../backend/php/friend.php',
            type: "POST",
            data: { addFriend: true, friend_id: id },
            success: function(response) {
            }
        });
        alert("You follow a new friend wait for them to accept the request");
        window.location.reload();
    });
});
