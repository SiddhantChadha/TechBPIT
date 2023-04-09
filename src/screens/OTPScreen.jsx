import { ScrollView, Text } from 'react-native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import React, { useState } from 'react'
import { Colors } from '../color';
import CustomButton from '../components/CustomButton';


const OTPScreen = () => {

    const [code, setCode] = useState("");

    return (
        <ScrollView>

            <Text style={{ color: Colors.GREY_4A, marginHorizontal: '10%' }}>Enter one time password sent to your Email Id for verification</Text>
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
                value={code}
                onTextChange={e => setCode(e)}
                containerStyle={{ marginHorizontal: '10%', marginVertical: '5%', alignSelf: "center" }}
            />

            <CustomButton title="VERIFY CODE"></CustomButton>
        </ScrollView>
    )
}

export default OTPScreen