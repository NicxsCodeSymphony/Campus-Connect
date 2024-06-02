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

    $query1 = "INSERT INTO notification (user_id, post_id, type) VALUES (?, ?, 'comment')";
    $stmt1 = $conn->prepare($query1);
    $stmt1->bind_param("ss", $user_id, $postId); 
    $stmt1->execute();
    $stmt1->close();
    
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

if(isset($_POST['likePost'])){
    $postId = $_POST['postId'];
    
    // Check if the like already exists
    $checkQuery = "SELECT * FROM like_couter WHERE user_id = ? AND post_id = ?";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->bind_param("ss", $user_id, $postId);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    
    if($result->num_rows == 0){
        // Insert the like if it doesn't exist
        $insertQuery = "INSERT INTO like_couter (user_id, post_id) VALUES (?,?)";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param("ss", $user_id, $postId);
        $stmt->execute();
        $stmt->close();
        
        // Prepare JSON response
        $response = array("status" => "success", "message" => "Like saved successfully.");
        echo json_encode($response);
    } else {
        // Prepare JSON response
        $response = array("status" => "error", "message" => "Like already exists.");
        echo json_encode($response);
    }

    $query1 = "INSERT INTO notification (user_id, post_id, type) VALUES (?, ?, 'like')";
    $stmt1 = $conn->prepare($query1);
    $stmt1->bind_param("ss", $user_id, $postId); 
    $stmt1->execute();
    $stmt1->close();
    
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
