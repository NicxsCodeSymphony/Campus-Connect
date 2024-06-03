$(document).ready(function() {
    let post_id = "";
    let currentUserId = null;
    
    $.ajax({
        url: '../backend/php/session.php',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.user_id) {
                currentUserId = response.user_id;
                loadContent();
            } else {
                console.log('User not logged in');
            }
        },
        error: function(xhr, status, error) {
            console.error("AJAX request failed:", status, error);
            console.log("An error occurred while fetching the current user ID.");
        }
    });

    function loadContent() {
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
                            console.log(response.message);
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error("AJAX request failed:", status, error);
                        console.log("An error occurred while making the request.");
                    }
                });
                

                $.ajax({
                    url: "../backend/php/post.php",
                    type: "GET",
                    success: function(data) {
                        data.forEach(function(post) {
                            console.log("Post info: ", post);
                            var $post = $($('#post-template').html()); // Use the template content
                            $post.find('.editPost').attr('data-post-id', post.post_data.post_id);
                            $post.find('.post-id').val(post.post_data.post_id);
                            $post.find('#postUsername').text("@" + post.post_data.username);
                            $post.find('.post-time').text(post.post_data.name);
                            $post.find('#userImage').attr('src', "../backend/php/" + post.post_data.profile_photo);
                            $post.find('.caption').text(post.post_data.caption);
                            $post.find('.poster-avatar').attr('src', post.post_data.poster_avatar);
                
                            var imagesContainer = $post.find('.img');
                            post.images.forEach(function(image) {
                                // Create a new image element for each image URL
                                var $img = $('<img class="post-image" alt="">').attr('src', "../backend/php/" + image);
                                imagesContainer.append($img); // Append each image to the images container
                            });
                
                            // Hide the editPost element if the poster_id is not equal to the current user ID
                            if (post.post_data.poster_id !== currentUserId) {
                                $post.find('.editPost').hide();
                            }
                
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
                        // console.log(response.message);
                    }
                },
                error: function(xhr, status, error) {
                    console.error("AJAX request failed:", status, error);
                    console.log("An error occurred while making the request.");
                }
            });
        });
    }
});
