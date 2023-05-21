import {Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../colors';

const GroupMessage = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 8,
        margin: 8,
        alignSelf: 'flex-start',
        columnGap: 10,
        maxWidth: '60%',
      }}>
      <Text style={{color: Colors.BLACK, paddingVertical: 6}}>
        Hi bhai. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Mollitia vero assumenda, quos aperiam odit et autem ullam expedita
        dignissimos tenetur animi nihil reprehenderit molestiae quia minus? Odit
        cupiditate atque praesentium!s
      </Text>
      <Text style={{fontSize: 10, textAlignVertical: 'bottom'}}>16:41 pm</Text>
    </View>
  );
};

export default GroupMessage;
