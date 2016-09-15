<?php
  session_start();

  require_once 'phpmailer/PHPMailerAutoload.php';

  $errors = [];

  if (isset($_POST['first_name'], $_POST['email_address'], $_POST['comments'])) {

    // Store form field data
    $fields = [
      'name' => $_POST['first_name'],
      'email' => $_POST['email_address'],
      'comments' => $_POST['comments'],
    ];

    // Loop through each field to see if its empty
    // If empty report an error for that field
    foreach ($fields as $field => $data) {
      if (empty($data)) {
        $errors[] = 'The '. $field .' field is required';
      }
    }

    echo '<pre>', print_r($errors) , '</pre>';
    die();

  } else {
    $errors[] = 'Something went wrong!';
  }

 ?>
