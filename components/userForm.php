<?php

class UserForm
{
  private $LogRegText;
  public function html()
  {
?>
    <div class="header1">
      <h2><?= $this->getLogRegText() ?></h2>
      <form method="POST" class="login2">
        <div class="addUserImage"></div>
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
}
?>

<!-- mainīt paroles izskatu ar actiņu:
document.getElementsByName('password')[0].setAttribute('type', 'text')
document.getElementsByName('password')[0].setAttribute('type', 'password')
+ pielikt actiņas elementu un tam pievienot listeneri kas šos pārslēdz-->