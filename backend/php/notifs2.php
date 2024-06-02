<?php
session_start();
$id = $_SESSION['user_id'];

include 'connection.php';

$query = "
    SELECT n.*, a.name, a.profile_photo as friend_image
    FROM notification n
    JOIN accounts a ON n.user_id = a.id 
    WHERE n.user_id != ? 
";

$stmt = $conn->prepare($query);

if ($stmt === false) {
    echo json_encode(['status' => 'error', 'message' => 'Query preparation failed: ' . $conn->error]);
    exit();
}

$stmt->bind_param("i", $id); 

$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $notifications = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode(['status' => 'success', 'notifications' => $notifications]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No notifications found']);
}

$stmt->close();
?>
