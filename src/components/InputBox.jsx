import {TextInput} from 'react-native'
import React, {useState} from 'react'

const InputBox = (props) => {

    const [data, setData] = useState("");


    return (
        <TextInput value={data} onChangeText={setData}
                   style={{
                       marginHorizontal: '10%',
                       marginVertical: '5%',
                       borderWidth: 1,
                       borderRadius: 10,
                       paddingHorizontal: '4%'
                   }}
                   placeholder={props.placeholder} secureTextEntry={props.secureTextEntry}>
        </TextInput>
    )
}

export default InputBox