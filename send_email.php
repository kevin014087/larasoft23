<?php
header('Content-Type: application/json');

// Récupérer les données JSON
$data = json_decode(file_get_contents('php://input'), true);

// Vérifier que toutes les données nécessaires sont présentes
if (!isset($data['name']) || !isset($data['email']) || !isset($data['message']) || !isset($data['to'])) {
    echo json_encode(['success' => false, 'message' => 'Données manquantes']);
    exit;
}

// Configurer l'email
$to = $data['to'];
$subject = "Nouveau message de contact - " . htmlspecialchars($data['name']);
$message = "Nom: " . htmlspecialchars($data['name']) . "\n";
$message .= "Email: " . htmlspecialchars($data['email']) . "\n\n";
$message .= "Message:\n" . htmlspecialchars($data['message']);

// En-têtes de l'email
$headers = 'From: ' . $data['email'] . "\r\n" .
    'Reply-To: ' . $data['email'] . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// Tentative d'envoi de l'email
try {
    $mailSent = mail($to, $subject, $message, $headers);
    
    if ($mailSent) {
        echo json_encode(['success' => true, 'message' => 'Email envoyé avec succès']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi de l\'email']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()]);
}
