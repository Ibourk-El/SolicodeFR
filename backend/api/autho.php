<?php

require_once "./../db.php";

$user="root";
$pwd="";

$data=json_decode(file_get_contents("php://input"),true);

$db=new Database($user,$pwd);


switch($_SERVER["REQUEST_METHOD"]){

  
  
  case "GET":{
    // print_r($_GET);
    $q="SELECT autho_elements.part_title,student_autho.autho_status,student_autho.start_at,student_autho.end_at,student_autho.id,autho_url
    FROM autho_elements INNER JOIN student_autho ON student_autho.autho_ele_id=autho_elements.id
    INNER JOIN autho ON autho.id=autho_elements.autho_id 
    WHERE autho.class_id=:class_id AND autho.id=:autho_id AND student_autho.student_id=:student_id ";

    $result= $db->selectElement($q,["class_id"=>$_GET["class_id"],
    "student_id"=>$_GET["student_id"],
    "autho_id"=>$_GET["autho_id"]])["data"];
    echo json_encode($result);
    break;
    
  }
  case "POST":{
    $d=[
      "autho_name"=>$data["authoCatigory"],
      "creater_id"=>$data["creater"],
      "class_id"=>$data["class_id"],
      "autho_url"=>$data["url"],
      "elements_num"=>$data["elements_num"]
    ];

    // select all student 
    $q0="SELECT id FROM `student` WHERE class_id=:class_id AND who='student'";
    $student=$db->selectElement($q0,["class_id"=>$data["class_id"]]);

      
    // insert authoformation name
    $q1="INSERT INTO autho(autho_name,creater_id,class_id,autho_url,elements_num) VALUES (:autho_name,:creater_id,:class_id,:autho_url,:elements_num)";
    $db->insert($q1,$d);
    $lastId=$db->getLastId();

    // insert authoformation elements name

    foreach($data["data"] as $el){
        $q2="INSERT INTO autho_elements(part_title,autho_id) VALUES (:part_title,'$lastId');";
        $db->insert($q2,["part_title"=>$el]);
        $lastIdOfPart=$db->getLastId();

      foreach($student["data"] as $v){
        $id=$v["id"];
        $q3="INSERT INTO student_autho(autho_ele_id,student_id,autho_status) VALUES ('$lastIdOfPart','$id','none')";
        $db->insert($q3,[]);
      }

      
    }

    // print_r($student);
    echo json_encode(["msg"=>"valid","res"=>"autho is created seccasfully"]);

    break;

  }
  case "PUT":{
    $k=$data["k"];
    $v=$data["v"];
    $id=$data["part_id"];
    $status=$data["status"];
    
    $q="UPDATE student_autho SET `$k`='$v' , autho_status='$status' WHERE id='$id' ";
    $db->update($q,[]);
    echo json_encode(["msg"=>"date is updated"]);
    
    
    break;}
  case "DELET":{break;}
}

