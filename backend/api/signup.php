<?php 
$user="root";
$pwd="";
$tbname="student";
$teachersCodeValidat="aaaa";

require_once "./../db.php";
require_once "./../handler/image.handler.php";

header("Content-Type:Application/json");
$data=(array) json_decode(file_get_contents("php://input"));

$photo=changePathSignupAvatarOfImg(__DIR__.DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."image".DIRECTORY_SEPARATOR."profile_avatar.png");

$data["photo"]=$photo;
$db= new Database($user,$pwd);

if($_SERVER["REQUEST_METHOD"]==="POST"){

  if(checkIfEmailIsExist($data["email"])){

    // check if the user is a teacher
    if($data["who"]==="teacher" && $data["code"]!=="aaaa"){
      echo json_encode(["err"=>"not valid","msg"=>"the code not valid"]);
      exit;
    }
    
    $pwd=password_hash($data["pwd"],PASSWORD_DEFAULT);
    $data["pwd"]=$pwd;
    $cleanData=[];
    foreach($data as $k=>$v){
      if($k==="code")continue;
      $cleanData[$k]=$v;

    }
    $stauts=$db->insert("INSERT INTO $tbname(email,pwd,full_name,class_id,photo,who) VALUES (:email,:pwd,:full_name,:class_id,:photo,:who) ",$cleanData);
    $res=[];

    if($stauts){
      $res["status"]=200;
      $res["msg"] ="Data is Added Successfully";
    }
    else{
      $res["status"]=401;
      $res["message"] ="err";
    }

  }else{
    echo json_encode(["err"=>"not valid","msg"=>"email is allready exist"]);
    exit;
  }


  echo json_encode($res);

}


function checkIfEmailIsExist($email){
  global $db;
  $q="SELECT email FROM student WHERE email=:email";
  return empty(($db->selectElement($q,["email"=>$email])["data"]));
}