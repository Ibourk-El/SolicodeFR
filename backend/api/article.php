<?php
  require_once "./../db.php";
  require_once "./../handler/image.handler.php";
  require_once "./../midelware/authorization.php";

  if(!(isset($_SERVER['HTTP_X_ACCESS_TOKEN']) && checkIfTheUserIsLoged($_SERVER["HTTP_ID"],$_SERVER['HTTP_X_ACCESS_TOKEN']))){
    http_response_code(401);
    exit();
  }




  header("Content-Type: Application/json");
  $data= (array) json_decode(file_get_contents("php://input"));

  $user= "root";
  $pwd= "";


  $db= new Database($user,$pwd);

    switch($_SERVER["REQUEST_METHOD"]){
      case "POST":{
  

        $data=[...json_decode($_POST["data"],true)];
        $data["file_path"]=json_encode([]);
        if(isset($_FILES["file"])){
          $data["file_path"]=handelImages($_FILES["file"]);
        }
        $query= "INSERT INTO articles(title,body,file_path,creater_id,tags) VALUES (:title,:body,:file_path,:creater_id,:tags)";
        $re=$db->insert($query,$data);
        echo json_encode(["status"=>201,"msg"=>"the article is add successfully",$re]);
      
        break;
      }
      case "GET":{
        if(!empty($_GET)){

          // select one article that has id
          if(isset($_GET["id"])){
            $query="SELECT articles.body,articles.title,articles.create_at,articles.id,articles.file_path,articles.tags,student.full_name FROM articles INNER JOIN student ON articles.creater_id=student.id WHERE articles.id=:id";
            $data=["id"=>$_GET["id"]];
          }

          // select all article of creater
          else if(isset($_GET["creater_id"])){
            $query="SELECT articles.body,articles.title,articles.create_at,articles.id,articles.file_path,student.full_name  FROM articles INNER JOIN student ON articles.creater_id=student.id WHERE articles.creater_id=:creater_id";
            $data=["creater_id"=>$_GET["creater_id"]];
          }

          $res=$db->selectElement($query,$data);
          echo json_encode($res);

        }else{

          // select all articles in database
            $query="SELECT articles.*,student.full_name FROM articles INNER JOIN student ON articles.creater_id=student.id ";
            $res=$db->selectElement($query,[]);
            // print_r($res);
            echo json_encode($res);
        }
        break;
      }
      case "PUT":{

        $data=[...json_decode($_POST["data"],true)];

        if(isset($_FILES["file"])){
          $data["file_path"]=handelImages($_FILES["file"]);
          $q="UPDATE articles SET title=:title,body=:body,file_path=:file_path,tags=:tags,creater_id=:crater_id WHERE id=:id ";
          $db->update($q,$data);
        }else{
          $q="UPDATE articles SET title=:title,body=:body,tags=:tags,creater_id=:crater_id WHERE id=:id ";
          $db->update($q,$data);
        }
        echo json_encode(["status"=>201,"msg"=>"the article is update successfully"]);
        break;
      }
      case "DELETE":{
          $q="DELETE FROM articles WHERE id=:id ";
          $db->delete($q,$data);
        echo json_encode(["status"=>201,"msg"=>"the article is deleted successfully"]);

        break;
      }
  
      default : echo json_encode(["msg"=>"REQUEST METHOD NOT REQUIRED"]);
    }





