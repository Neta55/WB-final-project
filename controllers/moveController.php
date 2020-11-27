<?php
require_once __DIR__ . "/../models/listModel.php";


$dataList = json_decode(file_get_contents('php://input'), 1);
if ($dataList) {
  $model = new listModel();
  $model->updateAfterMove($dataList);
}

// foreach ($dataList as $data) {
//   $id = $data['task_id'];
//   $orderId = $data['order_id'];
//   $model = new listModel();
//   $model->updateAfterMove($id, $orderId);
// }

Header("Location: /WB-final-project/?page=list");
