<?php

include "connection.php";

if(isset($_POST['post'])){
    $user_id = $_POST['poster_id'];
    $caption = $_POST['caption'];
    $image = "";

    if(isset($_FILES["imageInput"]) && $_FILES["imageInput"]["error"] == UPLOAD_ERR_OK) {
        $target_dir = "assets/post/";
        $target_file = $target_dir . basename($_FILES["imageInput"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        $check = getimagesize($_FILES["imageInput"]["tmp_name"]);
        if($check !== false) {
            $uploadOk = 1;
        } else {
            echo json_encode(["success" => false, "message" => "File is not an image."]);
            $uploadOk = 0;
        }

        if ($_FILES["imageInput"]["size"] > 1000000) {
            echo json_encode(["success" => false, "message" => "Sorry, your file is too large."]);
            $uploadOk = 0;
        }

        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
            echo json_encode(["success" => false, "message" => "Sorry, only JPG, JPEG, PNG & GIF files are allowed."]);
            $uploadOk = 0;
        }

        if ($uploadOk == 0) {
            echo json_encode(["success" => false, "message" => "Sorry, your file was not uploaded."]);
        } else {
            if (move_uploaded_file($_FILES["imageInput"]["tmp_name"], $target_file)) {
                $image = $target_file;
            } else {
                echo json_encode(["success" => false, "message" => "Sorry, there was an error uploading your file."]);
            }
        }
    }

    $stmt = $conn->prepare("INSERT INTO post (poster_id, caption, image) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $user_id, $caption, $image);

    if($stmt->execute() === TRUE){
        echo json_encode(["success" => true, "message" => "Post was successful"]);
    }else{
        echo json_encode(["success" => false, "message" => "Post was not successful"]);
    }

    $stmt->close();
}

$conn->close();

?>
