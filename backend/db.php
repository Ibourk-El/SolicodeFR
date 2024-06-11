<?php
  class Database{
    private $dns="mysql:host=localhost;dbname=solicode_student";
    private $pdo;

    public function __construct($user,$pwd)
    {
      try{
        $this->pdo=new PDO($this->dns,$user,$pwd);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      }catch(PDOException $e){
        echo ["err"=>"feild to connet with db".$e];
      }
    }

    function insert( string $query , array $data){
      try{
        $in=$this->pdo->prepare($query);
        foreach($data as $k=>$v)$in->bindValue(":$k",$v);
        $in->execute();
        return true ;
      }catch(PDOException $e){
        return ["err"=>[$e->getMessage()]];
      }
    }

    function update( string $query , array $data){
      try{
        $in=$this->pdo->prepare($query);
        foreach($data as $k=>$v)$in->bindValue($k,$v);
        $in->execute();
      }catch(PDOException $e){
        echo json_encode(["err updata"=>"Feild To Update Data ".$e]);
      }
    }
    public function selectElement(string $query, array $data){
      try{
        $in=$this->pdo->prepare($query);
        foreach($data as $k=>$v){
          $in->bindValue(":$k",$v);
        }
        $in->execute();
        $result=$in->fetchAll(PDO::FETCH_ASSOC);
        return ["data"=>$result];
      }catch(PDOException $e){
        return ["data"=>[$e->getMessage()]];
      }
    }

    public function delete(string $query , array $data){
      try{
        $in=$this->pdo->prepare($query);
        foreach($data as $k=>$v){
          $in->bindValue(":$k",$v);
        }
        $in->execute();
      }catch(PDOException $e){
        echo "Field To Delete Data";
      }
    }
    public function getLastId(){
      return $this->pdo->lastInsertId();
    }

    public  function __destruct()
    {
      $this->pdo=null;
    }
  }

