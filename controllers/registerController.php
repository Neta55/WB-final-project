<?php
require_once __DIR__ . "/../views/registerView.php";
require_once __DIR__ . "/../helpers/database-wrapper.php";

if (!empty($_POST["username"]) && !empty($_POST["password"])) {
  $username = $_POST['username'];

  $isUsernameExists = "SELECT COUNT(*) FROM users WHERE username='$username'";
  $usernameExists = (DB::run($isUsernameExists)->fetch_all())[0];
  foreach ($usernameExists as $key => $value) {
    $value = $value + 0;
    if ($value > 0) {
      echo "<div id='cover'>";
      echo "<div id='pop-up'>";
      echo "<h3>Šis lietotājvārds ir aizņemts. Izvēlies citu!</h3>";
      echo "<button class='popup-btn' onclick='popupDisapear()'>Mēģināt vēlreiz</button>";
      echo "</div>";
      echo "</div>";
      $username = "";
    } else {
      $password = $_POST['password'];
      $salt = "";
      $password = $password . $salt;

      $password = password_hash($password, PASSWORD_DEFAULT);

      $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
      $register = DB::run($sql);
      Header('Location: /WB-final-project/?page=login');
    }
  }
} else {
}

$view = new RegisterView();
$view->html();
