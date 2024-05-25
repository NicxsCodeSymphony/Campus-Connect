$(document).ready(function() {
    $('.screen').append($('<div>').load('footer.html'));
    $('.friendList').load('template.html #friend-template', function() {
        $('.post-container').load('template.html #post-template', function() {
            var friendTemplate = $('#friend-template').html();
            var postTemplate = $('#post-template').html();

            for (var i = 0; i < 3; i++) {
                $('.friendList').append(friendTemplate);
            }

            for (var i = 0; i < 2; i++) {
                $('.post-container').append(postTemplate);
            }
        });
    });

    $('.friend-list').load('template.html #add-friend-template', function(){
       var friends = $('#add-friend-template').html();

        for(var i = 0; i < 10; i++){
            $('.friend-list').append(friends);
        }
    })

    $('.notifs-container').load('template.html #notifs-template', function(){
        var notifs = $('#notifs-template').html();
        for(var i = 0; i < 20; i++){
            $('.notifs-container').append(notifs);
        }
    })
});