<?php

require_once "./../db.php";
include_once './../phpmailer-master/mail.php';


$data=json_decode(file_get_contents("php://input"),true);

$db=new Database("root","");

switch($_SERVER["REQUEST_METHOD"]){

  case "POST":{

    if(isset($data["email"])){
      $q="SELECT email,id FROM student WHERE email=:email";
      $re=$db->selectElement($q,$data)["data"][0];

      if(!empty($re)){
        $mail->setFrom('tagmatibourk8@gmail.com','CGB');
        $mail->addAddress($re["email"]);
        $mail->Subject = "Verification code";
        $code = rand(100000, 999999);
        $mail->Body ="Email address verification code: <h3 style='color:blue;'>$code</h3>";
        $mail->send();
        echo json_encode(["msg"=>"valid","code"=>$code,"id"=>$re["id"]]);
      }else{
        echo json_encode(["msg"=>"not valid"]);

      }
    }

    // if(isset($data["code"])){
    //   $q="SELECT email FROM student WHERE email=:email";
    //   $re=$db->selectElement($q,$data)["data"];
    //   if(!empty($re)){
    //     echo json_encode(["msg"=>"valid","code"=>$code]);
    //   }else{
    //     echo json_encode(["msg"=>"not valid"]);

    //   }
    // }
    break;
  }

  // reset pwd

  case "PUT":{
    $q="UPDATE student SET pwd=:pwd WHERE id=:id";
    $pwd=password_hash($data["pwd"],PASSWORD_DEFAULT);
    $db->update($q,["pwd"=>$pwd,"id"=>$data["id"]]);

    $q1="SELECT student.who, student.id,student.full_name,student.class_id,student.photo,student.pwd,access_token.token FROM student 
          LEFT JOIN access_token ON student_id=student.id WHERE student.id=:id ";
    $re=$db->selectElement($q1,["id"=>$data["id"]])["data"][0];
    
    echo json_encode(["msg"=>"valid",...$re]);
  }
}


