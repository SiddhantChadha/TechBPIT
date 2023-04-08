import { Text, ScrollView, View } from 'react-native'
import React from 'react'
import InputBox from '../components/InputBox'
import CustomButton from '../components/CustomButton'
import { Colors } from '../color'
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const LoginScreen = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            
            <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <ChevronLeftIcon color={Colors.BLACK} style={{}}></ChevronLeftIcon>
                <Text style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "600" }}>Login</Text>
                <View></View>
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