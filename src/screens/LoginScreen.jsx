import {ScrollView, Text, View} from 'react-native';
import React, {useRef, useContext} from 'react';
import InputBox from '../components/InputBox';
import CustomButton from '../components/CustomButton';
import {Colors} from '../colors';
import {execute} from '../APIController/controller';
import {LoggedInContext} from '../context/LoggedInContext';
import CustomTopBar from '../components/CustomTopBar';
import {setAuthTokens} from '../EncryptedStorageHelper';
import {REST_COMMANDS} from '../APIController/RestCommands';

const LoginScreen = ({navigation}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const setIsLoggedIn = useContext(LoggedInContext);

  const onResponseReceived = (command, data) => {
    console.log('oasjdnf');
    switch (command) {
      case REST_COMMANDS.REQ_POST_LOGIN:
        setAuthTokens(data.access_token, data.refresh_token);
        setIsLoggedIn(true);
        break;
      default:
        break;
    }
  };

  const onResponseFailed = (command, error) => {};

  const login = () => {
    execute(
      REST_COMMANDS.REQ_POST_LOGIN,
      {
        email: emailRef.current.getData(),
        password: passwordRef.current.getData(),
      },
      onResponseReceived,
      onResponseFailed,
    );
  };

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
