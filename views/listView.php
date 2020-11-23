<?php
require_once __DIR__ . "/../components/modifyForm.php";

class listView
{
  // private $tasklist;
  private $tasklistUnchecked;
  private $tasklistChecked;


  // public function __construct($data = [])
  public function __construct($tasklistUnchecked = [], $tasklistChecked = [])
  {
    // $this->tasklist = $data;
    $this->tasklistUnchecked = $tasklistUnchecked;
    $this->tasklistChecked = $tasklistChecked;
  }


  public function html()
  { ?> <div class="">
      <h1>Lietotājs <?= $_SESSION['username'] ?> ir pieslēdzies!</h1>
      <form method="POST">
        <input name="logOut" type="hidden">
        <button type="submit">Log out</button>
      </form>
    </div>
    <table class="checked-0">
      <tbody>
        <?php
        $last_order_id = sizeof($this->tasklistUnchecked) + sizeof($this->tasklistChecked) + 1;
        foreach ($this->tasklistUnchecked as $key => $task) {
          $order_id = $key + 1;
          $ch_order_id = sizeof($this->tasklistUnchecked) + 1;
        ?>

          <tr>
            <td><?= $task["task"] ?></td>
            <td>
              <form action="/WB-final-project/?page=check&task_id=<?= $task['id'] ?>&order_id=<?= $ch_order_id ?>&checkbox_value=1" method="post">
                <input type="checkbox" name="checked" value="1" <?php if ($task["checked"] == '0') {
                                                                  echo "";
                                                                } else {
                                                                  echo "checked";
                                                                } ?> onchange="this.form.submit()">
              </form>
            </td>
            <td>
              <a href="/WB-final-project/?page=list&action=modify&task_id=<?= $task['id'] ?>&order_id=<?= $order_id ?>">Edit<?= $order_id ?></a>
              <a href="/WB-final-project/?page=delete&task_id=<?= $task['id'] ?>">Delete</a>
            </td>
          </tr>



        <?php } ?>
      </tbody>
    </table>
    <a href="/WB-final-project/?page=list&action=modify&last_order_id=<?= $last_order_id ?>">Add task</a>
    <h4>Jau padarīti</h4>
    <table class="checked-1">
      <tbody>
        <?php
        foreach ($this->tasklistChecked as $key => $task) {
          $order_id = $key + sizeof($this->tasklistUnchecked) + 1;
          $ch_order_id = sizeof($this->tasklistUnchecked) + 1;
        ?>

          <tr>
            <td><?= $task["task"] ?></td>
            <td>
              <form action="/WB-final-project/?page=check&task_id=<?= $task['id'] ?>&order_id=<?= $ch_order_id ?>&checkbox_value=0" method="post">
                <input type="checkbox" name="checked" value="0" <?php if ($task["checked"] == '0') {
                                                                  echo "";
                                                                } else {
                                                                  echo "checked";
                                                                } ?> onchange="this.form.submit()">
              </form>
            </td>
            <td>

              <a href="/WB-final-project/?page=delete&task_id=<?= $task['id'] ?>">Delete</a>
            </td>
          </tr>



        <?php }
        ?>

      </tbody>
    </table>




<?php

  }
}
?>