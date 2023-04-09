import { View, ScrollView, Text } from 'react-native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import React, { useState } from 'react'
import { Colors } from '../color';
import CustomButton from '../components/CustomButton';
import { ChevronLeftIcon } from "react-native-heroicons/outline";


const OTPScreen = ({navigation}) => {

    const [code, setCode] = useState("");

    return (
        <ScrollView>

             <View style={{ flex:1 , justifyContent: 'center', marginVertical:24 }}>
                <ChevronLeftIcon color={Colors.BLACK} style={{position: 'absolute'}} onPress={() => navigation.goBack()}></ChevronLeftIcon>
                <Text style={{ color: Colors.BLACK, fontSize: 18, fontWeight: "600", alignSelf:"center", marginHorizontal:"20%" }}>Verification</Text>
            </View>

            <Text style={{ color: Colors.GREY_4A, marginHorizontal: '10%', textAlign:'center' }}>Enter one time password sent to your Email Id for verification</Text>
            <SmoothPinCodeInput
                cellStyle={{
                    borderWidth: 1,
                    borderColor: Colors.BLACK,
                    borderRadius: 5
                }}
                codeLength={6}
                cellStyleFocused={{
                    borderColor: Colors.PRIMARY_BLUE,
                }}
                restrictToNumbers={true}
                value={code}
                onTextChange={e => setCode(e)}
                containerStyle={{ marginHorizontal: '10%', marginVertical: '5%', alignSelf: "center" }}
            />

            <CustomButton title="VERIFY CODE"></CustomButton>
        </ScrollView>
    )
}

export default OTPScreen