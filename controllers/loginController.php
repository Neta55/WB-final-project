<?php
require_once __DIR__ . "/../components/userForm.php";
require_once __DIR__ . "/../helpers/database-wrapper.php";

if (!empty($_POST['username'])) {
  $username = $_POST['username'];
  $sql = "SELECT * FROM users WHERE username='$username'";
  $response = DB::run($sql)->fetch_assoc();

  if ($response) {
    if (!empty($_POST['password'])) {
      $salt = "";
      $password = $_POST['password'];
      $password = $password . $salt;
      $isValidPassword = password_verify($password, $response['password']);
      if ($isValidPassword) {
        session_start();
        $_SESSION['id'] = $response['username'];
        Header('Location: /WB-final-project/?page=list');
      } else {
        echo "Nepareiza parole!";
      }
    } else {
      echo "Parole nav ievadīta, ievadiet!";
    }
  } else {
    echo "Lietotājs <strong> '$username' </strong> neeksistē!";
  }
}
$form = new UserForm();
$form->setLogRegText('Lai piekļūtu savam sarakstam, lūdzu ievadi lietotājvārdu un paroli!');
$form->html();
