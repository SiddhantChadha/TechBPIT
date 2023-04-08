import { TextInput } from 'react-native'
import React, { useState } from 'react'

const InputBox = () => {

    const [data, setData] = useState("");


    return (
        <TextInput value={data} onChangeText={setData} style={{}}></TextInput>
    )
}

export default InputBox