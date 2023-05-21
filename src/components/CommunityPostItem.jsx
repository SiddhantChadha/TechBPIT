import {StyleSheet, View, Text, Image} from 'react-native';
import React from 'react';
import {Colors} from '../colors';
import {timestampToAgoFormat} from '../Utils/DateTimeUtils';

const CommunityPostItem = props => {
  const itemData = props.itemData;
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
            marginHorizontal: '3%',
            flexShrink: 1,
          }}>
          <Text style={{fontSize: 16, fontWeight: 500, color: Colors.BLACK}}>
            {itemData.groupId.groupName}
          </Text>
          <Text style={{fontSize: 10, color: Colors.GREY_70}}>
            {timestampToAgoFormat(itemData.timestamp)}
          </Text>
        </View>
      </View>
      {itemData.imageUrl ? (
        <Image
          source={{
            uri: itemData.imageUrl,
          }}
          style={{
            width: '90%',
            aspectRatio: '1',
            marginTop: 8,
            alignSelf: 'center',
          }}
          resizeMethod="scale"
        />
      ) : null}

      <Text
        style={{
          fontSize: 16,
          color: Colors.BLACK,
          marginTop: 16,
          marginBottom: 20,
          marginHorizontal: '5%',
        }}>
        {itemData.description}
      </Text>
    </View>
  );
};
export default CommunityPostItem;
