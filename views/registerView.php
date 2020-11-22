<?php
require_once __DIR__ . "/../components/userForm.php";

class RegisterView
{


  public function html()
  {
    $form = new UserForm();
    $form->setLogRegText("Lai reģistrētos, lūdzu aizpildi!");
    $form->html();
  }
}
