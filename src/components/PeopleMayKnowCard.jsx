import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';

const PeopleMayKnowCard = () => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <View className="rounded-lg shadow-lg bg-white w-1/2 p-4  m-2 items-center flex-1 justify-center">
      <Image
        source={{
          uri: 'https://media.licdn.com/dms/image/D4D03AQFceRkjbq5tdA/profile-displayphoto-shrink_400_400/0/1672917303490?e=1690416000&v=beta&t=SU4i3x_dMRcfSZqFf9noZzZwmi3xtih_idqVPD5QPdc',
        }}
        className="rounded-full w-12 h-12"
      />
      <Text className="text-black text-base mt-2 text-center">
        Siddhant chadha
      </Text>
      <Text className="mt-2 text-center">Passionate programmer</Text>
      <View>
        <Text className="bg-white text-blue-500 px-2 py-1 rounded-lg border border-blue-500 text-sm mt-2">
          Message
        </Text>
      </View>
    </View>
  );
};

export default PeopleMayKnowCard;
