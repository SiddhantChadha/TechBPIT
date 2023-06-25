import {View, Text, Image} from 'react-native';
import React from 'react';
import {Colors} from '../colors';
import {dateStringToDDMMM, dateStringToTime} from '../Utils/DateTimeUtils';

const EventPostItem = ({itemData}) => {
  return (
    <View
      style={{
        borderRadius: 20,
        marginVertical: 12,
        marginHorizontal: '5%',
        elevation: 5,
        backgroundColor: Colors.WHITE,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 16,
          marginLeft: '5%',
        }}>
        <Image
          source={{
            uri: itemData.groupId.image,
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
          }}
          resizeMode="center"
        />
        <View
          style={{
            justifyContent: 'center',
            marginHorizontal: '5%',
            flexShrink: 1,
          }}>
          <Text style={{fontSize: 16, fontWeight: 500, color: Colors.BLACK}}>
            A new <Text style={{fontWeight: '800'}}>event </Text>
            was posted in the{' '}
            <Text style={{fontWeight: '800'}}>
              {itemData.groupId.groupName}{' '}
            </Text>
            Community
          </Text>
        </View>
      </View>
      <Image
        source={{
          uri: itemData.imageUrl
            ? itemData.imageUrl
            : 'https://img.freepik.com/free-vector/build-your-program-appointment-booking_23-2148552954.jpg?w=826&t=st=1681042949~exp=1681043549~hmac=5642bf72996ab22bba1fdf5ce173438e1930ec8bada0eba9fae2ae6d68cae6a0',
        }}
        style={{
          width: '90%',
          aspectRatio: '1',
          marginTop: 8,
          alignSelf: 'center',
        }}
        resizeMethod="scale"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 16,
          marginLeft: '5%',
        }}>
        <Text
          style={{
            fontSize: 24,
            color: Colors.BLACK,
            marginTop: 16,
            marginBottom: 20,
            marginHorizontal: '5%',
            fontWeight: '500',
          }}>
          <Text style={{color: Colors.PRIMARY_BLUE}}>
            {dateStringToDDMMM(itemData.eventDate)}
          </Text>
        </Text>
        <View>
          <Text style={{color: Colors.BLACK, fontSize: 16, fontWeight: '600'}}>
            {itemData.mode === 'online' ? 'Online Meeting' : itemData.venue}
          </Text>
          <Text>{dateStringToTime(itemData.eventTime)} Onwards</Text>
        </View>
      </View>
    </View>
  );
};

export default EventPostItem;
