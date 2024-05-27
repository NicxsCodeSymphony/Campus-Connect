$(document).ready(function() {
    let post_id = "";
    $('.screen').append($('<div>').load('footer.html'));
    $('.friendList').load('template.html #friend-template', function() {
        $('.post-container').load('template.html #post-template', function() {
            var friendTemplate = $('#friend-template').html();
            var postTemplate = $('#post-template').html();

            for (var i = 0; i < 10; i++) {
                $('.friendList').append(friendTemplate);
            }

            $.ajax({
                url: "../backend/php/post.php",
                type: "GET",
                success: function(data){
                    data.forEach(function(post) {
                        var $post = $(postTemplate);
                        $post.find('.editPost').attr('data-post-id', post.post_id);
                        $post.find('#postUsername').text("@" + post.username);
                        $post.find('.post-time').text(post.name);
                        $post.find('#userImage').attr('src', "../backend/php/" + post.profile_photo);
                        $post.find('.caption').text(post.caption);
                        $post.find('.poster-avatar').attr('src', post.poster_avatar);
                        $post.find('.post-image').attr('src', "../backend/php/" + post.image);
                        $('.post-container').append($post);
                    });
                },
                error: function(xhr, status, error) {
                    console.error("An error occurred: " + error);
                }
            });
            
        });
        
    });

    let friendTemplate = '';
    
    // Load the friend template
    $('.friend-list').load('template.html #add-friend-template', function() {
        friendTemplate = $('#add-friend-template').html();

        // Make the AJAX request
        $.ajax({
            url: '../backend/php/friend.php',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                console.log(response); // Log the response to inspect it
                if (response.status === 'success') {
                    response.users.forEach(function(user) {
                        var $friend = $(friendTemplate);
                        $friend.find('.friend-name').text(user.username);
                        $friend.find('.user-id').val(user.id);
                        $friend.find('.friend-image').attr('src', `../backend/php/${user.profile_photo}`);
                        $('.friend-list').append($friend);
                    });
                } else {
                    alert(response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX request failed:", status, error);
                alert("An error occurred while making the request.");
            }
        });
        
        
    });


    $('.notifs-container').load('template.html #notifs-template', function(){
        var notifs = $('#notifs-template').html();
        for(var i = 0; i < 20; i++){
            $('.notifs-container').append(notifs);
        }
    })
});


