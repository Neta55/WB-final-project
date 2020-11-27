<?php
require_once __DIR__ . "/../models/listModel.php";

if (isset($_GET["task_id"])) {

  $model = new listModel();
  $model->setCheckBoxById($_GET["task_id"], $_GET["checkbox_value"], $_GET["order_id"]);
  // var_dump($_GET["task_id"], $_GET["checkbox_value"], $_GET["order_id"]);
}

Header("Location: /WB-final-project/?page=list");
