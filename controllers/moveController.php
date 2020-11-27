<?php
require_once __DIR__ . "/../models/listModel.php";


$dataList = json_decode(file_get_contents('php://input'), 1);
if ($dataList) {
  $model = new listModel();
  $model->updateAfterMove($dataList);
}

Header("Location: /WB-final-project/?page=list");
