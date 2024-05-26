<?php
include 'connection.php';

if (isset($_POST['edit'])) {
    // Get the post data
    $post_id = $_POST['post_id'];
    $caption = $_POST['caption'];
    $image_file_name = $_POST['fileName'];

    echo $post_id;
    echo $image_file_name;
    echo $caption;

    // Move the image file to the assets/post/ directory
    $target_directory = "assets/post/";
    $target_file = $target_directory . basename($_FILES["image"]["name"]);
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        // File was moved successfully, update the caption
        $query = "UPDATE post SET caption='$caption', image ='$image_file_name' WHERE post_id='$post_id'";
        $res = mysqli_query($conn, $query);
        if ($res) {
            if (file_exists("assets/post/" + $image_file_name)) {
                unlink($image_file_name);
            }
            echo json_encode(["success" => true, "message" => "Post caption was updated"]);
        } else {
            echo json_encode(["success" => false, "message" => "Post caption was not updated"]);
        }
    } else {
        $query = "UPDATE post SET caption='$caption' WHERE post_id='$post_id'";
        $res = mysqli_query($conn, $query);
        if ($res) {
            echo json_encode(["success" => true, "message" => "Post caption was updated"]);
        } else {
            echo json_encode(["success" => false, "message" => "Post caption was not updated"]);
        }  
    }
}
?>
