$(document).ready(function() {
    $('#form-register').on('submit', function(e) {
        e.preventDefault();
        const name = $('#name').val()
        const username = $('#username').val()
        const password = $('#password').val()

        $.ajax({
            url: '../backend/php/started.php',
            type: 'POST',
            data: {
                register: true,
                name: name,
                username: username,
                password: password,
            },
            success: function(response) {
                alert(response);
                window.location.href = 'index.html';
            }
        })
    });

    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();

        $.ajax({
            url: '../backend/php/started.php',
            type: 'POST',
            data: {
                login: true,
                username: username,
                password: password,
            },
            success: function(response) {
                const res = JSON.parse(response);
                alert(res.message);
                if (res.success) {
                    window.location.href = 'feeds.html';
                }
            },
            error: function(xhr, status, error) {
                alert("An error occurred: " + error);
            }
        });
    });

});