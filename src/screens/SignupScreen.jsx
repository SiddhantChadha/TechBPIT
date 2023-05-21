import {ScrollView, Text, View} from 'react-native';
import InputBox from '../components/InputBox';
import CustomButton from '../components/CustomButton';
import {Colors} from '../colors';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import React from 'react';
import CustomTopBar from '../components/CustomTopBar';

const SignupScreen = ({navigation}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <View style={{flex: 1, justifyContent: 'center', marginVertical: 24}}>
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
          Signup
        </Text>
      </View> */}

      <CustomTopBar navigation={navigation} title={'Signup'} />

      <Text className="text-grey_4a mx-10 text-center">
        Fill in the required details and click Proceed
      </Text>
      <InputBox placeholder="Enter Your Email" />
      <InputBox placeholder="Enter Your Name" />
      <InputBox placeholder="Enter Password" secureTextEntry={true} />

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
      <CustomButton
        title="Proceed"
        onPress={() => navigation.navigate('Otp')}
      />
    </ScrollView>
  );
};

function signup() {}

export default SignupScreen;
