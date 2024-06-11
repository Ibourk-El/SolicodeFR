<?php 

require_once "./../db.php";
require_once "./../midelware/authorization.php";
require_once "./../handler/image.handler.php";



if(!(isset($_SERVER['HTTP_X_ACCESS_TOKEN']) && checkIfTheUserIsLoged($_SERVER["HTTP_ID"],$_SERVER['HTTP_X_ACCESS_TOKEN']))){
  http_response_code(401);
  exit();
}

$user="root";
$pwd="";

$db=new Database($user,$pwd);

if($_SERVER["REQUEST_METHOD"]=="GET"){

  if(isset($_GET["id"])){

    // get user info 
    $q="SELECT full_name,email,phone FROM student WHERE id=:id";
    $res=$db->selectElement($q,["id"=>$_GET["id"]])["data"][0];

    // get user brief static
    $q1="SELECT taskstate.`status`,taskstate.`point`,taskstate.`student_id` FROM taskstate
    INNER JOIN task ON task.id=taskstate.task_id WHERE task.class_id=:class_id";
    $res1=$db->selectElement($q1,["class_id"=>$_GET["class_id"]])["data"];

    // get user problem solving static
    $q2="SELECT challenge.`point` ,problemstate.`status`, problemstate.student_id  FROM problemstate INNER JOIN challenge WHERE  challenge.id=problemstate.problem_id ";
    $res2=$db->selectElement($q2,[])["data"];


    echo json_encode([
    "user_info"=>$res,
    "brief_data"=>briefStatistic($res1,$_GET["id"]),
    "problem_info"=>problemStatic($res2,$_GET["id"])]);
  }
}

if($_SERVER["REQUEST_METHOD"]=="PUT"){
  $data=json_decode(file_get_contents("php://input"),true);
  $key=$data["inp_name"];
  $value=$data["inp_value"];

  if($key==="email"){
    $q="SELECT email FROM student WHERE email=:email";
    if(!empty($db->selectElement($q,["email"=>$value])["data"])){
      echo json_encode(["msg"=>"this email is Allready exist"]);
      exit();
    }
  }

  $q="UPDATE student SET $key=:$key WHERE id=:id ";
  echo json_encode($db->update($q,[$key=>$value,"id"=>$data["id"]]));
}

if($_SERVER["REQUEST_METHOD"]=="POST"){

  $image_path=json_decode(handelImages($_FILES["file"]),true)["img 0"];

  $q="UPDATE student SET photo=:photo WHERE id=:id ";
  $id=json_decode($_POST["data"],true)["id"];
  $db->update($q,["photo"=>$image_path,"id"=>$id]);
  http_response_code(201);
  echo json_encode(["msg"=>"photo update successfully","photo"=>$image_path]);
}


function briefStatistic($res1,$id){
  $briefData=[
  ];
  foreach($res1 as $row){
    if(array_key_exists($row["student_id"],$briefData)){
      $briefData[$row["student_id"]]["brief_valid"]+=$row["status"]==="valid"?1:0;
      $briefData[$row["student_id"]]["points"]+=$row["point"];
    }
    else{
      $briefData[$row["student_id"]]["brief_valid"]=$row["status"]==="valid"?1:0;
      $briefData[$row["student_id"]]["points"]=$row["point"];
    }
  }

  $index=getIndexRank($briefData,$id);
  $briefData[$id]["rank"]=$index;

  return $briefData[$id];
}

function problemStatic($res2,$id){
  $problemData=[];

  foreach($res2 as $row){
    if(array_key_exists($row["student_id"],$problemData)){
      $problemData[$row["student_id"]]["points"]+=$row["status"]==="valid"? $row["point"]:0;
      $problemData[$row["student_id"]]["valid"]+=$row["status"]==="valid"? 1:0;
    }
    else{
      $problemData[$row["student_id"]]=[

        "points"=>$row["point"],
        "valid"=>$row["status"]==="valid"? 1:0,

      ];
    }
  }

  $index=getIndexRank($problemData,$id);

  $problemData[$id]["rank"]=$index;

  return $problemData[$id];

}


function getIndexRank($briefData,$id){
  $points=[];

  foreach($briefData as $k=>$v){
    $points[$k]=$briefData[$k]["points"];
  }
  arsort($points);
  $index=0;
  foreach($points as $k=>$v){
    $index++;
    if($k==$id){
      return $index;
    }
  }
}
