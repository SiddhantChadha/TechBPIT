import { Button } from 'react-native'
import React from 'react'
import { PRIMARY_COLOR } from '../color'


const CustomButton = (props) => {
  return (
    <Button onPress={props.onClick} title={props.title} color={PRIMARY_COLOR} />
  )
}

export default CustomButton