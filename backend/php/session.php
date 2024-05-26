<?php
session_start();

if (isset($_SESSION['user_id'])) {
    echo json_encode(["success" => true, "user_id" => $_SESSION['user_id']]);
} else {
    echo json_encode(["success" => false, "message" => "No session ID found"]);
}
?>
