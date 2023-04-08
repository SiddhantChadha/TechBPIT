import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import InputBox from '../components/InputBox'
import CustomButton from '../components/CustomButton'

const LoginScreen = () => {
    return (
        <ScrollView>
            <Text>Type in your Email ID and Password and click Go to Feed</Text>
            <InputBox></InputBox>
            <CustomButton title="Go to Feed" onClick={login}></CustomButton>
        </ScrollView>
    )
}

function login(){
    console.log("login clicked")
}

export default LoginScreen