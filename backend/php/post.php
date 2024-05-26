<?php
session_start();
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['deletePost'])) {
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
        echo json_encode(["success" => true, "message" => "Post and file were deleted"]);
    } elseif ($res) {
        echo json_encode(["success" => true, "message" => "Post was deleted, but file was not found or deleted"]);
    } else {
        echo json_encode(["success" => false, "message" => "Post was not deleted"]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['post_id'])) {
    $postId = $_GET['post_id'];
    $query = "SELECT post.*, accounts.username, accounts.profile_photo, accounts.name
              FROM post
              INNER JOIN accounts ON post.poster_id = accounts.id
              WHERE post.post_id = $postId";

    $res = mysqli_query($conn, $query);

    $posts = array();
    while ($row = mysqli_fetch_assoc($res)) {
        $posts[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($posts);
    exit;
}

$userId = $_SESSION['user_id'];

$query = "SELECT post.*, accounts.username, accounts.profile_photo, accounts.name
          FROM post
          INNER JOIN accounts ON post.poster_id = accounts.id
          WHERE post.poster_id = $userId
          ORDER BY time_created DESC";


$res = mysqli_query($conn, $query);

$posts = array();
while ($row = mysqli_fetch_assoc($res)) {
    $posts[] = $row;
}

header('Content-Type: application/json');
echo json_encode($posts);
?>
