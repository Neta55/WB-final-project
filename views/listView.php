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
  { ?> <div class="header">
      <h4>Lietotājs "<?= $_SESSION['username'] ?>" ir pieslēdzies!</h4>
      <form method="POST" class="inline">
        <input name="logOut" type="hidden">
        <button type="submit" class="logout-btn"></button>
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

          <tr order_id="<?= $order_id ?>" task="<?= $task['id'] ?>">
            <td>
              <form action="/WB-final-project/?page=check&task_id=<?= $task['id'] ?>&order_id=<?= $ch_order_id ?>&checkbox_value=1" method="post">
                <input type="checkbox" class="check-btn" name="checked" <?php if ($task["checked"] == '0') {
                                                                          echo "";
                                                                        } else {
                                                                          echo "checked";
                                                                        } ?> onchange="this.form.submit()">
              </form>
            </td>
            <td><?= $task["task"] ?></td>

            <td>
              <a href="/WB-final-project/?page=list&action=modify&task_id=<?= $task['id'] ?>&order_id=<?= $order_id ?>">
                <div class="button edit-btn inline"></div>
              </a>
              <a href="/WB-final-project/?page=delete&task_id=<?= $task['id'] ?>">
                <div class="delete-btn inline"></div>
              </a>
            </td>
          </tr>



        <?php } ?>
      </tbody>
    </table>

    <a href="/WB-final-project/?page=list&action=modify&last_order_id=<?= $last_order_id ?>">Add task<div class="add-btn inline"></div> </a>
    <h4>Jau padarīti</h4>
    <table class="checked-1">
      <tbody>
        <?php
        foreach ($this->tasklistChecked as $key => $task) {
          $order_id = $key + sizeof($this->tasklistUnchecked) + 1;
          $ch_order_id = sizeof($this->tasklistUnchecked) + 1;
        ?>

          <tr order_id="<?= $order_id ?>" task="<?= $task['id'] ?>">
            <td>
              <form action="/WB-final-project/?page=check&task_id=<?= $task['id'] ?>&order_id=<?= $ch_order_id ?>&checkbox_value=0" method="post">
                <input type="checkbox" name="checked" class="check-btn" <?php if ($task["checked"] == '1') {
                                                                          echo "checked";
                                                                        } else {
                                                                          echo "";
                                                                        } ?> onchange="this.form.submit()">
              </form>
            </td>
            <td><?= $task["task"] ?></td>

            <td>

              <a href="/WB-final-project/?page=delete&task_id=<?= $task['id'] ?>">
                <div class="delete-btn-1 inline"></div>
              </a>
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