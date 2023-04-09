import {ScrollView, Text, View} from 'react-native'
import InputBox from '../components/InputBox'
import CustomButton from '../components/CustomButton'
import {Colors} from '../color'
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import React from 'react'

const SignupScreen = ({navigation}) => {
    return (

        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{flex: 1, justifyContent: 'center', marginVertical: 24}}>
                <ChevronLeftIcon color={Colors.BLACK} style={{position: 'absolute'}}
                                 onPress={() => navigation.goBack()}></ChevronLeftIcon>
                <Text style={{
                    color: Colors.BLACK,
                    fontSize: 18,
                    fontWeight: "600",
                    alignSelf: "center",
                    marginHorizontal: "20%"
                }}>Signup</Text>
            </View>

            <Text style={{color: Colors.GREY_4A, marginHorizontal: '10%', textAlign: 'center'}}>Fill in the required
                details and click Proceed</Text>
            <InputBox placeholder="Enter Your Email"></InputBox>
            <InputBox placeholder="Enter Your Name"></InputBox>
            <InputBox placeholder="Enter Password" secureTextEntry={true}></InputBox>

            <Text style={{color: Colors.GREY_4A, marginHorizontal: '10%', marginVertical: '5%', textAlign: 'center'}}>By
                creating Account, you are automatically accepting all the Terms & Conditions related to TechBPIT</Text>
            <CustomButton title="Proceed" onPress={() => navigation.navigate('Otp')}></CustomButton>
        </ScrollView>

    )
}

function signup() {
    console.log("signup")
}

export default SignupScreen