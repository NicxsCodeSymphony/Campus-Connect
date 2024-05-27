<?php

session_start();
include 'connection.php';

header('Content-Type: application/json');

$id = $_SESSION['user_id'];

if(isset($_POST['addFriend'])){
    $friend = $_POST['friend_id'];
    
    $stmt = $conn->prepare("INSERT INTO friend (user_id, friend_id, status) VALUES (?, ?, ?)");
    $requestStatus = 'request'; // Use a variable for the status
    $stmt->bind_param("sss", $id, $friend, $requestStatus);
    
    if ($stmt->execute() === TRUE) {
        echo json_encode(["success" => true, "message" => "Friend request sent successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }
    $stmt->close();
    exit();
}

// Fetch users to display in the add friend list
$query = "SELECT * FROM accounts WHERE id != ? AND id NOT IN (
    SELECT CASE
        WHEN user_id = ? THEN friend_id
        ELSE user_id
    END AS friend_id
    FROM friend
    WHERE (user_id = ? OR friend_id = ?) AND status = 'request'
)";

$stmt = $conn->prepare($query);
$stmt->bind_param("ssss", $id, $id, $id, $id);

if ($stmt === FALSE) {
    echo json_encode(['status' => 'error', 'message' => 'Query preparation failed: ' . $conn->error]);
    exit();
}

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
