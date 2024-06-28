<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin");
    header("Content-Type: application/json; charset=UTF-8");
    
    global $data;

    class UserAPI {
        private $pdo;
        private $data;
    
        public function __construct($data){
            require_once "Server.php";
            $this->pdo = $pdo;
            $this->data = $data;
        }
    
        public function handleRequest(){
            $method = $_SERVER['REQUEST_METHOD'];
            switch($method){
                case 'GET':
                    $this->handleGetRequest();
                    break;
                case 'POST':
                    $this->handlePostRequest();
                    break;
                case 'PUT':
                    $this->handlePutRequest();
                    break;
                case 'DELETE':
                    $this->handleDeleteRequest();
                    break;
                default:
                    $this->sendResponse("Invalid Method", 405);
                    break;
            }
        }
    
        private function handleGetRequest(){
            try {
                if (!isset($_GET['username'])) {
                    $sql = "SELECT * FROM user";
                    $stmt = $this->pdo->prepare($sql);
                    $stmt->execute();
                    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    $sql2 = "SELECT * FROM dashboard";
                    $stmt2 = $this->pdo->prepare($sql2);
                    $stmt2->execute();
                    $dashboards = $stmt2->fetchAll(PDO::FETCH_ASSOC);
                    
                    $response = array(
                        "message" => "Successfully",
                        "data" => array("user" => $users, "dashboard" => $dashboards),
                        "status" => 200
                    );
                } else {
                    $username = $_GET['username'];
                    $sql = "SELECT * FROM user WHERE username = :username";
                    $stmt = $this->pdo->prepare($sql);
                    $stmt->bindParam(":username", $username);
                    $stmt->execute();
                    $userData = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    $sql2 = "SELECT * FROM dashboard WHERE username = :username";
                    $stmt2 = $this->pdo->prepare($sql2);
                    $stmt2->bindParam(":username", $username);
                    $stmt2->execute();
                    $dashboardData = $stmt2->fetchAll(PDO::FETCH_ASSOC);
                    
                    $response = array(
                        "message" => "Successfully",
                        "data" => array("user" => $userData, "dashboard" => $dashboardData),
                        "status" => 200
                    );
                }
                $this->sendResponse($response, 200);
            } catch (PDOException $e) {
                $this->sendResponse(array("message" => $e->getMessage(), "status" => 400), 400);
            }
        }
    
        private function handlePostRequest(){
            try {
                if(isset($this->data->username) && isset($this->data->password) && isset($this->data->role) && isset($this->data->Feburary) && isset($this->data->March) && isset($this->data->March) && isset($this->data->April)&& $this->data){
                    $username = $this->data->username;
                    $password = $this->data->password;
                    $role = $this->data->role;
                    $Feb = $this->data->Feburary;
                    $Mar = $this->data->March;
                    $April = $this->data->April;
    
                    $checkdata = $this->pdo->prepare("SELECT * FROM user WHERE username = :username");
                    $checkdata->bindParam(":username", $username);
                    $checkdata->execute();
                    $row = $checkdata->fetch(PDO::FETCH_ASSOC);
                    
                    if(!$row){
                        $stmt = $this->pdo->prepare("INSERT INTO user (username, password, role) VALUE(:username, :password, :role)");
                        $stmt->bindParam(":username", $username);
                        $stmt->bindParam(":password", $password);
                        $stmt->bindParam(":role", $role);
                        $stmt->execute();
    
                        $stmt2 = $this->pdo->prepare("INSERT INTO dashboard (username, Feburary, March, April) VALUE(:username, :Feb, :Mar, :April)");
                        $stmt2->bindParam(":username", $username);
                        $stmt2->bindParam(":Feb" , $Feb);
                        $stmt2->bindParam(":Mar", $Mar);
                        $stmt2->bindParam(":April", $April);
                        $stmt2->execute();
    
                        $response = array("message" => "Add complete", "status" => 201);
                    } else {
                        $response = array("message" => "Username already exists", "status" => 400);
                    }
                } else {
                    $response = array("message" => "Please fill all details", "status" => 400);
                }
                $this->sendResponse($response, 201);
            } catch(PDOException $e) {
                $this->sendResponse(array("message" => $e, "status" => 400), 400);
            }
        }
    
        private function handlePutRequest(){
            try{
                if(isset($this->data->id) && isset($this->data->username) && isset($this->data->password) && isset($this->data->role) && isset($this->data->Feburary) && isset($this->data->March) && isset($this->data->March) && isset($this->data->April) && $this->data){
                    $id = $this->data->id;
                    $username = $this->data->username;
                    $password = $this->data->password;
                    $role = $this->data->role;
                    $Feb = $this->data->Feburary;
                    $Mar = $this->data->March;
                    $April = $this->data->April;
                    $checkdata = $this->pdo->prepare("SELECT * FROM user WHERE id = :id");
                    $checkdata->bindParam(":id", $id);
                    $checkdata->execute();
                    $row = $checkdata->fetch(PDO::FETCH_ASSOC);
                    if($row){
                        $stmt = $this->pdo->prepare("UPDATE user SET username = :username, password = :password, role = :role WHERE id = :id");
                        $stmt->bindParam(":id", $id);
                        $stmt->bindParam(":username", $username);
                        $stmt->bindParam(":password", $password);
                        $stmt->bindParam(":role", $role);
                        $stmt->execute();

                        $stmt2 = $this->pdo->prepare("UPDATE dashboard SET username = :username, Feburary = :Feb, March = :Mar, April = :April WHERE id = :id");
                        $stmt2->bindParam(":id", $id);
                        $stmt2->bindParam(":username", $username);
                        $stmt2->bindParam(":Feb" , $Feb);
                        $stmt2->bindParam(":Mar", $Mar);
                        $stmt2->bindParam(":April", $April);
                        $stmt2->execute();

                        $this->sendResponse(array(
                            "message" => "Update complete",
                            "status" => 200,
                        ),200);
                    }else{
                        $this->sendResponse(array(
                            "message" => "User not found",
                            "status" => 400,
                        ),401);
                    }
                }else{
                    $this->sendResponse(array(
                        "message" => "Please fill all detail",
                        "status" => 400,
                    ),402);
                }
            }catch(PDOException $e){
                $this->sendResponse(array("message" => $e, "status" => 400), 403);
            }
        }
    
        private function handleDeleteRequest(){
            try{
                if($this->data){
                    $id = $this->data->id;
                    $stmt = $this->pdo->prepare("DELETE FROM user WHERE id = :id");
                    $stmt->bindParam(":id", $id);
                    $stmt->execute();

                    $stmt2 = $this->pdo->prepare("DELETE FROM dashboard WHERE id = :id");
                    $stmt2->bindParam(":id", $id);
                    $stmt2->execute();
                    
                    $this->sendResponse(array(
                        "message" => "Delete Complete",
                        "status" => 200,
                    ),200);
                }else{
                    $this->sendResponse(array(
                        "message" => "Please send me a Id.",
                        "status" => 400,
                    ),400);
                }
            }catch(PDOException $e){
                $this->sendResponse(array(
                    "message" => $e,
                    "status" => 400,
                ),400);
            }
        }
    
        private function sendResponse($response, $status) {
            //http_response_code($status);
            echo json_encode($response);
        }
    }
    
    $method = $_SERVER['REQUEST_METHOD'];
    $data = null;
    if ($method != "GET") {
        $data = json_decode(file_get_contents("php://input"));
    }

    session_start();
    $api = new UserAPI($data);
    $api->handleRequest();

?>