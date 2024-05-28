<?php
session_start();
include 'connection.php';

header('Content-Type: application/json'); // Set the content type to JSON

$user_id = $_SESSION['user_id'];

if(isset($_POST['addComment'])){
    $postId = $_POST['post_id'];
    $comment = $_POST['comment'];

    $query = "INSERT INTO comments (user_id, post_id, comment) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sss", $user_id, $postId, $comment);
    $stmt->execute();
    $stmt->close();
    
    // Send a JSON response
    echo json_encode(array('status' => 'success'));
    exit(); // Make sure to exit after sending the JSON response
}

// Get postId from URL parameter
if(isset($_GET['id'])){
    $postId = $_GET['id'];

    // $query = "SELECT * FROM comments WHERE post_id = ?";
    $query = "SELECT f.*, a.profile_photo as friend_image, a.username
    FROM comments f
    JOIN accounts a ON f.user_id = a.id
    WHERE post_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $postId);
    $stmt->execute();
    $result = $stmt->get_result();

    $comments = array();
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }

    echo json_encode(array('status' => 'success', 'comments' => $comments)); // Send the comments as JSON
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Post ID not provided')); // Send an error message if postId is not provided in the URL
}
?>
