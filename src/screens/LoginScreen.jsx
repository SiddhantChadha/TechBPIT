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
import CustomTopBar from '../components/CustomTopBar';

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
    setIsLoggedIn(true);
    // navigation.navigate('Home');
  };

  const onResponseFailed = () => {};

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CustomTopBar
        navigation={navigation}
        title={'Login'}
        showBackButton={true}
      />
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
