<?php

session_start();
include 'connection.php';

header('Content-Type: application/json');

$id = $_SESSION['user_id'];

if(isset($_POST['addFriend'])){
    $friend = $_POST['friend_id'];
    
    $stmt = $conn->prepare("INSERT INTO friend (user_id, friend_id, status) VALUES (?, ?, ?)");
    $requestStatus = 'request'; // Use a variable for the status
    $stmt->bind_param("sss", $friend, $id, $requestStatus);
    
    if ($stmt->execute() === TRUE) {
        echo json_encode(["success" => true, "message" => "Friend request sent successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }
    $stmt->close();
    exit();
}


if (isset($_POST['accept'])) {
    $friendId = $_POST['friend_id'];
    
    $id = $_SESSION['user_id']; // Assuming you store the user's ID in the session
    
    $query = "UPDATE friend SET status = 'mutual' WHERE user_id = ? AND friend_id = ?";
    $stmt = $conn->prepare($query);
    
    if ($stmt === false) {
        echo json_encode(['status' => 'error', 'message' => 'Query preparation failed: ' . $conn->error]);
        exit();
    }
    
    $stmt->bind_param('ii', $id, $friendId);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Unable to accept friend request']);
    }
}


// Fetch users to display in the add friend list
$query = "SELECT * FROM accounts WHERE id != ? AND id NOT IN (
    SELECT CASE
        WHEN user_id = ? THEN friend_id
        ELSE user_id
    END AS friend_id
    FROM friend
    WHERE (user_id = ? OR friend_id = ?)
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
