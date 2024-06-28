<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin");
    header("Content-Type: application/json; charset=UTF-8");

    class registerAPI {
        private $data;
        private $pdo;

        public function __construct($data){
            $this->data = $data;
            $this->connectDB();
        }

        private function connectDB(){
            try{
                require_once "Server.php";
                $this->pdo = $pdo;
            }catch(PDOException $e){
                $this->sendResponse(array("success" => false, "message" => "Connection failed:" . $e->getMessage()),500);
            }
        }

        private function validateInput(){
            return isset($this->data->username) && isset($this->data->password) && isset($this->data->Feburary) && isset($this->data->March) && isset($this->data->April);
        }

        public function RegisterUser(){
            if ($this->validateInput()) {
                $this->saveUser();
            } else {
                $this->sendResponse(array("success" => false, "message" => "Missing username or password or other data", "status" => 400));
            }
        }

        private function saveUser(){
            try {
                $username = $this->data->username;
                $password = $this->data->password;
                $Feb = $this->data->Feburary;
                $Mar = $this->data->March;
                $April = $this->data->April;
    
                $check_data1 = $this->pdo->prepare("SELECT * FROM user WHERE username = :username");
                $check_data1->bindParam(":username", $username);
                $check_data1->execute();
                $row1 = $check_data1->fetch(PDO::FETCH_ASSOC);
    
                if($row1){
                    $this->sendResponse(array("message" => "Username already exists", "status" => 400));
                } else {
                    $role = "user";
    
                    $stmt = $this->pdo->prepare("INSERT INTO user (username, password, role) VALUES (:username, :password, :role)");
                    $stmt->bindParam(":username", $username);
                    $stmt->bindParam(":password", $password);
                    $stmt->bindParam(":role", $role);
                    $stmt->execute();
    
                    $stmt = $this->pdo->prepare("INSERT INTO dashboard (username, Feburary, March, April) VALUES (:username, :feb, :mar, :april)");
                    $stmt->bindParam(":username", $username);
                    $stmt->bindParam(":feb", $Feb);
                    $stmt->bindParam(":mar", $Mar);
                    $stmt->bindParam(":april", $April);
                    $stmt->execute();
    
                    $this->sendResponse(array("message" => "Create Successfuly", "status" => 201));
                }
            } catch (PDOException $e) {
                $this->sendResponse(array("message" => "Failed to register user", "error" => $e->getMessage(), "status" => 400));
            }
        }
    
        private function sendResponse($response) {
            //http_response_code($response['status']);
            echo json_encode($response);
        }

    }

    $data = json_decode(file_get_contents("php://input"));
    
    session_start();
    if($data){
        $api = new registerAPI($data);
        $api->RegisterUser();
    }
?>