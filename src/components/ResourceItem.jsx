import {Image, View, Text} from 'react-native';
import React from 'react';
import {ChevronDownIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';

const ResourceItem = ({itemData}) => {
  return (
    <View
      style={{
        borderRadius: 20,
        marginVertical: 12,
        marginHorizontal: '5%',
        elevation: 3,
        backgroundColor: Colors.WHITE,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
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
            flexShrink: 1,
            justifyContent: 'center',
            marginHorizontal: '3%',
          }}>
          <Text style={{fontSize: 16, fontWeight: 500, color: Colors.BLACK}}>
            A new resource was added to {itemData.groupId.groupName} community
          </Text>
          <Text style={{fontSize: 10, color: Colors.GREY_70}}>
            {itemData.resourceTime} read time
          </Text>
        </View>
        <ChevronDownIcon
          color={Colors.BLACK}
          style={{marginRight: '3%', alignSelf: 'flex-start'}}
        />
      </View>
      <Image
        source={{
          uri: itemData.imageUrl
            ? itemData.imageUrl
            : 'https://static.toiimg.com/photo/msid-91006178/91006178.jpg',
        }}
        style={{
          width: '100%',
          aspectRatio: '1',
          marginTop: 8,
          alignSelf: 'center',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        resizeMethod="scale"
      />
    </View>
  );
};

export default ResourceItem;
