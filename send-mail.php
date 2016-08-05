<?php



$to  = 'test.qc@gmail.com';
// subject
$subject = 'Assessment';

$message = '';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
$headers .= 'To: Test <test.qc@gmail.com>, Test2 <test.qc1@gmail.com>' . "\r\n";

//$headers .= 'Cc: birthdayarchive@example.com' . "\r\n";
//$headers .= 'Bcc: birthdaycheck@example.com' . "\r\n";

if ($_POST['answer']) {
    //echo $_POST['answer'];
    $headers .= 'From: '.$_POST['name'].' <'.$_POST['email'].'>' . "\r\n";
    $message = $_POST['answer'];
    
//    send
    mail($to, $subject, $message, $headers);
}