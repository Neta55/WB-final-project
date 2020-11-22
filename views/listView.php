<?php
require_once __DIR__ . "/../components/modifyForm.php";
class listView
{
  private $tasklist;

  public function __construct($data = [])
  {
    $this->tasklist = $data;
  }


  public function html()
  {
    foreach ($this->tasklist as $task) {
      switch ($task["checked"]) {
        case "0": ?>
          <table class="checked-null">
            <tbody>
              <tr>
                <td><?= $task["task"] ?></td>
                <td>
                  <input type="checkbox" name="checked" <?php if ($task["checked"] == '0') {
                                                          echo "checked";
                                                        } else {
                                                          echo "";
                                                        } ?>>
                </td>
                <td>
                  <a href="/WB-final-project/?page=list&action=modify&task_id=<?= $task['id'] ?>">Edit</a>
                  <a href="/WB-final-project/?page=delete&task_id=<?= $task['id'] ?>">Delete<?= $task['id'] ?></a>
                </td>
              </tr>
            </tbody>
          </table>
        <?php
          break;
        case "1":
        ?>
          <table class="checked-null">
            <tbody>
              <tr>
                <td><?= $task["task"] ?></td>
                <td>
                  <input type="checkbox" name="checked" <?php if ($task["checked"] == '0') {
                                                          echo "checked";
                                                        } else {
                                                          echo "";
                                                        } ?>>
                </td>
                <td>
                  <a href="/WB-final-project/?page=list&action=modify&task_id=<?= $task['id'] ?>">Edit</a>
                  <a href="/WB-final-project/?page=delete&task_id=<?= $task['id'] ?>">Delete<?= $task['id'] ?></a>
                </td>
              </tr>
            </tbody>
          </table>

    <?php }
    } ?>



    <a href="/WB-final-project/?page=list&action=modify">Add task</a>

    <form method="POST">
      <input name="logOut" type="hidden">
      <button type="submit">Log out</button>
    </form>
<?php

  }
}
?>