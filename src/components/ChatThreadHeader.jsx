import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {Colors} from '../colors';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';

const ChatThreadHeader = ({navigation, name, image, typing, id, isGrpChat}) => {
  return (
    <View className="flex-row items-center bg-primary_blue py-2 px-4 flex-wrap">
      <ArrowLeftIcon color={Colors.WHITE} onPress={() => navigation.goBack()} />
      <Pressable
        className="flex flex-row items-center"
        onPress={() =>
          isGrpChat
            ? navigation.navigate('CommunityDetail',{id,name})
            : navigation.navigate('ViewUserProfile', {id, name})
        }>
        <Image
          source={{
            uri: image,
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
      </Pressable>
    </View>
  );
};

export default ChatThreadHeader;
