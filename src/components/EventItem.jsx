import {View, Text} from 'react-native';
import React from 'react';
import {Colors} from '../colors';
import {dateStringToDDMMM} from '../Utils/DateTimeUtils';

const EventItem = ({itemData}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: '5%',
        marginVertical: 10,
        height: 70,
        flexWrap: 'wrap',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          borderWidth: 3,
          borderColor: Colors.BLACK,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: '800', color: Colors.BLACK}}>Start:</Text>
        <Text style={{fontWeight: '800', color: Colors.BLACK}}>
          {itemData.eventTime}
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
          alignItems: 'flex-start',
        }}>
        <Text>
          <Text style={{color: Colors.BLACK, fontWeight: '800'}}>
            Event Name:
          </Text>
          <Text style={{color: Colors.GREEN, fontWeight: '800'}}>
            {itemData.topic}
          </Text>
        </Text>
        <Text>
          <Text style={{color: Colors.BLACK, fontWeight: '800'}}>
            Community:
          </Text>
          <Text style={{color: Colors.GREEN, fontWeight: '800'}}>
            {itemData.groupId.groupName}
          </Text>
        </Text>
        <Text>
          <Text style={{color: Colors.BLACK, fontWeight: '800'}}>
            Location:
          </Text>
          <Text style={{color: Colors.GREEN, fontWeight: '800'}}>
            {itemData.mode === 'Online' ? 'Online' : itemData.venue}
          </Text>
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
        <Text style={{color: Colors.WHITE, fontWeight: 600}}>
          {dateStringToDDMMM(itemData.eventDate)}
        </Text>
      </View>
    </View>
  );
};

export default EventItem;
