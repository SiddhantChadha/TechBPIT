import { StatusBar, ScrollView, Text } from "react-native";
import React from "react";
import Logo from "../assets/images/ic_bpitlogo.svg";
import { Colors } from "../colors.js";
import CustomButton from "../components/CustomButton";

const WelcomeScreen = ({navigation}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={Colors.PRIMARY_BLUE}
      />

      <Logo
        style={{
          marginTop: 80,
          alignSelf: "center",
        }}
      />
      <Text
        style={{
          textAlign: "center",
          color: Colors.BLACK,
          fontSize: 48,
          fontWeight: 700,
          padding: 8,
          marginTop: 32,
        }}
      >
        TechBPIT
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: Colors.GREY_4A,
          fontSize: 16,
          padding: 16,
          marginTop: 32,
        }}
      >
        TechBPIT is a platform that promotes community driven learning
      </Text>

      <CustomButton title="Login" onPress={() =>
        navigation.navigate('Login')
      }></CustomButton>
      <Text
        style={{
          textAlign: "center",
          color: Colors.PRIMARY_BLUE,
          fontSize: 16,
          fontWeight: 500,
          marginTop: 60,
          marginBottom: 32,
        }}
      >
        Create New Account
      </Text>
    </ScrollView>
  );
};

export default WelcomeScreen;
