import { Text, ScrollView, View } from 'react-native'
import InputBox from '../components/InputBox'
import CustomButton from '../components/CustomButton'
import { Colors } from '../color'
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import React from 'react'

const SignupScreen = () => {
    return (

        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <ChevronLeftIcon color={Colors.BLACK} style={{}}></ChevronLeftIcon>
                <Text style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "600" }}>Create Account</Text>
                <View></View>
            </View>

            <Text style={{ color: Colors.GREY_4A, marginHorizontal: '10%' }}>Fill in the required details and click Proceed</Text>
            <InputBox placeholder="Enter Your Email"></InputBox>
            <InputBox placeholder="Enter Your Name"></InputBox>
            <InputBox placeholder="Enter Password" secureTextEntry={true}></InputBox>

            <Text style={{ color: Colors.GREY_4A, marginHorizontal: '10%', marginVertical: '5%' }} >By creating Account, you are automatically accepting all the Terms & Conditions related to TechBPIT</Text>
            <CustomButton title="Proceed" onPress={signup}></CustomButton>
        </ScrollView>

    )
}

function signup() {
    console.log("signup")
}

export default SignupScreen