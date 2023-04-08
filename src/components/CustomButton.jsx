import { Button, View } from 'react-native'
import React from 'react'
import { Colors } from '../color'
import { TouchableOpacity } from 'react-native'


const CustomButton = (props) => {
  return (

    <View style={{ marginHorizontal: '10%', borderRadius: 50 }}>
      <Button onPress={props.onClick} title={props.title} color={Colors.PRIMARY_BLUE} />
    </View>

  )
}

export default CustomButton