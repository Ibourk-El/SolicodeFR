<?php

require_once "./../db.php";
require_once "./../midelware/authorization.php";

if(!(isset($_SERVER['HTTP_X_ACCESS_TOKEN']) && checkIfTheUserIsLoged($_SERVER["HTTP_ID"],$_SERVER['HTTP_X_ACCESS_TOKEN']))){
  http_response_code(401);
  exit();
}

$user="root";
$pwd="";
$db=new Database($user,$pwd);

  $q="SELECT code FROM taskstate WHERE student_id=:student_id AND task_id=:task_id";
  $re=$db->selectElement($q,["task_id"=>$_GET["task_id"],"student_id"=>$_GET["student_id"]]);
  echo json_encode($re["data"][0]);

