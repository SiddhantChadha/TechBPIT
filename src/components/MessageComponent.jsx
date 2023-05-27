import {View, Text, Image, StyleSheet} from 'react-native';

import React from 'react';

export default function MessageComponent({item, user}) {
  return (
    <View>
      {/* sent message */}
      <View className="mb-2">
        <Text className="text-white max-w-1/2 p-4 bg-primary_blue mx-1 rounded-b-lg rounded-tl-lg self-end">
          Thanks, babu bhaiya you are the best
        </Text>
        <Text className="flex-row mx-2 self-end">08:50</Text>
      </View>
      {/* sent image */}
      <View className="mb-2">
        <Image
          source={{
            uri: 'https://www.shutterstock.com/shutterstock/photos/146497541/display_1500/stock-photo-colorized-d-dna-model-vertical-black-background-super-long-very-high-resolution-146497541.jpg',
          }}
          className="rounded-b-lg rounded-tl-lg mx-1 self-end"
          style={{
            width: '50%',
            aspectRatio: 1,
          }}
        />
        <Text className="flex-row mx-2 self-end">08:51</Text>
      </View>

      {/* received message */}
      <View className="mb-2">
        <View className="flex-row items-center">
          <Image source={{}} className="rounded-full h-8 w-8 mx-1" />
          <Text className="text-black max-w-1/2 p-4 bg-grey_f5 mx-1 rounded-b-lg rounded-tr-lg">
            Mention not re raju
          </Text>
        </View>
        <Text className="mx-11">08:51</Text>
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
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/3879071/pexels-photo-3879071.jpeg?cs=srgb&dl=pexels-alex-azabache-3879071.jpg&fm=jpg',
            }}
            className="rounded-b-lg rounded-tr-lg"
            style={{
              width: '50%',
              aspectRatio: 1,
            }}
          />
        </View>
        <Text className="mx-11">08:51</Text>
      </View>
    </View>
  );
}
