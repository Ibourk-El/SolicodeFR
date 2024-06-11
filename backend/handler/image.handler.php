<?php

  // "C:\\xampp\\htdocs\\projects\\PFE\\solicode\\backend\\handler\\..\\image\\Capture.PNG_1716899953.PNG";
  // "C:\xampp\htdocs\projects\PFE\solicode\backend\image\1713899003.jpeg";
  // C:\xampp\htdocs\projects\PFE\solicode\backend\handler

  $IMAGE_PATH=explode("\\",__DIR__);
  array_pop($IMAGE_PATH);

  $IMAGE_PATH=implode("/",$IMAGE_PATH);
  $IMAGE_PATH.="/image/";
  
  
  function handelImages($files){
    $images_path=[];
    global $IMAGE_PATH;
    for($i=0;$i<count($files["name"]);$i++){
      if(checkExtantion($files["type"][$i])!==""){
        $new_path=$IMAGE_PATH.changeImgName($files["name"][$i]);
        $images_path["img $i"]=changePathOfImg($new_path);
        move_uploaded_file($files["tmp_name"][$i],$new_path);
      }
      else{
        echo "type of this [".$files["name"][$i]."] file is not valid";
      }
    }
    return json_encode($images_path);
  }

function changeImgName($file_name){
    $ext=pathinfo($file_name,PATHINFO_EXTENSION);
    $new_name=time()."_".$file_name ;
    return $new_name;
}

function checkExtantion($file_type){
  $arr=["image/png","image/jpeg","image/jpg"];
  return array_search($file_type,$arr);
}

function changePathOfImg($url){
  return str_replace("C:/xampp/htdocs","http://localhost",$url);
}

function changePathSignupAvatarOfImg($url){
  return str_replace("C:\\xampp\\htdocs","http://localhost",$url);
}




