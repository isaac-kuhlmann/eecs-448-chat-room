<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

use MyApp\Chat;

    require dirname(__DIR__) . '/vendor/autoload.php';

    echo "Running Server\n";

    $server = IoServer::factory(
        new HttpServer(
            new WsServer(
                new Chat()
            )
        ),
        8080
    );

    $server->run();
?>