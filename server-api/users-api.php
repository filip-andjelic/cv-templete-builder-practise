<?php
include_once './constants.php';
include_once './database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json; charset=utf-8");

class UsersApi
{
    private $Constants = null;
    private $table_name = "";
    private $util = null;
    private $db = null;
    private $dbConnection = null;
    private $user = null;

    private function checkIfHttp($method)
    {
        if (!$method && !file_get_contents("php://input") && !$_GET) {
            return false;
        }
        if ($method == 'get' && (!$_GET || !$_GET['data'])) {
            return false;
        }
        if ($method == 'post' && !file_get_contents("php://input")) {
            return false;
        }

        return true;
    }

    public function getEntry($id, $connection)
    {
        $connection = $connection ? $connection : $this->db->getConnection();
        $query = "SELECT * FROM `$this->table_name` WHERE `id`='$id'";
        mysqli_set_charset($connection, "UTF8");

        if ($result = mysqli_query($connection, $query)) {
            $row = mysqli_fetch_assoc($result);

            mysqli_free_result($result);
            mysqli_close($connection);

            echo(json_encode([
                'successMessage' => 'SERVER_RESPONSE_SUCCESS',
                'action' => 'get-entry',
                'data' => [
                    'entry' => $row,
                ],
                'status' => 'OK'
            ]));

            return $row;
        }

        mysqli_close($connection);

        echo(json_encode([
            'successMessage' => 'SERVER_RESPONSE_INVALID_DATA',
            'action' => 'get-entry',
            'info' => 'Could not fetch entry with this ID.',
            'status' => 'OK'
        ]));

        return true;
    }

    private function createEntry($data)
    {
        if (!$data) return false;

        $this->db = new Database();
        $this->dbConnection = $this->dbConnection ? $this->dbConnection : $this->db->getConnection();
        $columns = "";
        $values = "";

        foreach ($data as $key => $value) {
            $columns .= "" . $key . ", ";

            if (!is_array($value)) {
                $values .= "'" . $value . "', ";
            } else {
                $values .= "'" . json_encode($value) . "', ";
            }
        }

        $columns .= "id, ";
        $values .= "NULL, ";
        $columns = substr_replace($columns, '', strlen($columns) - 2, 2);
        $values = substr_replace($values, '', strlen($values) - 2, 2);

        $createQuery = 'INSERT INTO `'.$this->table_name.'` ('.$columns.') VALUES ('.$values.')';

        mysqli_set_charset($this->dbConnection, "UTF8");

        // Create & send SQL query
        if ($createEntryResult = mysqli_query($this->dbConnection, $createQuery)) {
            $createdId = mysqli_insert_id($this->dbConnection);
            mysqli_free_result($createEntryResult);
            //mysqli_close($this->dbConnection);

            return $this->getEntry($createdId, $this->dbConnection);
        }

        echo(json_encode([
            'errorMessage' => 'SERVER_RESPONSE_INVALID_DATA',
            'action' => 'create-entry',
            'info' => 'Create entry request failed on DB communication.',
            'status' => 'OK'
        ]));

        return true;
    }

    public function listen()
    {
        $this->Constants = new Constants();
        $this->table_name = $this->Constants->users_table_name;
        $params = null;
        $userId = null;

        if ($this->checkIfHttp('post')) {
            $postRequestData = file_get_contents("php://input");
            $serializedPostData = json_decode($postRequestData, true);
            $dataObject = $serializedPostData['data'];
            $entryData = $dataObject['entryData'];
            $isUpdate = $dataObject['isUpdate'];

            if (!$entryData) {
                echo(json_encode([
                    'errorMessage' => 'SERVER_RESPONSE_LOGIN_FAILED',
                    'action' => 'login',
                    'info' => 'Missing e-mail or password values',
                    'entryData' => $entryData,
                    'status' => 'OK'
                ]));

                return true;
            }

            $this->db = new Database();
            $this->dbConnection = $this->db->getConnection();

            if ($isUpdate) {
                // @TODO Create UPDATE query
                $userId = $this->user['id'];
                $newToken = bin2hex(random_bytes(64));
                $dbQuery = "UPDATE `$this->users_table_name` SET `token` = '$newToken' WHERE `id` = '$userId'";
            } else {
                $this->createEntry($entryData);
            }
        }
    }
}

$listener = new UsersApi();
$listener->listen();
