<?php
// Prevent unauthorized access methods
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

header('Content-Type: application/json; charset=UTF-8');

// Capture incoming JSON React raw body data
$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody, true);

if (!$data) {
    echo json_encode(['status' => 'error', 'message' => 'Malformed or missing data payload.']);
    exit;
}

// Extract form values safely
$name        = filter_var(trim($data['name'] ?? ''), FILTER_DEFAULT);
$email       = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone       = filter_var(trim($data['phone'] ?? ''), FILTER_DEFAULT);
$countryCode = filter_var(trim($data['countryCode'] ?? ''), FILTER_DEFAULT); 
$message     = filter_var(trim($data['message'] ?? ''), FILTER_DEFAULT);

// Validate Required Data Fields
if (empty($name) || !$email || empty($phone)) {
    echo json_encode(['status' => 'error', 'message' => 'Validation error. Please fill out all required fields properly.']);
    exit;
}

// Configuration
$to          = "info@4bizinternational.com";
$fromEmail   = "info@4bizinternational.com"; 
$ccEmail     = "4bizdeveloper@gmail.com";
$subject     = "New Business Lead from Website: " . $name;

$displayCountry = !empty($countryCode) ? strtoupper($countryCode) : "Not Detected";

// Build clean modern HTML Email Body template
$htmlContent = "
<html>
<head>
    <title>New Submission</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f7; color: #333333; padding: 20px; }
        .container { max-width: 600px; background: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e8e8e8; }
        h2 { color: #0284c7; margin-top: 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid #eeeeee; }
        th { background-color: #f9fafb; width: 30%; font-weight: bold; }
        .message-box { background: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 10px; white-space: pre-wrap; }
    </style>
</head>
<body>
    <div class='container'>
        <h2>New Contact Formulation Received</h2>
        <table>
            <tr><th>Full Name</th><td>" . htmlspecialchars($name) . "</td></tr>
            <tr><th>Email Address</th><td>" . htmlspecialchars($email) . "</td></tr>
            <tr><th>Phone Field</th><td>" . htmlspecialchars($phone) . "</td></tr>
            <tr><th>Country Code</th><td><strong>" . htmlspecialchars($displayCountry) . "</strong></td></tr>
        </table>
        <h3>Mission Brief / Message:</h3>
        <div class='message-box'>" . (!empty($message) ? htmlspecialchars($message) : "No briefing provided.") . "</div>
    </div>
</body>
</html>";

// Build Clean Standard RFC compliant Headers
$headers   = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/html; charset=UTF-8";
$headers[] = "From: \"4Biz International\" <" . $fromEmail . ">";
$headers[] = "Cc: " . $ccEmail; // Integrated CC mapping exactly as requested
$headers[] = "Reply-To: \"" . addslashes($name) . "\" <" . $email . ">";
$headers[] = "X-Mailer: PHP/" . phpversion();

$headerString = implode("\r\n", $headers);

// Dispatch processing route via single compliant transmission
$mailSuccess = mail($to, $subject, $htmlContent, $headerString);

if ($mailSuccess) {
    echo json_encode(['status' => 'success', 'message' => 'Transmission established seamlessly.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Internal Server Mail Engine failed to forward message.']);
}
exit;