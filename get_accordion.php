<?php
// Устанавливаем заголовки
header("Content-Type: application/json");

// Путь к файлу с данными
$filePath = __DIR__ . '/data/accordion.json';

if (file_exists($filePath)) {
    // Читаем данные из файла
    $data = file_get_contents($filePath);
    echo $data;
} else {
    // Если файл не найден, отправляем ошибку
    echo json_encode(["status" => "error", "message" => "Дані не знайдено."]);
}
?>
