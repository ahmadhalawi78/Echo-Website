<?php
header("Content-Type: application/json");


$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['message'])) {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
    exit;
}

$name = $data['name'] ?? 'Anonymous';
$email = $data['email'] ?? null;
$message = $data['message'];


$host = 'sql113.infinityfree.com';
$db = 'if0_38966111_echo_db';
$user = 'if0_38966111';
$pass = 'c8EUDE1sOfCFCf';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)");
    $stmt->execute([$name, $email, $message]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
