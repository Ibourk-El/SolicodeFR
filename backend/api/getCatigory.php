<?php
require_once "./../db.php";

$user="root";
$pwd="";

$db=new Database($user,$pwd);


switch($_SERVER["REQUEST_METHOD"]){

  case "GET":{
    if(isset($_GET["class_id"])){
      $q="SELECT autho_name,id FROM autho WHERE class_id=:class_id";
      $result=$db->selectElement($q,["class_id"=>$_GET["class_id"]])["data"];
      echo json_encode($result);
      die;
    }

    if(isset($_GET["case"])){
      $q="SELECT autho_elements.id,autho_elements.part_title FROM autho_elements 
      INNER JOIN autho ON autho.id=autho_elements.autho_id  WHERE autho.creater_id=:creater_id AND autho_elements.autho_id=:id";
      $result=$db->selectElement($q,["creater_id"=>$_GET["creater_id"],"id"=>$_GET["autho_id"]])["data"];
      echo json_encode($result);
    }
    elseif(isset($_GET["creater_id"])){
      $q="SELECT autho_name,id FROM autho WHERE creater_id=:creater_id";
      $result=$db->selectElement($q,["creater_id"=>$_GET["creater_id"]])["data"];
      echo json_encode($result);
      die;
    }

    break;
    
  }

  case "PATCH":{
    $data=json_decode(file_get_contents("php://input"),true);
    $q="UPDATE autho_elements SET `autho_elements`.`part_title`=:part_title  WHERE `autho_elements`.`id` =:id AND `autho_elements`.`autho_id` =:autho_id ";
    $db->update($q,$data);

    echo json_encode(["msg"=>"the element is updated"]);
    break;
  }

  case "DELETE":{
    $data=json_decode(file_get_contents("php://input"),true);
    $q="DELETE FROM autho_elements WHERE `autho_elements`.`id` =:id AND `autho_elements`.`autho_id` =:autho_id ";
    $db->delete($q,$data);

    echo json_encode(["msg"=>"the element is deleted"]);
    break;
  }
}