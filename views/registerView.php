<?php
require_once __DIR__ . "/../components/userForm.php";


class RegisterView
{


  public function html()
  {
    $form = new UserForm();
    $form->setLogRegText("Lai reģistrētos, lūdzu aizpildi formu! </br> <span>Ja jau esi reģistrējies, dodies</span>");
    $form->setLogRegBtnText("Atpakaļ");
    $form->setTogleLogReg("/WB-final-project/?page=login");
    $form->setTogleImgClass("addUserImage");
    $form->html();
  }
}
