$(document).ready(function() {

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
            
                            if (user.status === 'request') {
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
                                $notifs.find('.notif-text').text('You are now friends with @' + user.friend_username);
                                $notifs.find('.accept').hide();
                                $notifs.find('.ignore').hide();
                            }
            
                            $notifs.find('.friend_id').val(user.friend_id);
                            $('.notifs-container').append($notifs);
                        });
            
                        // Second AJAX request
                        $.ajax({
                            url: '../backend/php/notifs2.php',
                            method: 'GET',
                            dataType: 'json',
                            success: function(response) {
                                console.log(response); 
                                if (response.status === 'success') {
                                    response.notifications.forEach(function(user) {
                                        console.log(user);
                                    if(user.type === 'comment'){
                                        var $notifs = $(notification);
                                        const currentTime = new Date();
                                        const notificationTime = new Date(user.time);
                                        const diffMs = currentTime - notificationTime;
                                        const diffSec = Math.floor(diffMs / 1000);
                                        const diffMin = Math.floor(diffSec / 60);
                                        const diffHour = Math.floor(diffMin / 60);
                                        const diffDay = Math.floor(diffHour / 24);
                                        $notifs.find('.user_name').text(user.name);
                                        $notifs.find('.friend_image').attr('src', `../backend/php/${user.friend_image}`);
                                        if (diffHour > 0) {
                                            $notifs.find('.notif-text').text('commented on your post ' + (diffHour === 1 ? '1 hour ago' : diffHour + ' hours ago'));
                                        } else if (diffMin > 0) {
                                            $notifs.find('.notif-text').text('commented on your post ' + (diffMin === 1 ? '1 minute ago' : diffMin + ' minutes ago'));
                                        } else if (diffSec > 0) {
                                            $notifs.find('.notif-text').text('commented on your post ' + (diffSec === 1 ? '1 second ago' : diffSec + ' seconds ago'));
                                        } else {
                                            $notifs.find('.notif-text').text('commented on your post ' + (diffDay === 1 ? '1 day ago' : diffDay + ' days ago'));
                                        }
                                        $notifs.find('.accept').hide();
                                        $notifs.find('.ignore').hide();
                                        $notifs.find('.friend_id').val(user.friend_id);
                                        $('.notifs-container').append($notifs);
                                    }

                                    else if(user.type === 'like'){
                                        var $notifs = $(notification);
                                        const currentTime = new Date();
                                        const notificationTime = new Date(user.time);
                                        const diffMs = currentTime - notificationTime;
                                        const diffSec = Math.floor(diffMs / 1000);
                                        const diffMin = Math.floor(diffSec / 60);
                                        const diffHour = Math.floor(diffMin / 60);
                                        const diffDay = Math.floor(diffHour / 24);
                                        $notifs.find('.user_name').text(user.name);
                                        $notifs.find('.friend_image').attr('src', `../backend/php/${user.friend_image}`);
                                        if (diffHour > 0) {
                                            $notifs.find('.notif-text').text('liked your post ' + (diffHour === 1 ? '1 hour ago' : diffHour + ' hours ago'));
                                        } else if (diffMin > 0) {
                                            $notifs.find('.notif-text').text('liked your post ' + (diffMin === 1 ? '1 minute ago' : diffMin + ' minutes ago'));
                                        } else if (diffSec > 0) {
                                            $notifs.find('.notif-text').text('liked your post ' + (diffSec === 1 ? '1 second ago' : diffSec + ' seconds ago'));
                                        } else {
                                            $notifs.find('.notif-text').text('liked your post ' + (diffDay === 1 ? '1 day ago' : diffDay + ' days ago'));
                                        }
                                        $notifs.find('.accept').hide();
                                        $notifs.find('.ignore').hide();
                                        $notifs.find('.friend_id').val(user.friend_id);
                                        $('.notifs-container').append($notifs);
                                    }

                                    
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
            
                    } else {
                        console.log(response.message);
                    }
                },
                error: function(xhr, status, error) {
                    console.error("AJAX request failed:", status, error);
                    console.log("An error occurred while making the request.");
                }
            });            
        });
})