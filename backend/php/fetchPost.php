<?php
session_start();
include 'connection.php';

$userId = $_SESSION['user_id'];

$query = "SELECT post.*, accounts.username, accounts.profile_photo, accounts.name
          FROM post
          INNER JOIN accounts ON post.poster_id = accounts.id  WHERE post.poster_id = $userId";

$res = mysqli_query($conn, $query);

$posts = array();
while ($row = mysqli_fetch_assoc($res)) {
    $posts[] = $row;
}

header('Content-Type: application/json');
echo json_encode($posts);

?>
