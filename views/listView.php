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
  { ?> <div class="">
      <form method="POST">
        <h1>Lietotājs <?= $_SESSION['id'] ?> ir pieslēdzies!</h1>
        <!-- <p> Viņa user_id ir <?= $_SESSION['user_id'] ?></p> -->
        <input name="logOut" type="hidden">
        <button type="submit">Log out</button>
      </form>
    </div><?php
          foreach ($this->tasklist as $key => $task) {
            $order_id = $key + 1;
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
              <a href="/WB-final-project/?page=list&action=modify&task_id=<?= $task['id'] ?>&order_id=<?= $order_id ?>">Edit<?= $order_id ?></a>
              <a href="/WB-final-project/?page=delete&task_id=<?= $task['id'] ?>">Delete<?= $task['id'] ?></a>
            </td>
          </tr>
        </tbody>
      </table>


    <?php }
    ?>



    <a href="/WB-final-project/?page=list&action=modify">Add task</a>


<?php

  }
}
?>