import { Text, ScrollView, View } from 'react-native'
import React from 'react'
import InputBox from '../components/InputBox'
import CustomButton from '../components/CustomButton'
import { Colors } from '../color'

const LoginScreen = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View >
                <Text style={{ color: Colors.BLACK, fontSize: 16 ,textAlign:"center", marginVertical:10,fontWeight:"600"}}>Login</Text>
            </View>
            <Text style={{ color: Colors.GREY_4A, marginHorizontal: '10%' }}>Type in your Email ID and Password and click Go to Feed</Text>
            <InputBox placeholder="Email"></InputBox>
            <InputBox placeholder="Password" secureTextEntry={true}></InputBox>
            <CustomButton title="Go to Feed" onPress={login}></CustomButton>
        </ScrollView>
    )
}

function login() {
    console.log("login clicked")
}

export default LoginScreen