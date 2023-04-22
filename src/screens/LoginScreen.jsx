import {ScrollView, Text, View} from 'react-native';
import React, {useRef, useContext} from 'react';
import InputBox from '../components/InputBox';
import CustomButton from '../components/CustomButton';
import {Colors} from '../colors';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {
  SEND_LOGIN_REQUEST,
  postLoginRequest,
} from '../APIController/controller';
import {LoggedInContext} from '../context/LoggedInContext';

const LoginScreen = ({navigation}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const setIsLoggedIn = useContext(LoggedInContext);
  const login = () => {
    postLoginRequest(
      emailRef.current.getData(),
      passwordRef.current.getData(),
      onResponseReceived,
    );
  };

  const onResponseReceived = data => {
    console.log(data);
    setIsLoggedIn(true);
    // navigation.navigate('Home');
  };

  const onResponseFailed = () => {};

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, justifyContent: 'center', marginVertical: 24}}>
        <ChevronLeftIcon
          color={Colors.BLACK}
          style={{position: 'absolute'}}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            color: Colors.BLACK,
            fontSize: 18,
            fontWeight: '600',
            alignSelf: 'center',
            marginHorizontal: '20%',
          }}>
          Login
        </Text>
      </View>
      <Text
        style={{
          color: Colors.GREY_4A,
          marginHorizontal: '10%',
          marginTop: 36,
          textAlign: 'center',
        }}>
        Type in your Email ID and Password and click Go to Feed
      </Text>
      <InputBox placeholder="Email" ref={emailRef} />
      <InputBox
        placeholder="Password"
        secureTextEntry={true}
        ref={passwordRef}
      />
      <CustomButton title="Go to Feed" onPress={() => login()} />
    </ScrollView>
  );
};

export default LoginScreen;
