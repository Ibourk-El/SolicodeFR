<?php

require_once "./../db.php";
$user="root";
$pwd="";

header("Content-type: Application/json");
$db=new Database($user,$pwd);


switch($_SERVER["REQUEST_METHOD"]){
  
  case "GET":{

    $q="SELECT student_autho.autho_status,autho.autho_name,autho.elements_num,student.full_name,student.email,student.photo,student.id FROM student_autho
     INNER JOIN autho_elements ON autho_elements.id=student_autho.autho_ele_id 
     INNER JOIN autho ON autho.id=autho_elements.autho_id 
     INNER JOIN student ON student.id=student_autho.student_id 
     WHERE autho.class_id=:class_id and student_autho.autho_status='end' and student.who='student'";
    $autho_result=$db->selectElement($q,["class_id"=>$_GET["class_id"]]);

    $q="SELECT taskstate.status,taskstate.student_id FROM taskstate INNER JOIN task ON taskstate.task_id=task.id WHERE class_id=:class_id";
    $brief_result=$db->selectElement($q,["class_id"=>$_GET["class_id"]]);
    
    echo json_encode(formatData($autho_result,$brief_result));




  }
}

function formatData($autho_result,$brief_result){

  // print_r($autho_result);

  $formatArr=[];
    foreach($autho_result["data"] as $row){
      $student_id="student_".$row["id"];
      if(array_key_exists($student_id,$formatArr)){

        // check if the authoformation is exist in array
        if(array_key_exists($row["autho_name"],$formatArr[$student_id]["autho"])){
          $formatArr[$student_id]["autho"][$row["autho_name"]]["elements_end"]+=1;
        }else{
          $formatArr[$student_id]["autho"][$row["autho_name"]]=[
          "elements_number"=>$row["elements_num"],
          "elements_end"=>1
        ];
        }

      }else{
        $formatArr[$student_id]=[
          "full_name"=>$row["full_name"],
          "photo"=>$row["photo"],
          "email"=>$row["email"],
          "autho"=>[
            $row["autho_name"]=>[
              "elements_number"=>$row["elements_num"],
              "elements_end"=>1
            ]
            ],
        ];
      }
    }

  $brief=[];

    foreach($brief_result["data"] as $row){

      $student_id="student_".$row["student_id"];

      if(array_key_exists($student_id,$brief)){

        $brief[$student_id]["brief_num"]+=1;
        $brief[$student_id]["brief_valid"]+=$row["status"]==="valid" ? 1:0;

      }else{
        $brief[$student_id]=[
          "brief_num"=>1,
          "brief_valid"=>$row["status"]==="valid" ? 1:0
        ];
      }
    }



    foreach($formatArr as $key=>$value){
      $formatArr[$key]["brief"]=$brief[$key]["brief_valid"]."/".$brief[$key]["brief_num"];
    }

    return $formatArr;

}