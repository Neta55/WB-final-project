<?php
require_once __DIR__ . "/../components/modifyForm.php";

class listView
{
  private $tasklistUnchecked;
  private $tasklistChecked;

  public function __construct($tasklistUnchecked = [], $tasklistChecked = [])
  {
    $this->tasklistUnchecked = $tasklistUnchecked;
    $this->tasklistChecked = $tasklistChecked;
  }

  public function html()
  { ?>
    <div class="header">
      <h4>Lietotājs "<?= $_SESSION['username'] ?>" ir pieslēdzies! </br> <span class="top">Atslēgties</span>
        <form method="POST" class="inline">
          <input name="logOut" type="hidden">
          <button type="submit" class="logout-btn"></button>
        </form>
      </h4>

    </div>
    <table class="checked-no" id="todotable">
      <tbody id="unchecked">
        <?php
        $last_order_id = sizeof($this->tasklistUnchecked) + sizeof($this->tasklistChecked) + 1;
        foreach ($this->tasklistUnchecked as $key => $task) {
          $order_id = $key + 1;
          $ch_order_id = sizeof($this->tasklistUnchecked) + 1;
        ?>

          <tr order_id="<?= $order_id ?>" task="<?= $task['id'] ?>">
            <td style="width: 40px;" class="drag-btn"></td>
            <td style="width: 40px;">
              <form action="/WB-final-project/?page=check&task_id=<?= $task['id'] ?>&order_id=<?= $ch_order_id ?>&checkbox_value=1" method="post">
                <input type="checkbox" class="check-btn" name="checked" <?php if ($task["checked"] == '0') {
                                                                          echo "";
                                                                        } else {
                                                                          echo "checked";
                                                                        } ?> onchange="this.form.submit()">
              </form>
            </td>
            <td class="task-on"><?= $task["task"] ?></td>
            <td style="width: 40px;">
              <a href="/WB-final-project/?page=list&action=modify&task_id=<?= $task['id'] ?>&order_id=<?= $order_id ?>">
                <div class="button edit-btn inline"></div>
              </a></td>
            <td style="width: 40px;">
              <a href="/WB-final-project/?page=delete&task_id=<?= $task['id'] ?>">
                <div class="delete-btn inline"></div>
              </a>
            </td>
          </tr>



        <?php } ?>

      </tbody>
    </table>
    <div class="center">
      <a href="/WB-final-project/?page=list&action=modify&last_order_id=<?= $last_order_id ?>" class="add-btn">Pievienot ierakstu</a></div>

    <table class="checked-yes">
      <tbody id="checked">
        <?php
        foreach ($this->tasklistChecked as $key => $task) {
          $order_id = $key + sizeof($this->tasklistUnchecked) + 1;
          $ch_order_id = sizeof($this->tasklistUnchecked) + 1;
        ?>

          <tr order_id="<?= $order_id ?>" task="<?= $task['id'] ?>">
            <td style="width: 40px;">
              <form action="/WB-final-project/?page=check&task_id=<?= $task['id'] ?>&order_id=<?= $ch_order_id ?>&checkbox_value=0" method="post">
                <input type="checkbox" name="checked" class="check-btn" <?php if ($task["checked"] == '1') {
                                                                          echo "checked";
                                                                        } else {
                                                                          echo "";
                                                                        } ?> onchange="this.form.submit()">
              </form>
            </td>
            <td class="task-off"><?= $task["task"] ?></td>

            <td style="width: 40px;">

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