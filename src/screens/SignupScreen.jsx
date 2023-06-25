import {ScrollView, Text, View} from 'react-native';
import InputBox from '../components/InputBox';
import CustomButton from '../components/CustomButton';
import {Colors} from '../colors';
import React, {useRef, useContext, useState} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import {LoggedInContext} from '../context/LoggedInContext';
import {setAuthTokens, setSelfId} from '../EncryptedStorageHelper';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';

const SignupScreen = ({navigation}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const enrollmentNumberRef = useRef();
  const setIsLoggedIn = useContext(LoggedInContext);
  const [isApiCalling, setIsApiCalling] = useState(false);

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_POST_SIGNUP:
        navigation.navigate('Otp', {email: emailRef.current.getData()});
        break;
      default:
        break;
    }
  };

  const onResponseFailed = (command, error) => {
    setIsApiCalling(false);
  };

  const signup = () => {
    setIsApiCalling(true);
    execute(
      REST_COMMANDS.REQ_POST_SIGNUP,
      {
        email: emailRef.current.getData(),
        password: passwordRef.current.getData(),
        username: usernameRef.current.getData(),
        enrollmentNumber: enrollmentNumberRef.current.getData(),
      },
      onResponseReceived,
      onResponseFailed,
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CustomTopBar
        navigation={navigation}
        title={'Signup'}
        showBackButton={true}
      />

      <Text className="text-grey_4a mx-10 text-center">
        Fill in the required details and click Proceed
      </Text>
      <InputBox placeholder="Enter Your Email" ref={emailRef} />
      <InputBox
        placeholder="Enter Your Enrollment number"
        ref={enrollmentNumberRef}
      />
      <InputBox placeholder="Enter Your Name" ref={usernameRef} />
      <InputBox
        placeholder="Enter Password"
        secureTextEntry={true}
        ref={passwordRef}
      />

      <Text
        style={{
          color: Colors.GREY_4A,
          marginHorizontal: '10%',
          marginVertical: '5%',
          textAlign: 'center',
        }}>
        By creating Account, you are automatically accepting all the Terms &
        Conditions related to TechBPIT
      </Text>
      {isApiCalling ? (
        <CustomButton title="Creating user ..." />
      ) : (
        <CustomButton title="Proceed" onPress={() => signup()} />
      )}
    </ScrollView>
  );
};

export default SignupScreen;
