<?php
require_once __DIR__ . "/../views/listView.php";
require_once __DIR__ . "/../models/listModel.php";
require_once __DIR__ . "/../components/modifyForm.php";

if (isset($_POST['logOut'])) {
    session_destroy();
    Header('Location: /WB-final-project/?page=login');
}

// $model = new listModel();
// $tasklist = $model->getAll();

// $view = new listView($tasklist);
// $view->html();

$model = new listModel();
$tasklistUnchecked = $model->getAllUnchecked();
$tasklistChecked = $model->getAllChecked();

$view = new listView($tasklistUnchecked, $tasklistChecked);
$view->html();



if (isset($_GET["action"]) && $_GET["action"] === "modify") {
    if (isset($_GET["task_id"])) {
        $task = $model->getById($_GET["task_id"]);
        $task["order_id"] = $_GET["order_id"];
        $form = new modifyForm($task["task"], $task["id"], $task["order_id"], $task["checked"]);
    } else {
        $order_id = $_GET["last_order_id"];
        $task = "";
        $id = "";
        $form = new modifyForm($task, $id, $order_id);
    }
    $form->html();
}
