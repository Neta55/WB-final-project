<?php
require_once __DIR__ . "/../models/listModel.php";
$model = new listModel();
if (!empty($_POST["id"])) {
  // Update
  $model->updateById(
    $_POST["id"],
    $_POST["task"],
    $_POST["order_id"],
    $_POST["checked"],
  );
} else {
  // Insert
  $model->insertNew(
    $_POST["task"],
    $_POST["order_id"],
    $_POST["user_id"],
  );
}

Header("Location: /WB-final-project/?page=list");
