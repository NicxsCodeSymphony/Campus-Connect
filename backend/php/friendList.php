<?php
session_start();
$id = $_SESSION['user_id'];

include 'connection.php';
// Fetch mutual friends
$query = "
    SELECT f.*, a.name AS friend_name, a.profile_photo AS friend_image, a.username as friend_username
    FROM friend f
    JOIN accounts a ON f.friend_id = a.id
    WHERE f.user_id = ? 
    UNION
    SELECT f.*, a.name AS friend_name, a.profile_photo AS friend_image, a.username as friend_username
    FROM friend f
    JOIN accounts a ON f.user_id = a.id
    WHERE f.friend_id = ? 
";

$stmt = $conn->prepare($query);

if ($stmt === FALSE) {
    echo json_encode(['status' => 'error', 'message' => 'Query preparation failed: ' . $conn->error]);
    exit();
}

$stmt->bind_param('ii', $id, $id);
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
