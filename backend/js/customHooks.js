$(document).ready(function() {
    let currentUserId = null;

    // Check session and load content if user is logged in
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
        // Load footer content
        $('.screen').append($('<div>').load('footer.html'));

        // Load friend list template
        $('.friendList').load('template.html #friend-template', function() {
            var friendTemplate = $('#friend-template').html();

            // Make AJAX request for notifications
            $.ajax({
                url: '../backend/php/friendList.php',
                method: 'GET',
                dataType: 'json',
                success: function(response) {
                    console.log(response);
                    if (response.status === 'success') {
                        response.users.forEach(function(user) {
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
                    console.log("An error occurred while fetching notifications.");
                }
            });
        });

        // Load post template
        $('.post-container').load('template.html #post-template', function() {
            var postTemplate = $('#post-template').html();

            // Make AJAX request for posts
            $.ajax({
                url: "../backend/php/post.php",
                type: "GET",
                dataType: 'json',
                success: function(data) {
                    data.forEach(function(post) {
                        var $post = $(postTemplate); // Use the post template

                        $post.find('.editPost').attr('data-post-id', post.post_data.post_id);
                        $post.find('.post-id').val(post.post_data.post_id);
                        $post.find('#postUsername').text("@" + post.post_data.username);
                        $post.find('.post-time').text(post.post_data.name);
                        $post.find('#userImage').attr('src', "../backend/php/" + post.post_data.profile_photo);
                        $post.find('.caption').text(post.post_data.caption);
                        $post.find('.poster-avatar').attr('src', post.post_data.poster_avatar);

                        var imagesContainer = $post.find('.img');
                        
                        // Check if post has images
                        if (post.images && post.images.length > 0) {
                            post.images.forEach(function(image) {
                                var $img = $('<img class="post-image" alt="">').attr('src', "../backend/php/" + image);
                                imagesContainer.append($img);
                            });
                        } else {
                            // Handle case where there are no images
                            imagesContainer.append($('<p></p>')); // Placeholder text or empty container
                        }

                        // Hide the editPost element if the poster_id is not equal to the current user ID
                        if (post.post_data.poster_id !== currentUserId) {
                            $post.find('.editPost').hide();
                        }

                        $('.post-container').append($post);
                    });
                },
                error: function(xhr, status, error) {
                    console.error("AJAX request failed:", status, error);
                    console.log("An error occurred while fetching posts.");
                }
            });
        });

        // Load add friend template
        $('.friend-list').load('template.html #add-friend-template', function() {
            var friendTemplate = $('#add-friend-template').html();

            // Make AJAX request for friends
            $.ajax({
                url: '../backend/php/friend.php',
                method: 'GET',
                dataType: 'json',
                success: function(response) {
                    console.log(response);
                    if (response.status === 'success') {
                        response.users.forEach(function(user) {
                            var $friend = $(friendTemplate);
                            $friend.find('.friend-name').text(user.username);
                            $friend.find('.user-id').val(user.id);
                            $friend.find('.friend-image').attr('src', `../backend/php/${user.profile_photo}`);
                            $('.friend-list').append($friend);
                        });
                    } else {
                        console.log(response.message);
                    }
                },
                error: function(xhr, status, error) {
                    console.error("AJAX request failed:", status, error);
                    console.log("An error occurred while fetching friends.");
                }
            });
        });
    }
});
