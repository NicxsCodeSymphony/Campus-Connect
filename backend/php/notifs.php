<?php

session_start();

$id = $_SESSION['user_id'];

include 'connection.php';

if (isset($_POST['accept'])) {
    $friendId = $_POST['friend_id'];
    
    $query = "UPDATE friend SET status = 'mutual' WHERE user_id =? AND friend_id =?";
    $stmt = $conn->prepare($query);
    
    // Check if query preparation was successful
    if ($stmt === false) {
        echo json_encode(['status' => 'error','message' => 'Query preparation failed: '. $conn->error]);
        exit();
    }
    
    $stmt->bind_param('ii', $id, $friendId);
    $stmt->execute();
    $result = $stmt->get_result();
    
 }
 

$query = "SELECT f.*, a.name AS friend_name, a.profile_photo AS friend_image
          FROM friend f
          JOIN accounts a ON f.friend_id = a.id
          WHERE f.user_id = ?";

$stmt = $conn->prepare($query);

if ($stmt === FALSE) {
    echo json_encode(['status' => 'error', 'message' => 'Query preparation failed: ' . $conn->error]);
    exit();
}

$stmt->bind_param('i', $id);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows > 0) {
    $users = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode(['status' => 'success', 'users' => $users]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No users found']);
}

$stmt->close();
$conn->close();
?>
