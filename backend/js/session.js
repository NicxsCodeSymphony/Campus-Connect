 $(document).ready(function() {
            $.ajax({
                url: '../backend/php/session.php',
                type: 'GET',
                success: function(response) {
                    const res = JSON.parse(response);
                    if (res.success) {
                        console.log("Session User ID: " + res.user_id);
                    } else {
                        alert(res.message);
                    }
                },
                error: function(xhr, status, error) {
                    alert("An error occurred: " + error);
                }
            });
        });