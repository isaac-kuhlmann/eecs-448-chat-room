<?php
    namespace MyApp;
    use Ratchet\MessageComponentInterface;
    use Ratchet\ConnectionInterface;

    class Chat implements MessageComponentInterface {
        protected $users;

        public function __construct() {
            $this->users = new \SplObjectStorage;

        }

        public function onOpen(ConnectionInterface $conn) {
            //When first http is called, save the connection to use later
            $this->users->attach($conn);

            echo "New connection! ({$conn->resourceId})\n";
        }

        public function onMessage(ConnectionInterface $from, $msg) {
            $numOtherUsers = count($this->users) - 1;
            echo sprintf('Connection %d sending message "%s" to %d other connections%s' . "\n", $from->resourceId, $msg, $numOtherUsers, $numOtherUsers > 1 ? '' : 's');

            foreach ($this->users as $user) {
                if ($from !== $user) {
                    $user->send($msg);
                }
            }
        }

        public function onClose(ConnectionInterface $conn) {
            //detach the connection on close
            $this->users->detach($conn);

            echo "Connection {$conn->resourceId} has disconnected\n";
        }

        public function onError(ConnectionInterface $conn, \Exception $e) {
            echo "An error has occurred: {$e->getMessage()}\n";

            $conn->close();
        }
    }
?>
