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


    $(document).on('click', '.accept', function(){
        let friend_id = $('.friend_id').val()
        // alert(friend_id)
        
        $.ajax({
            url: '../backend/php/notifs.php',
            type: "POST",
            data: { accept: true, friend_id: friend_id },
            success: function(response) {
                alert("You are now friends with this friend");
                window.location.reload();
            }
        })
    })
});
