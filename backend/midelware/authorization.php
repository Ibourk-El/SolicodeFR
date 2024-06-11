<?php

require_once "./../db.php";


$db=new Database("root","");
function checkIfTheUserIsLoged($id,$token){
  $tokenV=validToken($token);
  if($tokenV && $id==$tokenV["student_id"]){
    return true;
  }
  return false;
}

function validToken($token){

  global $db;
  $q="SELECT token,student_id FROM access_token WhERE token=:token";
  $re=$db->selectElement($q,["token"=>$token]);

  if(empty($re["data"])){
    
    return false;
  }
  return $re["data"][0];

}