<?php
session_start();
include 'connection.php';

header('Content-Type: application/json');

function send_json_response($data) {
    ob_clean(); // Clean (erase) the output buffer and turn off output buffering
    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['deletePost'])) {
        $postId = $_POST['post_id'];
        $query = "SELECT image FROM post WHERE post_id = $postId";
        $res = mysqli_query($conn, $query);
        $fileDeleted = true;

        while ($row = mysqli_fetch_assoc($res)) {
            $filePath = $row['image'];
            if (file_exists($filePath)) {
                if (!unlink($filePath)) {
                    $fileDeleted = false;
                }
            }
        }

        $query = "DELETE FROM post WHERE post_id = $postId";
        $res = mysqli_query($conn, $query);

        if ($res && $fileDeleted) {
            send_json_response(["success" => true, "message" => "Post and files were deleted"]);
        } elseif ($res) {
            send_json_response(["success" => true, "message" => "Post was deleted, but some files were not found or deleted"]);
        } else {
            send_json_response(["success" => false, "message" => "Post was not deleted"]);
        }
    }

    if (isset($_POST['edit'])) {
        $post_id = $_POST['post_id'];
        $caption = $_POST['caption'];

        $query = "UPDATE post SET caption='$caption' WHERE post_id='$post_id'";
        $res = mysqli_query($conn, $query);
        if ($res) {
            send_json_response(["success" => true, "message" => "Post caption was updated"]);
        } else {
            send_json_response(["success" => false, "message" => "Post caption was not updated"]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_SESSION['user_id'];

    if (isset($_GET['post_id'])) {
        $postId = $_GET['post_id'];
        $query = "SELECT post.*, accounts.username, accounts.profile_photo, accounts.name, photos.image
                  FROM post
                  INNER JOIN accounts ON post.poster_id = accounts.id
                  LEFT JOIN photos ON post.post_id = photos.post_id
                  WHERE post.post_id = ?
                  AND (
                      post.poster_id = ?
                      OR post.poster_id IN (
                          SELECT friend_id FROM friend WHERE user_id = ? AND status = 'mutual'
                          UNION
                          SELECT user_id FROM friend WHERE friend_id = ? AND status = 'mutual'
                      )
                  )";

        $stmt = $conn->prepare($query);
        $stmt->bind_param('iiii', $postId, $userId, $userId, $userId);
        $stmt->execute();
        $res = $stmt->get_result();

        $posts = array();
        while ($row = mysqli_fetch_assoc($res)) {
            $posts[$row['post_id']]['post_data'] = [
                'post_id' => $row['post_id'],
                'poster_id' => $row['poster_id'],
                'caption' => $row['caption'],
                'time_created' => $row['time_created'],
                'username' => $row['username'],
                'profile_photo' => $row['profile_photo'],
                'name' => $row['name']
            ];
            if (!empty($row['image'])) {
                $posts[$row['post_id']]['images'][] = $row['image'];
            }
        }

        send_json_response(array_values($posts));
    }

    $query = "SELECT post.*, accounts.username, accounts.profile_photo, accounts.name, photos.image
              FROM post
              INNER JOIN accounts ON post.poster_id = accounts.id
              LEFT JOIN photos ON post.post_id = photos.post_id
              WHERE post.poster_id = ?
              OR post.poster_id IN (
                  SELECT friend_id FROM friend WHERE user_id = ? AND status = 'mutual'
                  UNION
                  SELECT user_id FROM friend WHERE friend_id = ? AND status = 'mutual'
              )
              ORDER BY time_created DESC";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('iii', $userId, $userId, $userId);
    $stmt->execute();
    $res = $stmt->get_result();

    $posts = array();
    while ($row = mysqli_fetch_assoc($res)) {
        $posts[$row['post_id']]['post_data'] = [
            'post_id' => $row['post_id'],
            'poster_id' => $row['poster_id'],
            'caption' => $row['caption'],
            'time_created' => $row['time_created'],
            'username' => $row['username'],
            'profile_photo' => $row['profile_photo'],
            'name' => $row['name']
        ];
        if (!empty($row['image'])) {
            $posts[$row['post_id']]['images'][] = $row['image'];
        }
    }

    send_json_response(array_values($posts));
}
?>

