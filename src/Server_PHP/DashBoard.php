<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin");
    header("Content-Type: application/json; charset=UTF-8");

 class DashboardAPI{
    private $pdo;
    private $username;

    public function __construct($username) {
        $this->username = $username;
        $this->connectDB();
    }

    private function connectDB(){
        try{
            require_once "Server.php";
            $this->pdo = $pdo;
        }catch(PDOException $e){
            $this->sendResponse(array("success" => false, "message" => "Connect fail: " .$e->getMessage(), "status" => 500),500);
            exit;
        }
    }

    public function getData(){
        if($this->username){
            $this->fetchData();
        }else{
            $this->sendResponse(array("message" => "username required", "status" => 400), 400);
        }
    }

    private function fetchData(){
        try{        
            $getdata = $this->pdo->prepare("SELECT * FROM dashboard WHERE username = :username");
            $getdata->bindParam(":username", $this->username);
            $getdata->execute();
            $data = $getdata->fetch(PDO::FETCH_ASSOC);
    
            $this->sendResponse(array(
                "data" => $data,
                "status" => 200,
            ),200);
        }catch (PDOException $e) {
            this->sendResponse(array("success" => false, "message" => "Connection failed: " . $e->getMessage()),400);
        }finally{
            $this->pdo = null;
        }
    }

    private function sendResponse($response, $status){
        //http_response_code($status);
        echo json_encode($response);
    }
 }
 session_start();
 $username = $_GET['username'] ?? null;
 $api = new DashboardAPI($username);
 $api->getData();
?>