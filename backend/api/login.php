<?php 

require_once "./../db.php";
require_once "./../handler/image.handler.php";

$user="root";
$pwd="";
$tbname="student";


header("Content-Type:Application/json");
$data=(array) json_decode(file_get_contents("php://input"));

$db=new Database($user,$pwd);

$query="SELECT $tbname.who, $tbname.id,$tbname.full_name,$tbname.class_id,$tbname.photo,$tbname.pwd,access_token.token FROM $tbname 
LEFT JOIN access_token ON student_id=$tbname.id WHERE email=:email ";
$res=$db->selectElement( $query,["email"=>$data["email"]])["data"];

if(!empty($res) && password_verify($data["pwd"],$res[0]["pwd"])){
  $res=[...$res[0]];
  $res["status"]=200;
  $res["msg"]="you are login successfully";
  $res["photo_path"]=changePathOfImg($res["photo"]);

  // generate token 
  $res["_tk"]=generateAccessToken();
  if($res["id"]){

  }
  $sTime= date('Y-m-d H:i:s');
  $eTime=date('Y-m-d H:i:s',strtotime($sTime)+60*60);

  if(empty($res["token"])){
    
    $qtk= "INSERT INTO access_token(student_id,token,start_time,end_time) VALUES(:student_id,:token,'$sTime','$eTime')";
    $db->insert($qtk,["token"=>$res["_tk"],"student_id"=>$res["id"]]);
  }else{
    $qtk="UPDATE access_token SET token=:token,start_time='$sTime',end_time='$eTime'  WHERE student_id=:student_id ";
    $db->update($qtk,["token"=>$res["_tk"],"student_id"=>$res["id"]]);
  }

}
else{
  global $res;
  $res["status"]=401;
  $res["msg"]="pwd or email is not correct ";
}


echo json_encode($res);


function generateAccessToken(){
  return md5(uniqid(rand(10000,99999)));
}






