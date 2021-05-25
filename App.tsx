import React, { useEffect, useState } from "react";
import {
  Spinner,
  Container,
  Header,
  Body,
  Title,
  Left,
  Right,
} from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Platform, KeyboardAvoidingView } from "react-native";
import ChatClient from "./ChatClient";

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });
      setIsReady(true);
    })();
  }, []);

  if (!isReady) {
    return <Spinner />;
  }

  return (
    <Container>
      <Header>
        <Left></Left>
        <Body>
          <Title>Messenger</Title>
        </Body>
        <Right></Right>
      </Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ChatClient />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default App;
