<?php
include_once './constants.php';

class Database {
    private $Constants = null;
    private $host = '';
    private $db_name = '';
    private $username = '';
    private $password = '';
    public $connection;

    private function initialize() {
        $this->Constants = new Constants();
        $this->host = $this->Constants->host;
        $this->db_name = $this->Constants->db_name;
        $this->username = $this->Constants->db_username;
        $this->password = $this->Constants->db_password;
    }
    public function getConnection() {
        $this->initialize();

        $this->connection = mysqli_connect($this->host, $this->username, $this->password, $this->db_name);

        if ($this->connection === false) {
            die("ERROR: Could not connect. " . mysqli_connect_error());
        }

        return $this->connection;
    }
}

?>