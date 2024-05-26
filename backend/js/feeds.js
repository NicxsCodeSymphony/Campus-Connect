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

// Function to preview image
function previewImage(event) {
    const preview = document.getElementById('previewImage');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        preview.style.backgroundImage = `url(${reader.result})`;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.style.backgroundImage = null;
    }
}
