import { Text, ScrollView, View } from 'react-native'
import React from 'react'
import InputBox from '../components/InputBox'
import CustomButton from '../components/CustomButton'
import { Colors } from '../color'
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const LoginScreen = ({navigation}) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex:1 , justifyContent: 'center', marginVertical:24 }}>
                <ChevronLeftIcon color={Colors.BLACK} style={{position: 'absolute'}} onPress={() => navigation.goBack()}></ChevronLeftIcon>
                <Text style={{ color: Colors.BLACK, fontSize: 18, fontWeight: "600", alignSelf:"center", marginHorizontal:"20%" }}>Login</Text>
            </View>
            <Text style={{ color: Colors.GREY_4A, marginHorizontal: '10%', marginTop:36 }}>Type in your Email ID and Password and click Go to Feed</Text>
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