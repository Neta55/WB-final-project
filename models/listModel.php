<?php
require_once __DIR__ . "/../helpers/database-wrapper.php";

class listModel
{
  public function getAllUnchecked()
  {
    $user_id = $_SESSION['id'];
    $sql = "SELECT * FROM tasklist WHERE user_id=$user_id AND checked='0'";
    $response = DB::run($sql)->fetch_all(MYSQLI_ASSOC);
    return $response;
  }

  public function getAllChecked()
  {
    $user_id = $_SESSION['id'];
    $sql = "SELECT * FROM tasklist WHERE user_id=$user_id AND checked='1'";
    $response = DB::run($sql)->fetch_all(MYSQLI_ASSOC);
    return $response;
  }

  public function deleteById($id)
  {
    $sql = "DELETE FROM tasklist WHERE id=$id ORDER BY order_id";
    DB::run($sql);
  }

  public function getById($id)
  {
    $sql = "SELECT * FROM tasklist WHERE id=$id";
    $response = DB::run($sql);

    if ($response->num_rows === 0) {
      return [];
    } else {
      return $response->fetch_assoc();
    }
  }

  public function updateById($id, $task, $order_id)
  {
    $sql = "UPDATE tasklist SET task = '$task', order_id = $order_id WHERE id=$id";
    DB::run($sql);
  }

  public function insertNew($task, $order_id, $user_id)
  {
    $user_id = $_SESSION['id'];
    $sql = "INSERT INTO tasklist (task, order_id, user_id) VALUES ('$task', '$order_id', $user_id)";
    DB::run($sql);
  }

  public function setCheckBoxById($id, $checked, $order_id)
  {
    $sql = "UPDATE tasklist SET checked = $checked, order_id = $order_id WHERE id=$id";
    DB::run($sql);
  }

  public function updateAfterMove($dataList)
  {
    foreach ($dataList as $data) {
      $id = $data['task_id'];
      $orderId = $data['order_id'];
      $sql = "UPDATE tasklist SET order_id = $orderId WHERE id=$id";
      DB::run($sql);
    }
  }
}
