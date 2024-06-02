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
    
    echo json_encode(array('status' => 'success'));
    exit();
}

if(isset($_POST['deleteComment'])){
    $commentId = $_POST['comment_id'];
    $query = "DELETE FROM comments WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $commentId);
    $stmt->execute();
    $stmt->close();

    echo json_encode(array('status' => 'success'));
    exit();
}

if(isset($_POST['getComment'])){
    $commentId = $_POST['comment_id'];
    $query = "SELECT comment FROM comments WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $commentId);
    $stmt->execute();
    $stmt->bind_result($comment);
    $stmt->fetch();
    $stmt->close();

    echo json_encode(array('status' => 'success', 'comment' => $comment));
    exit();
}

if(isset($_POST['updateComment'])){
    $commentId = $_POST['comment_id'];
    $comment = $_POST['comment'];

    $query = "UPDATE comments SET comment = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $comment, $commentId);
    $stmt->execute();
    $stmt->close();

    echo json_encode(array('status' => 'success'));
    exit();
}

if(isset($_GET['id'])){
    $postId = $_GET['id'];

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

    echo json_encode(array('status' => 'success', 'comments' => $comments));
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Post ID not provided'));
}
?>
