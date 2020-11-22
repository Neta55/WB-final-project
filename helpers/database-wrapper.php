<?php

// namespace DB;

// use mysqli;

class DB
{
  private static $connection;
  private static $dbname = "todo";

  private static function openConnection()
  {
    $dbhost = "localhost:3306";
    $dbuser = "root";
    $dbpass = "";

    static::$connection = new mysqli($dbhost, $dbuser, $dbpass, static::$dbname);
    // static::$connection = new mysqli($dbhost, $dbuser, $dbpass, static::$dbname);

    if (static::$connection->connect_error) {
      die("Connection failed: " .
        static::$connection->connect_error);
    }
  }

  private static function closeConnection()
  {
    static::$connection->close();
    static::$connection = null;
  }

  public static function run($sql)
  {
    if (!static::$connection) {
      static::openConnection();
    }

    $response = static::$connection->query($sql);

    if ($response === TRUE) {
      $response = static::$connection->insert_id;
    }

    if (static::$connection->error) {
      die("SQL error: " . static::$connection->error . "</br>");
    } else {
      return $response;
    }

    static::closeConnection();
  }

  public static function getArrayResult($sql)
  {
    $response = self::run($sql);;
    $response = $response->num_rows > 0 ? $response->fetch_all(MYSQLI_ASSOC) : [];

    return json_encode($response);
  }

  public static function setDbName($dbname)
  {
    static::$dbname = $dbname;
  }
}
