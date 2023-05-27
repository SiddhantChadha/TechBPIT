import {View, Text, Image, StyleSheet} from 'react-native';
import DoubleTick from '../assets/images/ic_double_tick.svg';
import React from 'react';
import {getColorCodeFromName} from '../Utils/NameToColorUtil';

export default function MessageComponent({item, user}) {
  return (
    <View>
      <Text className="self-center px-4 py-2 bg-gray-200 rounded-full text-gray-600">
        Today
      </Text>
      {/* sent message */}
      <View className="mb-2">
        <Text className="text-white max-w-1/2 p-4 bg-primary_blue mx-1 rounded-b-lg rounded-tl-lg self-end">
          Thanks, babu bhaiya
        </Text>
        <View className="flex-row mx-2 self-end">
          <Text className="mx-1 text-xs">08:51</Text>
          <DoubleTick />
        </View>
      </View>
      {/* sent image */}
      <View className="mb-2">
        <View className="max-w-1/2 p-2  bg-primary_blue mx-1 rounded-b-md rounded-tl-md self-end">
          <Image
            source={{
              uri: 'https://www.bostontechmom.com/wp-content/uploads/2022/11/hackathon-tech-banner.jpg',
            }}
            style={{
              width: '100%',
              aspectRatio: 1,
            }}
          />
        </View>
        <View className="flex-row mx-2 self-end">
          <Text className="mx-1 text-xs">08:51</Text>
          <DoubleTick />
        </View>
      </View>

      {/* received message */}
      <View className="mb-2">
        <View className="flex-row items-center">
          <Image source={{}} className="rounded-full h-8 w-8 mx-1" />
          <View className="max-w-1/2 p-4 bg-grey_f5 mx-1 rounded-b-lg rounded-tr-lg">
            <Text
              className="text-xs mb-1 font-semibold"
              style={{color: getColorCodeFromName('Babu Bhiya')}}>
              Babu Bhaiya
            </Text>
            <Text className="text-black text-base">Mention not re raju</Text>
          </View>
        </View>
        <Text className="mx-12 text-xs">08:51</Text>
      </View>
      {/* received image */}
      <View className="mb-2">
        <View className="flex-row items-end">
          <Image
            source={{
              uri: 'https://wallpaperaccess.com/full/6424278.jpg',
            }}
            className="rounded-full h-8 w-8 bg-black mx-1 my-1 "
          />
          <View className="max-w-1/2 p-2  bg-grey_f5 mx-1 rounded-b-lg rounded-tr-lg">
            <Text
              className="text-xs mb-2 font-semibold"
              style={{color: getColorCodeFromName('Manan Gaur')}}>
              Manan Gaur
            </Text>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/3879071/pexels-photo-3879071.jpeg?cs=srgb&dl=pexels-alex-azabache-3879071.jpg&fm=jpg',
              }}
              style={{
                width: '100%',
                aspectRatio: 1,
              }}
            />
          </View>
        </View>
        <Text className="mx-12 text-xs">08:51</Text>
      </View>
    </View>
  );
}
