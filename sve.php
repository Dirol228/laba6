<?php
// Встановлюємо заголовки для обробки JSON
header("Content-Type: application/json");

// Приймаємо дані
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($data) {
    // Зберігаємо дані у файл JSON
    $filePath = __DIR__ . '/data/accordion.json';
    if (file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT))) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Не вдалося записати файл."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Немає даних для збереження."]);
}
?>
