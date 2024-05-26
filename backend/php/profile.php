<?php
session_start();
require 'connection.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit();
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT name, bio, gender, profile_photo, cover_photo FROM accounts WHERE id = ?";
    $stmt = $conn->prepare($query);
    
    if ($stmt === false) {
        echo json_encode(['status' => 'error', 'message' => 'Query preparation failed: ' . $conn->error]);
        exit();
    }

    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode(['status' => 'success', 'user' => $user]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'User not found']);
    }

    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $full_name = $_POST['full_name'];
    $bio = $_POST['bio'];
    $gender = $_POST['gender'];
    $profile_picture = $_FILES['profile_picture'];
    $cover_photo = $_FILES['cover_photo'];

    // Handle file uploads
    $profile_picture_path = '';
    $cover_photo_path = '';

    if ($profile_picture['error'] == 0) {
        $profile_picture_path = 'assets/profile/' . basename($profile_picture['name']);
        move_uploaded_file($profile_picture['tmp_name'], $profile_picture_path);
    }

    if ($cover_photo['error'] == 0) {
        $cover_photo_path = 'assets/cover/' . basename($cover_photo['name']);
        move_uploaded_file($cover_photo['tmp_name'], $cover_photo_path);
    }

    $query = "UPDATE accounts SET name = ?, bio = ?, gender = ?, profile_photo = ?, cover_photo = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    
    // Check if query preparation was successful
    if ($stmt === false) {
        echo json_encode(['status' => 'error', 'message' => 'Query preparation failed: ' . $conn->error]);
        exit();
    }

    $stmt->bind_param('sssssi', $full_name, $bio, $gender, $profile_picture_path, $cover_photo_path, $user_id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Profile updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update profile']);
    }

    $stmt->close();
}

$conn->close();
?>
