<?php
require_once "./../db.php";
require_once "./../handler/image.handler.php";
require_once "./../midelware/authorization.php";

if(!(isset($_SERVER['HTTP_X_ACCESS_TOKEN']) && checkIfTheUserIsLoged($_SERVER["HTTP_ID"],$_SERVER['HTTP_X_ACCESS_TOKEN']))){
  http_response_code(401);
  exit();

}


  $user= "root";
  $pwd= "";
  $tbname= "comments";

  header("Content-Type: Application/json");
  $data= (array) json_decode(file_get_contents("php://input"));

  $db= new Database($user,$pwd);

  switch($_SERVER["REQUEST_METHOD"]){
    case "GET":{
      $query="SELECT comments.body, student.full_name , student.photo FROM comments INNER JOIN student ON catigory=:catigory AND catigory_id=:catigory_id AND comments.creater_id=student.id ";
      $re=$db->selectElement($query,$_GET);
      for($i=0;$i<count($re["data"]);$i++){
        $re["data"][$i]["photo"]=changePathOfImg($re["data"][$i]["photo"]);
      }
      echo json_encode($re);
      break;

    }
    case "POST":{
      $query= "INSERT INTO $tbname(body,catigory,catigory_id,creater_id) VALUES (:body,:catigory,:catigory_id,:creater_id)";
      $re=$db->insert($query,$data);
      echo json_encode(["status"=>201,"msg"=>"the comment is add successfully","res"=>$re]);
      break;
    }
    
    case "PUT":{
      break;
    }
    case "DELETE":{
      break;
    }

    default : echo "REQUEST METHOD NOT REQUIRED";
  }
