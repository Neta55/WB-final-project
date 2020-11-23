<?php
// require_once __DIR__ . "/controllers/loginController.php";

if (isset($_GET['page'])) {
  $file = __DIR__ . "/controllers/" . $_GET['page'] . "Controller.php";
  session_start();



  if (file_exists($file)) {
    if ($_GET['page'] === 'login' || $_GET['page'] === 'register') {
      require_once __DIR__ . "/helpers/head.php";
      require_once $file;
      require_once __DIR__ . "/helpers/foot.php";
    } else if (isset($_SESSION['username'])) {
      require_once __DIR__ . "/helpers/head.php";
      require_once $file;
      require_once __DIR__ . "/helpers/foot.php";
    } else {
      Header('Location: /WB-final-project/?page=login');
    }
  } else {
    Header('Location: /WB-final-project/?page=login');
  }
}
