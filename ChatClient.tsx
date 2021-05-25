import React, { useEffect, useRef, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Text, Button, Input, Form, Icon } from "native-base";
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

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSend = () => {
    socket.emit("chat message", message);
    setMessage("");
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View
          style={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 8 }}
        >
          {messages.length === 0 && (
            <View
              style={{
                alignItems: "center",
                padding: 8,
                marginVertical: 16,
                backgroundColor: "#ffffff",
              }}
            >
              <Text style={{ color: "#999" }}>No messages yet...</Text>
            </View>
          )}
          {messages.map((item) => (
            <View
              style={{
                padding: 8,
                marginVertical: 8,
                borderStyle: "solid",
                borderColor: "#efefef",
                borderWidth: 1,
                borderRadius: 6,
                backgroundColor: "#fafafa",
              }}
            >
              <Text style={{ color: "#333" }}>{item}</Text>
            </View>
          ))}
        </View>
      </TouchableWithoutFeedback>

      <Form
        style={{
          paddingHorizontal: 4,
          borderStyle: "solid",
          borderColor: "#efefef",
          borderWidth: 1,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Input
            placeholder="Type message here"
            value={message}
            onChangeText={(value) => setMessage(value)}
          />
          <Button transparent onPress={handleSend}>
            <Icon name="send" />
          </Button>
        </View>
      </Form>
    </View>
  );
};

export default ChatClient;
