import {View, Text, Image} from 'react-native';
import React from 'react';
import {Colors} from '../colors';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';

const ChatThreadHeader = ({navigation, name, image, typing}) => {
  return (
    <View className="flex-row items-center bg-primary_blue py-2 px-4 flex-wrap">
      <ArrowLeftIcon color={Colors.WHITE} onPress={() => navigation.goBack()} />
      <Image
        source={{
          uri: 'https://media.licdn.com/dms/image/C5103AQHExyLqyBIe8w/profile-displayphoto-shrink_400_400/0/1567182680271?e=1690416000&v=beta&t=GiDtuuOw570GjY9zaX81J3IkRJCTxtQKhHBD8sm5MII',
        }}
        className="rounded-full h-14 w-14 bg-black mx-4"
      />
      <View className="flex-wrap ">
        <Text className="text-white font-medium text-lg">{name}</Text>
        {typing ? (
          <Text className="text-white text-xs">{typing}</Text>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

export default ChatThreadHeader;
