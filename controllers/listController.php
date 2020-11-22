<?php
require_once __DIR__ . "/../views/listView.php";
require_once __DIR__ . "/../models/listModel.php";
require_once __DIR__ . "/../components/modifyForm.php";

if (isset($_POST['logOut'])) {
    session_destroy();
    Header('Location: /WB-final-project/?page=login');
}

$model = new listModel();
$tasklist = $model->getAll();

$view = new listView($tasklist);
$view->html();



if (isset($_GET["action"]) && $_GET["action"] === "modify") {
    if (isset($_GET["task_id"])) {
        $task = $model->getById($_GET["task_id"]);

        $form = new modifyForm($task["task"], $task["order_id"], $task["checked"]);
    } else {
        $form = new modifyForm();
    }
    $form->html();
}
