<?php

if (empty($_POST)) {
    header("Location: contact");
    exit();
} else {
    $subject = $_POST['subject'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $message = 'Message from: '.$email."\r\n \r\n".$message;
    $js = (isset($_POST['js'])) ? ($_POST['js']) ? true : false : false;

    try {
        mail('casey@tired.dog', $subject, $message);
        $sent = true;
    } catch (exception $e) {
        $sent = false;
    }

    if ($js) {
        exit(($sent) ? 'sent' : 'failed');
    } else {
        header("Location: contact?message=".($sent ? 'sent' : 'failed'));
    }
}

?>