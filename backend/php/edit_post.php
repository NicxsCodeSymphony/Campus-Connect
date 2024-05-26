<?php
// Assuming you have a database connection established already
include 'connection.php';

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the post data
    $post_id = $_POST['post_id'];
    $user_id = $_POST['poster_id'];
    $caption = $_POST['caption'];
    $image_file_name = $_POST['fileName'];

    // Check if a new image was uploaded
    if ($_FILES['image']['error'] == 0) {
        $image_name = $_FILES['image']['name'];
        $image_tmp = $_FILES['image']['tmp_name'];

        $target_dir = "assets/post/";
        $target_file = $target_dir . basename($image_name);
        if (move_uploaded_file($image_tmp, $target_file)) {
            // Update the post data including the new image file name
            $stmt = $conn->prepare("UPDATE post SET poster_id = ?, caption = ?, image = ? WHERE post_id = ?");
            $stmt->bind_param("isss", $user_id, $caption, $image_file_name, $post_id);
        } else {
            echo json_encode(array("success" => false, "message" => "Failed to move uploaded file"));
            exit();
        }
    } else {
        $stmt = $conn->prepare("UPDATE post SET poster_id = ?, caption = ? WHERE post_id = ?");
        $stmt->bind_param("iss", $user_id, $caption, $post_id);
        
    }

    // Execute the SQL query to update the post
    $stmt->execute();

    // Check if the update was successful
    if ($stmt->affected_rows > 0) {
        // Return a success message
        echo json_encode(array("success" => true, "message" => "Post updated successfully"));
    } else {
        // Return an error message
        echo json_encode(array("success" => false, "message" => "Failed to update post"));
    }

    // Close the statement
    $stmt->close();
    $conn->close();
} else {
    // Return an error message if the request method is not POST
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
?>