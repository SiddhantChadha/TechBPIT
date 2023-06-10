import {ScrollView, Text, View} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {Colors} from '../colors';
import CustomButton from '../components/CustomButton';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import React, {useRef, useContext, useState} from 'react';
import {LoggedInContext} from '../context/LoggedInContext';
import {setAuthTokens, setSelfId} from '../EncryptedStorageHelper';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';
import {roundToNearestPixel} from 'nativewind';

const OTPScreen = ({navigation, route}) => {
  const [code, setCode] = useState('');
  const setIsLoggedIn = useContext(LoggedInContext);
  const [isApiCalling, setIsApiCalling] = useState(false);
  const {email} = route.params;

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_POST_VERIFY_OTP:
        setAuthTokens(data.access_token, data.refresh_token);
        setSelfId(data._id);
        setIsLoggedIn(true);
        setIsApiCalling(false);
        break;
      default:
        break;
    }
  };

  const onResponseFailed = (command, error) => {
    setIsApiCalling(false);
  };
  const verifyOTP = () => {
    setIsApiCalling(true);
    execute(
      REST_COMMANDS.REQ_POST_VERIFY_OTP,
      {
        email: email,
        otp: code,
      },
      onResponseReceived,
      onResponseFailed,
    );
  };
  return (
    <ScrollView>
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
          Verification
        </Text>
      </View>

      <Text
        style={{
          color: Colors.GREY_4A,
          marginHorizontal: '10%',
          textAlign: 'center',
        }}>
        Enter one time password sent to your Email Id for verification
      </Text>
      <SmoothPinCodeInput
        cellStyle={{
          borderWidth: 1,
          borderColor: Colors.BLACK,
          borderRadius: 5,
        }}
        codeLength={6}
        cellStyleFocused={{
          borderColor: Colors.PRIMARY_BLUE,
        }}
        restrictToNumbers={true}
        value={code}
        onTextChange={e => setCode(e)}
        containerStyle={{
          marginHorizontal: '10%',
          marginVertical: '5%',
          alignSelf: 'center',
        }}
      />

      {isApiCalling ? (
        <CustomButton title="Verifying user ..." />
      ) : (
        <CustomButton title="VERIFY OTP" onPress={() => verifyOTP()} />
      )}
    </ScrollView>
  );
};

export default OTPScreen;
