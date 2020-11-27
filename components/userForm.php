<?php

class UserForm
{
  private $LogRegText;
  public function html()
  {
?>
    <div class="header">
      <h4><?= $this->getLogRegText() ?>
        <a href="<?= $this->getTogleLogReg() ?>" class="button reg-log-btn"><?= $this->getLogRegBtnText() ?></a></h4>

    </div>
    <div class="login">

      <form method="POST" class="login-wraper">
        <div class="<?= $this->getTogleImgClass() ?>"></div>
        <label>Lietotājvārds
          <input class="login-input" type="text" name="username" required></label>
        <label>Parole
          <input class="login-input" type="password" name="password" required></label>
        <button type="submit" name="login" class="login-btn"></button>
      </form>
    </div>



    </form>
<?php
  }

  public function setLogRegText($text)
  {
    $this->LogRegText = $text;
  }

  public function getLogRegText()
  {
    return $this->LogRegText;
  }

  public function setLogRegBtnText($text)
  {
    $this->LogRegBtnText = $text;
  }


  public function getLogRegBtnText()
  {
    return $this->LogRegBtnText;
  }

  public function setTogleLogReg($text)
  {
    $this->TogleLogReg = $text;
  }

  public function getTogleLogReg()
  {
    return $this->TogleLogReg;
  }


  public function setTogleImgClass($text)
  {
    $this->TogleImgClass = $text;
  }

  public function getTogleImgClass()
  {
    return $this->TogleImgClass;
  }
}
?>