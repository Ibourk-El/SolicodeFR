<?php
require_once "./../db.php";
require_once "./../handler/image.handler.php";
require_once "./../midelware/authorization.php";

if(!(isset($_SERVER['HTTP_X_ACCESS_TOKEN']) && checkIfTheUserIsLoged($_SERVER["HTTP_ID"],$_SERVER['HTTP_X_ACCESS_TOKEN']))){
  http_response_code(401);
  exit();
}
  header("Content-Type: Application/json");
  header('HTTP/1.0 200 ok');
  $data= (array) json_decode(file_get_contents("php://input"));

  $user= "root";
  $pwd= "";

  $db= new Database($user,$pwd); 
  
  
  switch($_SERVER["REQUEST_METHOD"]){
    case "POST":{
      $data=[...(array)json_decode($_POST["data"])];
      isset($_FILES["file"]) ?$data["file_path"]=handelImages($_FILES["file"]) : $data["file_path"]=json_encode([]);
      
      $query= "INSERT INTO post(post_body,file_path,likes,creater_id) VALUES (:post_body,:file_path,:likes,:creater_id)";
      ;
      echo json_encode(["status"=>201,"msg"=>"the post is add successfully","t"=>$db->insert($query,[...$data,"likes"=>json_encode($data["likes"])])]);
      break;
    }
    case "GET":{
      
      if(!empty($_GET)){
        // filter post
        $query="SELECT post.post_body,student.full_name,student.photo,post.likes,post.create_at,post.id,post.file_path FROM post 
        INNER JOIN student ON student.id=post.creater_id WHERE creater_id=:creater_id  order by post.id DESC ";
        $res=$db->selectElement($query,["creater_id"=>$_GET["creater_id"]]);
        echo json_encode($res);
      }else{
        // all posts
        $query="SELECT post.post_body,student.full_name,post.likes,post.create_at,post.id,post.file_path,student.photo FROM post 
        INNER JOIN student ON student.id=post.creater_id ";
        $res=$db->selectElement($query,$data);
        echo json_encode($res);
      }
      break;
    }
    case "PUT":{

      if(empty($data["file_path"])){
        $query="UPDATE post SET post_body=:post_body WHERE id=:id ";
        $data=["post_body"=>$data["post_body"],"id"=>$data["id"]];
        $db->update($query,$data);
        echo json_encode(["status"=>202,"msg"=>"The Post Is updated"]);
      }
      else{
        $query="UPDATE post SET post_body=:post_body,file_path=:file_path WHERE id=:id ";
        $db->update($query,$data);
        echo json_encode(["status"=>202,"msg"=>"The Post Is updated"]);
      }

      break;
    }

    case "PATCH":{
      $selectQuery="SELECT likes FROM post WHERE id=:id";
      $re=$db->selectElement($selectQuery,["id"=>$data["id"]]);
      $re= (array) json_decode($re["data"][0]["likes"]);
      $re["likes"]=$data["likes"];
      
      if(count($re["students_IDs"])>0){
        foreach($re["students_IDs"] as $v){
          if($v==$data["user_id"])
            echo json_encode(["msg"=>"already"]);
          exit;
        }
      }
      array_push($re["students_IDs"],$data["user_id"]);

      $m=json_encode($re);
      $updateQuery="UPDATE post SET likes=:likes
      WHERE id=:id";
      
      $db->update($updateQuery,["id"=>$data["id"],"likes"=>$m]);

      echo json_encode(["data"=>"is add successfully","t"=>$re["students_IDs"]]);
      break;
    }
    case "DELETE":{

      $q="DELETE FROM post WHERE id=:id";
      $db->delete($q,["id"=>$data["id"]]);
      echo json_encode(["msg"=>"the post is deleted ".$data['id']]);
      break;
    }

    default : echo "REQUEST METHOD NOT REQUIRED";
  }




  function filePath($files){

    $f=(array)json_decode($files);
    $ar=[];

    for($i=0;$i<count($f);$i++){
      $ar["img $i"]=changePathOfImg($f["img $i"]);
    }

    return $ar;

  }




