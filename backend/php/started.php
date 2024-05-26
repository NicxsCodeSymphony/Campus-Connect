<?php

session_start(); // Start the session
include 'connection.php';

if (isset($_POST['register'])) {
    $name = $_POST['name'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("INSERT INTO accounts (name, username, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $username, $password);

    if ($stmt->execute() === TRUE) {
        echo json_encode(["success" => true, "message" => "Account successfully registered"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
} else if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM accounts WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Set session variable with the user ID
        $_SESSION['user_id'] = $row['id'];
        echo json_encode(["success" => true, "message" => "Account successfully logged in", "user_id" => $row['id']]);
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect Username and Password"]);
    }

    $stmt->close();
}

$conn->close();
?>
