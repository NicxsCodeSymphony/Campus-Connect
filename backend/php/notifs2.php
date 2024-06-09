<?php
session_start();
$id = $_SESSION['user_id'];

include 'connection.php';

$query = "
    SELECT n.*, a.name, a.profile_photo AS friend_image
    FROM notification n
    JOIN accounts a ON n.user_id = a.id 
    WHERE n.user_id != ?    
    AND EXISTS (
        SELECT 1
        FROM post p
        WHERE p.post_id = n.post_id
        AND p.poster_id = ?
    )
";

$stmt = $conn->prepare($query);

if ($stmt === false) {
    echo json_encode(['status' => 'error', 'message' => 'Query preparation failed: ' . $conn->error]);
    exit();
}

$stmt->bind_param("ii", $id, $id); // Bind the user ID parameter twice

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
