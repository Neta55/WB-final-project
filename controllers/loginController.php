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
        $_SESSION['username'] = $response['username'];
        $_SESSION['id'] = $response['id'];

        Header('Location: /WB-final-project/?page=list');
      } else {
        echo "<div id='cover'>";
        echo "<div id='pop-up'>";
        echo "<h3>Nepareiza parole!</h3>";
        echo "<button id='popup-btn' onclick='popupDisapear()'>Mēģināt vēlreiz</button>";
        echo "</div>";
        echo "</div>";
      }
    } else {
      echo "<div id='cover'>";
      echo "<div id='pop-up'>";
      echo "<h3>Parole nav ievadīta, ievadiet!</h3>";
      echo "<button id='popup-btn' onclick='popupDisapear()'>Mēģināt vēlreiz</button>";
      echo "</div>";
      echo "</div>";
    }
  } else {
    echo "<div id='cover'>";
    echo "<div id='pop-up'>";
    echo "<h3>Lietotājs <strong> '$username' </strong> neeksistē!</h3>";
    echo "<button id='popup-btn' onclick='popupDisapear()'>Mēģināt vēlreiz</button>";
    echo "</div>";
    echo "</div>";
  }
}
$form = new UserForm();
$form->setLogRegText('Lai piekļūtu savam sarakstam, lūdzu ievadi lietotājvārdu un paroli! </br> <span> Ja tādu nav, dodies</span> ');
$form->setLogRegBtnText("reģistrēties");
$form->setTogleLogReg("/WB-final-project/?page=register");
$form->setTogleImgClass("userImage");
$form->html();
