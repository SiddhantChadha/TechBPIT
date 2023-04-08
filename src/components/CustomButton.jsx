import { Button, View } from 'react-native'
import React from 'react'
import { Colors } from '../color'



const CustomButton = (props) => {
  return (

    <View style={{ marginHorizontal: '10%', borderRadius: 50 }}>
      <Button onPress={props.onPress} title={props.title} color={Colors.PRIMARY_BLUE} />
    </View>

  )
}

export default CustomButton