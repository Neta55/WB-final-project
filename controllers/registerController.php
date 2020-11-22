<?php
require_once __DIR__ . "/../views/registerView.php";
require_once __DIR__ . "/../helpers/database-wrapper.php";

if (!empty($_POST["username"]) && !empty($_POST["password"])) {
  $username = $_POST['username'];
  $password = $_POST['password'];
  $salt = "";
  $password = $password . $salt;

  $password = password_hash($password, PASSWORD_DEFAULT);

  $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
  DB::run($sql);
  Header('Location: /WB-final-project/?page=login');
} else {
}

$view = new RegisterView();
$view->html();
