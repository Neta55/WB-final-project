<?php
require_once __DIR__ . "/../helpers/database-wrapper.php";

class listModel
{


  public function getAll()
  {
    $user_id = $_SESSION['id'];
    $sql = "SELECT * FROM tasklist WHERE user_id=$user_id";
    $response = DB::run($sql)->fetch_all(MYSQLI_ASSOC);
    return $response;
  }



  public function deleteById($id)
  {
    $sql = "DELETE FROM tasklist WHERE id=$id";
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

  public function updateById($id, $task, $order_id, $checked)
  {
    $sql = "UPDATE tasklist SET task = '$task', order_id = $order_id, checked = $checked WHERE id=$id";
    DB::run($sql);
  }

  public function insertNew($task, $order_id, $user_id)
  {
    $user_id = $_SESSION['id'];
    $sql = "INSERT INTO tasklist (task, order_id, user_id) VALUES ('$task', '$order_id', $user_id)";
    DB::run($sql);
  }
}
