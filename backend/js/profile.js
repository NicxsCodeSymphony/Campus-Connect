$(document).ready(function(){
    // Fetch user profile data
    $.ajax({
        url: '../backend/php/profile.php',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            if(response.status === 'success') {
                console.log(response.user);
                $('#fullName').val(response.user.name);
                $('#bio').val(response.user.bio);
                $('#gender').val(response.user.gender);
            } else {
                alert(response.message);
            }
        }
    });

    // Handle form submission
    $('#editProfile').on('submit', function(e){
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            url: '../backend/php/profile.php',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(response) {
                alert(response.message);
                window.location.href = "profile.html"
            }
        });
    });
});