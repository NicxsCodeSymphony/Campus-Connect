$(document).ready(function(){

    images = []

    $("#addPost").on("submit", function(e) {
        e.preventDefault();
        
        var formData = new FormData();
        formData.append('post', true);
        formData.append('poster_id', $("#user_id").val());
        formData.append('caption', $("#caption").val());
     
        for (let i = 0; i < images.length; i++) {
            formData.append('imageInput[]', images[i]);
        }

        $.ajax({
            url: "../backend/php/addPost.php",
            method: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                alert(data);
                $("#addPost")[0].reset();
                window.location.href = "feeds.html";
            }
        });
    });

    $('#editPost').submit(function(event) {
        event.preventDefault();
        var urlParams = new URLSearchParams(window.location.search);
        var postId = urlParams.get('id');
        var user_id = $('#user_id').val();
        var caption = $('#caption').val();
        var formData = new FormData(this);
        var fileInput = document.getElementById('imageInput');
        formData.append('image', fileInput.files[0]);
        var fileName = $('#inputImg').val()
        formData.append('fileName', fileName);
        formData.append('post_id', postId);
        formData.append('poster_id', user_id);
        formData.append('caption', caption);
        formData.append('edit', true)

        $.ajax({
            url: '../backend/php/post.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response)
                window.location.href = "feeds.html";
            },
            error: function(xhr, status, error) {
                // Handle the error
                console.error(error);
            }
        });
    });

    $(document).on('click', '.openComment', function(e){
        e.preventDefault();
        var postId = $(this).closest('.post-content').find('.post-id').val();
        window.location.href = `comment.html?id=${postId}`
    });

    $(document).on('click', '.clickable-heart', function(e){
        e.preventDefault();
        var postId = $(this).closest('.post-content').find('.post-id').val();
        
        $.ajax({
            url: '../backend/php/comment.php',
            method: 'POST',
            data: {likePost: true,postId: postId},
            success: function(response) {
                console.log(response)
                window.location.reload;
            },
        })
    });
    
    
    // SHOW MODAL
    $(document).on('click', '.editPost', function(e) {
        e.preventDefault();
        var postId = $(this).attr('data-post-id');
        $(".post_id_input").val(postId);
        // $(".edModal").css("display", "block");
        $(".edModal").toggle();
    });
    
    // EDIT POST

    $(document).on('click', '.edit-btn', function(e) {
        e.preventDefault();
        let postId = $(".post_id_input").val();
        window.location.href = `editPost.html?id=${postId}`;
    });

    // DELETE POST
    $(document).on('click', '.delete-btn', function(e) {
        e.preventDefault();
        let postId = $(".post_id_input").val();
        if (confirm('Are you sure you want to delete this post?')) {
            $.ajax({
                url: "../backend/php/post.php",
                type: "POST",
                data: { deletePost: true, post_id: postId },
                success: function(response) {
                    var res = JSON.parse(response);
                    if (res.success) {
                    } else {
                        alert(res.message);
                    }
                },
                error: function(xhr, status, error) {
                    alert("An error occurred: " + error);
                }
            });
            window.location.reload();
        }

    });
    
    

});


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
    const files = event.target.files;  
    selectedFile(files)

    // Clear previous preview
    preview.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '200px'; 
            preview.appendChild(img);
        }

        reader.readAsDataURL(file);
    }

    function selectedFile(files) {
        // Convert the FileList to an array and append it to the images array
        images = images.concat(Array.from(files));
    }

    // If there are files, set the input value to the path of the first file
    if (files.length > 0) {
        $('#inputImg').val("assets/post/" + files[0].name);
    } else {
        // If no files selected, clear the input value
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

