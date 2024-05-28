<?php
session_start();
include 'connection.php';

header('Content-Type: application/json');

function send_json_response($data) {
    ob_clean(); // Clean (erase) the output buffer and turn off output buffering
    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['deletePost'])) {
        $postId = $_POST['post_id'];
        $query = "SELECT image FROM post WHERE post_id = $postId";
        $res = mysqli_query($conn, $query);
        $fileDeleted = false;

        if ($res && mysqli_num_rows($res) > 0) {
            $row = mysqli_fetch_assoc($res);
            $filePath = $row['image']; 

            if (file_exists($filePath)) {
                $fileDeleted = unlink($filePath);
            }
        }

        $query = "DELETE FROM post WHERE post_id = $postId";
        $res = mysqli_query($conn, $query);

        if ($res && $fileDeleted) {
            send_json_response(["success" => true, "message" => "Post and file were deleted"]);
        } elseif ($res) {
            send_json_response(["success" => true, "message" => "Post was deleted, but file was not found or deleted"]);
        } else {
            send_json_response(["success" => false, "message" => "Post was not deleted"]);
        }
    }

    if (isset($_POST['edit'])) {
        $post_id = $_POST['post_id'];
        $caption = $_POST['caption'];
        $image_file_name = $_POST['fileName'];

        $target_directory = "assets/post/";
        $target_file = $target_directory . basename($_FILES["image"]["name"]);
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            $query = "UPDATE post SET caption='$caption', image='$image_file_name' WHERE post_id='$post_id'";
            $res = mysqli_query($conn, $query);
            if ($res) {
                if (file_exists($target_directory . $image_file_name)) {
                    unlink($target_directory . $image_file_name);
                }
                send_json_response(["success" => true, "message" => "Post caption was updated"]);
            } else {
                send_json_response(["success" => false, "message" => "Post caption was not updated"]);
            }
        } else {
            $query = "UPDATE post SET caption='$caption' WHERE post_id='$post_id'";
            $res = mysqli_query($conn, $query);
            if ($res) {
                send_json_response(["success" => true, "message" => "Post caption was updated"]);
            } else {
                send_json_response(["success" => false, "message" => "Post caption was not updated"]);
            }
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_SESSION['user_id'];

    if (isset($_GET['post_id'])) {
        $postId = $_GET['post_id'];
        $query = "SELECT post.*, accounts.username, accounts.profile_photo, accounts.name
                  FROM post
                  INNER JOIN accounts ON post.poster_id = accounts.id
                  WHERE post.post_id = ?
                  AND (
                      post.poster_id = ?
                      OR post.poster_id IN (
                          SELECT friend_id FROM friend WHERE user_id = ? AND status = 'mutual'
                          UNION
                          SELECT user_id FROM friend WHERE friend_id = ? AND status = 'mutual'
                      )
                  )";

        $stmt = $conn->prepare($query);
        $stmt->bind_param('iiii', $postId, $userId, $userId, $userId);
        $stmt->execute();
        $res = $stmt->get_result();

        $posts = array();
        while ($row = mysqli_fetch_assoc($res)) {
            $posts[] = $row;
        }

        send_json_response($posts);
    }

    $query = "SELECT post.*, accounts.username, accounts.profile_photo, accounts.name
              FROM post
              INNER JOIN accounts ON post.poster_id = accounts.id
              WHERE post.poster_id = ?
              OR post.poster_id IN (
                  SELECT friend_id FROM friend WHERE user_id = ? AND status = 'mutual'
                  UNION
                  SELECT user_id FROM friend WHERE friend_id = ? AND status = 'mutual'
              )
              ORDER BY time_created DESC";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('iii', $userId, $userId, $userId);
    $stmt->execute();
    $res = $stmt->get_result();

    $posts = array();
    while ($row = mysqli_fetch_assoc($res)) {
        $posts[] = $row;
    }

    send_json_response($posts);
}
?>
