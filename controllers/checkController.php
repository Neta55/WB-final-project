<?php
require_once __DIR__ . "/../models/listModel.php";

if (isset($_GET["task_id"]) && isset($_POST["checked"])) {

  $checked = $_GET["checkbox_value"];
  $order_id = $_GET["order_id"];
  $model = new listModel();
  $model->setCheckBoxById($_GET["task_id"], $checked, $order_id);
}

Header("Location: /WB-final-project/?page=list");
