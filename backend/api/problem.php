<?php 

require_once "./../db.php";
require_once "./../handler/problem.handler.php";
require_once "./../midelware/authorization.php";

if(!(isset($_SERVER['HTTP_X_ACCESS_TOKEN']) && checkIfTheUserIsLoged($_SERVER["HTTP_ID"],$_SERVER['HTTP_X_ACCESS_TOKEN']))){
  http_response_code(401);
  exit();
}

$user="root";
$pwd="";
$tbname="challenge";

$data=(array)json_decode(file_get_contents("php://input"));


$db=new Database($user,$pwd);

  if($_SERVER["REQUEST_METHOD"]==="GET"){
    if(isset($_GET["student_id"])){
      $query="SELECT $tbname.title,$tbname.id,$tbname.difficulty ,problemstate.status FROM $tbname LEFT JOIN problemstate ON $tbname.id=problemstate.problem_id AND problemstate.student_id=:student_id order by id ";
      echo json_encode($db->selectElement($query,$_GET)["data"]);
    }else{
      $query="SELECT title,body,id,js_fun,php_fun FROM $tbname WHERE id=:id ";
      $re=$db->selectElement($query,["id"=>$_GET["id"]])["data"][0];
      echo json_encode($re);
    }
  }

  if($_SERVER["REQUEST_METHOD"]==="POST"){

    
    if($data["extantion"]==="javascript"){
      $query="SELECT js,output FROM $tbname WHERE id=:id";   
      $re=$db->selectElement($query,["id"=>$data["problemId"]])["data"][0];
      $url_of_test_file=$re["js"];
      $expacted_output=json_decode(($re["output"]),true);

      $content=file_get_contents($url_of_test_file);

      $file_output=executeFile($data,$content,"node","js");
      if($file_output["result_code"]===0){
        $status="";
        $res=checkAnswers($file_output["output"],$expacted_output);
        if($res["passed"]===count($expacted_output)){
          $status= "valid";
        }
        else{ 
          $status="no valid";
        }
        $id=checkIfProblemStatueIsCreated(["problem_id"=>$data["problemId"],"student_id"=>$data["userId"]]);
        if($id==false){
          $query="INSERT INTO problemstate(problem_id,student_id,status) VALUES(:problem_id,:student_id,:status)";
          $db->insert($query,["problem_id"=>$data["problemId"],"student_id"=>$data["userId"],"status"=>$status]);
        }else{
          $query="UPDATE problemstate SET status='$status' WHERE id=:id";
          $db->update($query,["id"=>$id]);
        }
        $res["passed"]=$status;
        echo json_encode($res);
      }else{
        echo json_encode(["result"=>["Test"=>["state"=>"invalidCode","result"=>"Lock to your code there is some issuse"]]]);
      }
    }
  }



function checkIfProblemStatueIsCreated($data){
  global $db;
  $query="SELECT id FROM problemstate WHERE problem_id=:problem_id AND student_id=:student_id";
  $re=$db->selectElement($query,$data)["data"];
  if(!empty($re[0]))return $re[0]["id"] ;
  return false;
}











