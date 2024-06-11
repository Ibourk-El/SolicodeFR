<?php

function checkAnswers($output,$expacted_output){
  // to coumpper between user values and expected values
  $result=[];
  $test_passed=0;
  for($i=0;$i<count($output);$i++){
    if($output[$i]==$expacted_output[$i]){
      $result["Test $i"]=["state"=>"valid","result"=>json_encode($output[$i])];
      $test_passed++;
    }else{
      $your= json_encode($output[$i]);
      $our=json_encode($expacted_output[$i]);
      $result["Test $i"]=["state"=>"invalid","result"=>"Your Output $your We Expacted $our"];
    }
  }

  return ["result"=>$result,"passed"=>$test_passed];
}

function createFileContent($data,$test_content,$ext){
  // to create file path and file content 

  $path=__DIR__.DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."files".DIRECTORY_SEPARATOR."solved-file".DIRECTORY_SEPARATOR;
  // $path="C:/xampp/htdocs/projects/PFE/solicode/backend/files/solved-file/";

  $name= removeWhiteSpace($data["problemTitle"]).$data["problemId"]."_".$data["userId"]."_.$ext";
  $file_name=$path.$name;
  $fun=$data["code"];
  $file_content="$fun\n$test_content";


  return ["file_name"=>$file_name,"file_content"=>$file_content];
}

function executeFile($data,$test_content,$lan,$ext){
  // to execute the file 
  $file_data=createFileContent($data,$test_content,$ext);
  file_put_contents($file_data["file_name"],$file_data["file_content"]);

  exec("$lan ".$file_data["file_name"],$output,$result_code);

  return ["output"=>$output,"result_code"=>$result_code];
}

function removeWhiteSpace($name){
  return str_replace(" ","_",$name);
}