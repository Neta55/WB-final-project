<?php
require_once __DIR__ . "/../models/listModel.php";

if (isset($_GET["task_id"])) {
  $model = new listModel();
  $model->deleteById($_GET["task_id"]);
}

Header("Location: /WB-final-project/?page=list");
