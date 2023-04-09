import {View, Text} from 'react-native';
import React from 'react';
import {Colors} from '../colors';

const EventItem = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: '10%',
        marginVertical: 20,
        height: 70,
      }}>
      <View
        style={{
          flex: 1,
          borderWidth: 3,
          borderColor: Colors.BLACK,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>
          <Text style={{fontWeight: '800', color: Colors.BLACK}}>Start:</Text>
          <Text style={{fontWeight: '800', color: Colors.BLACK}}>1250 pm</Text>
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          borderWidth: 3,
          borderColor: Colors.BLACK,
          height: '100%',
          justifyContent: 'center',
          borderLeftWidth: 0,
          borderRightWidth: 0,
          alignItems: 'center',
        }}>
        <Text>
          <Text style={{color: Colors.BLACK, fontWeight: '800'}}>
            Event Name:
          </Text>
          <Text style={{color: Colors.GREEN, fontWeight: '800'}}>
            Test Topic
          </Text>
        </Text>
        <Text>
          <Text style={{color: Colors.BLACK, fontWeight: '800'}}>
            Community:
          </Text>
          <Text style={{color: Colors.GREEN, fontWeight: '800'}}>NodeJS</Text>
        </Text>
        <Text>
          <Text style={{color: Colors.BLACK, fontWeight: '800'}}>
            Location:
          </Text>
          <Text style={{color: Colors.GREEN, fontWeight: '800'}}>Online</Text>
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          borderWidth: 3,
          borderColor: Colors.BLACK,
          backgroundColor: Colors.GREEN,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: Colors.WHITE, fontWeight: 600}}>05 Jan</Text>
      </View>
    </View>
  );
};

export default EventItem;
