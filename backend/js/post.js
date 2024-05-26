$(document).ready(function(){

    $("#addPost").on("submit", function(e){
        e.preventDefault();
        
        var formData = new FormData();
        formData.append('post', true);
        formData.append('poster_id', $("#user_id").val());
        formData.append('caption', $("#caption").val());
        formData.append('imageInput', $("#imageInput")[0].files[0]);
        
        $.ajax({
            url: "../backend/php/addPost.php",
            method: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(data){
                alert(data);
                $("#addPost")[0].reset();
                window.location.href = "feeds.html";
            }
        });
    });
});




// Function to extract post ID from URL query parameters
 function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function loadPostData(postId) {
    $.ajax({
        url: "../backend/php/post.php",
        type: "GET",
        data: { post_id: postId },
        success: function(data) {
            console.log(data);
            if (data.length === 1) {
                const post = data[0];
                $("#caption").val(post.caption);
                let imageUrl = `../backend/php/${post.image}`;
                $('#inputImg').val(imageUrl.replace("../backend/php/", ""));
                $('#previewImage').css('background-image', `url("${imageUrl}")`);
                $('#imagePreview').attr('src', imageUrl);
            } else {
                console.error("Post not found or multiple posts returned.");
            }
        },
        error: function(xhr, status, error) {
            console.error("An error occurred: " + error);
        }
    });
}

function previewImage(event) {
    const preview = document.getElementById('previewImage');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        preview.style.backgroundImage = `url(${reader.result})`;
    }

    if (file) {
        reader.readAsDataURL(file);
        $('#inputImg').val("assets/post/" + file.name);
    } else {
        preview.style.backgroundImage = null;
        $('#inputImg').val(""); 
    }
}



$(document).ready(function() {
    const postId = getPostIdFromUrl();
    if (postId) {
        loadPostData(postId);
    } else {
        console.error("Post ID not found in URL.");
    }
});

// Function to navigate to editPost.html with post_id as a query parameter
function goto() {
    let postId = $('.post_id').val();
    window.location.href = "editPost.html?id=" + postId;
}

