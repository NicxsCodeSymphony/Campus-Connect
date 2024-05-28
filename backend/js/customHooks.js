$(document).ready(function() {
    let post_id = "";
    $('.screen').append($('<div>').load('footer.html'));
    $('.friendList').load('template.html #friend-template', function() {
        $('.post-container').load('template.html #post-template', function() {
            var friendTemplate = $('#friend-template').html();
            var postTemplate = $('#post-template').html();

            // for (var i = 0; i < 10; i++) {
            //     $('.friendList').append(friendTemplate);
            // }

            $.ajax({
                url: '../backend/php/notifs.php',
                method: 'GET',
                dataType: 'json',
                success: function(response) {
                    console.log(response); 
                    if (response.status === 'success') {
                        response.users.forEach(function(user) {
                            console.log(user);
                            var $friendList = $(friendTemplate); 
                            $friendList.find('.friendAvatar').attr('src', "../backend/php/" + user.friend_image);
                            $friendList.find('.friendUsername').text(user.friend_username);
                            $('.friendList').append($friendList);
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
            

            $.ajax({
                url: "../backend/php/post.php",
                type: "GET",
                success: function(data){
                    data.forEach(function(post) {
                        var $post = $(postTemplate);
                        $post.find('.editPost').attr('data-post-id', post.post_id);
                        $post.find('.post-id').val(post.post_id);
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
        var notification = $('#notifs-template').html();
        // Make the AJAX request
        $.ajax({
            url: '../backend/php/notifs.php',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                console.log(response); 
                if (response.status === 'success') {
                    response.users.forEach(function(user) {
                        console.log(user);
                        var $notifs = $(notification);
                        $notifs.find('.user_name').text(user.friend_name);
                        $notifs.find('.friend_image').attr('src', `../backend/php/${user.friend_image}`);
    
                        if(user.status === 'request'){
                            const currentTime = new Date();
                            const notificationTime = new Date(user.time_created);
                            const diffMs = currentTime - notificationTime;
                            const diffSec = Math.floor(diffMs / 1000);
                            const diffMin = Math.floor(diffSec / 60);
                            const diffHour = Math.floor(diffMin / 60);
                            const diffDay = Math.floor(diffHour / 24);
                            if (diffHour > 0) {
                                $notifs.find('.notif-text').text('sent you a friend request ' + (diffHour === 1 ? '1 hour ago' : diffHour + ' hours ago'));
                            } else if (diffMin > 0) {
                                $notifs.find('.notif-text').text('sent you a friend request ' + (diffMin === 1 ? '1 minute ago' : diffMin + ' minutes ago'));
                            } else if (diffSec > 0) {
                                $notifs.find('.notif-text').text('sent you a friend request ' + (diffSec === 1 ? '1 second ago' : diffSec + ' seconds ago'));
                            } else {
                                $notifs.find('.notif-text').text('sent you a friend request ' + (diffDay === 1 ? '1 day ago' : diffDay + ' days ago'));
                            }
                            $notifs.find('.see').hide();
                            $notifs.find('.accept').show();
                            $notifs.find('.ignore').show();
                        } else {
                            // $notifs.find('.actions').hide();
                        $notifs.find('.notif-text').text('You are now friends with @' + user.friend_username);
                            $notifs.find('.accept').hide();
                            $notifs.find('.ignore').hide();
                        }
                        
                        $notifs.find('.friend_id').val(user.friend_id);
                        $('.notifs-container').append($notifs);
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

});


