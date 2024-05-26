<?php

include 'connection.php';

$query = "SELECT * FROM post";
$res = mysqli_query($conn, $query);

$posts = array();
while ($row = mysqli_fetch_assoc($res)) {
    $posts[] = $row;
}

header('Content-Type: application/json');
echo json_encode($posts);

?>
