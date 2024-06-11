<?php
include_once 'phpmailer-master/mail.php';
session_start();

//validation input
function validate($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
if(!empty($_POST['email'])){
    try{
        $email = validate($_POST["email"]);
        

        $db= new PDO("mysql:host=localhost;dbname=centre", "root", "");
        $stm = $db->prepare("SELECT * FROM `user` WHERE `EMAIL`=:email");
        $stm->bindParam(":email", $email);
        $stm->execute();

        if($stm->rowCount() <= 0){
            $err =  "Email not found";
            echo json_encode(["rep" => $err]);
        }else{
            $mail->setFrom('mohammedaminebennanikabchi@gmail.com','CGB');
            $mail->addAddress($email);
            $mail->Subject = "Verification code";
            $code = rand(100000, 999999);
            $_SESSION["code"] = $code;
            $_SESSION["email"] = $email;
            $mail->Body ="Email address verification code: <h3 style='color:blue;'>$code</h3>";
            $mail->send();
            echo json_encode(["rep" => true,"code" => $code, "email" => $email]);
        }
    }catch(PDOException $e){
        echo $e->getMessage();
    }
}else{
    $err = "Please fill out this field";
    echo json_encode(["rep" => $err]);
}
?>