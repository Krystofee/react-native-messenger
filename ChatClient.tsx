import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Text, Button, Card } from "native-base";
import io from "socket.io-client";

const ChatClient = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef<any>();
  const socket = socketRef.current;

  useEffect(() => {
    console.log("Connect!");
    const newSocket = io("http://192.168.0.186:3000");
    newSocket.on("chat message", (msg: string) => {
      setMessages((old) => [...old, msg]);
    });
    socketRef.current = newSocket;
  }, []);

  const handleSend = () => {
    socket.emit("chat message", "Test message!");
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <View>
      {messages.map((item) => (
        <Card>
          <Text>{item}</Text>
        </Card>
      ))}

      <Button onPress={handleSend}>
        <Text>Send</Text>
      </Button>

      <Button onPress={handleClear}>
        <Text>Clear</Text>
      </Button>
    </View>
  );
};

export default ChatClient;
