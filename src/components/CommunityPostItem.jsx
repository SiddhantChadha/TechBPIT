import {StyleSheet, View, Text, Image} from 'react-native';
import React from 'react';
import {Colors} from '../colors';

const CommunityPostItem = () => {
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
            uri: 'https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png',
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
            Tushar Jain
          </Text>
          <Text style={{fontSize: 10, color: Colors.GREY_70}}>7 mins ago</Text>
        </View>
      </View>
      <Image
        source={{
          uri: 'https://png.pngtree.com/png-clipart/20220709/ourmid/pngtree-book-color-open-book-stack-books-png-image_5836804.png',
        }}
        style={{
          width: '90%',
          aspectRatio: '1',
          marginTop: 8,
          alignSelf: 'center',
        }}
        resizeMethod="scale"
      />
      <Text
        style={{
          fontSize: 16,
          color: Colors.BLACK,
          marginTop: 16,
          marginBottom: 20,
          marginHorizontal: '5%',
        }}>
        We are tryinh to build a platform strnger than twitter. Also, we don't
        charge $8 a month
      </Text>
    </View>
  );
};
export default CommunityPostItem;
