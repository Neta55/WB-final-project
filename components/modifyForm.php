<?php

class modifyForm
{
  private $task;
  private $id;
  private $order_id;
  private $checked;

  public function __construct($task = null, $id = null, $order_id = null, $checked = null)
  {
    $this->task = $task;
    $this->id = $id;
    $this->order_id = $order_id;
    $this->checked = $checked;
  }

  public function html()
  {

?>
    <div id="cover">
      <div id="pop-up">
        <form action="/WB-final-project/?page=modify" method="POST" class="login-wraper">
          <input class="add-input" name="task" value="<?= $this->task ?>">
          <input type="hidden" name="id" value="<?= $this->id ?>">
          <input type="hidden" name="order_id" value="<?= $this->order_id ?>">
          <input type="hidden" name="checked" value="<?= $this->checked ?>">


          <button class="popup-btn" type="submit">Saglabāt</button>
        </form>
      </div>
    </div>
<?php
  }
}
?>