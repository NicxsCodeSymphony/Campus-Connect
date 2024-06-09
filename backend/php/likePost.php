<?php
session_start();
include 'connection.php';

header('Content-Type: application/json'); // Set the content type to JSON

$user_id = $_SESSION['user_id'];

if (isset($_POST['likePost'])) {
    $postId = $_POST['post_id'];

    // Check if the like already exists
    $checkQuery = "SELECT * FROM like_couter WHERE user_id = ? AND post_id = ?";
    if ($checkStmt = $conn->prepare($checkQuery)) {
        $checkStmt->bind_param("ss", $user_id, $postId);
        $checkStmt->execute();
        $result = $checkStmt->get_result();

        if ($result->num_rows == 0) {
            // Insert the like if it doesn't exist
            $insertQuery = "INSERT INTO like_couter (user_id, post_id) VALUES (?, ?)";
            if ($stmt = $conn->prepare($insertQuery)) {
                $stmt->bind_param("ss", $user_id, $postId);
                $stmt->execute();
                $stmt->close();

                // Insert notification
                $query1 = "INSERT INTO notification (user_id, post_id, type) VALUES (?, ?, 'like')";
                if ($stmt1 = $conn->prepare($query1)) {
                    $stmt1->bind_param("ss", $user_id, $postId);
                    $stmt1->execute();
                    $stmt1->close();
                }

                // Prepare JSON response
                $response = array("status" => "success", "message" => "Like saved successfully.");
                echo json_encode($response);
            } else {
                $response = array("status" => "error", "message" => "Failed to prepare insert like query.");
                echo json_encode($response);
            }
        } else {
            // Prepare JSON response
            $response = array("status" => "error", "message" => "Like already exists.");
            echo json_encode($response);
        }
    } else {
        $response = array("status" => "error", "message" => "Failed to prepare check like query.");
        echo json_encode($response);
    }

    exit();
}

$query = "SELECT * FROM like_couter";
if ($stmt = $conn->prepare($query)) {
    $stmt->execute();
    $result = $stmt->get_result();

    $posts = array();
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }

    echo json_encode($posts);
} else {
    $response = array("status" => "error", "message" => "Failed to prepare posts query.");
    echo json_encode($response);
}
?>
