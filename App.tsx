import React, { useEffect, useState } from "react";
import {
  Spinner,
  Container,
  Button,
  Icon,
  Header,
  Left,
  Body,
  Right,
  Content,
  Footer,
  FooterTab,
  Title,
} from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
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
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Chat app</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon type="FontAwesome" name="plus" />
          </Button>
        </Right>
      </Header>
      <Content>
        <ChatClient />
      </Content>
      {/* <Button>
            <Text>Test button</Text>
          </Button> */}
      <Footer>
        <FooterTab>
          <Button full>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default App;
