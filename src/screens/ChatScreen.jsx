import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import ChatThreadHeader from '../components/ChatThreadHeader';
import MessageComponent from '../components/MessageComponent';
import MessageInputBox from '../components/MessageInputBox';
import {PaperAirplaneIcon, PhotoIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';

const ChatScreen = ({navigation}) => {
  return (
    <View className="flex-col bg-white h-full">
      <ChatThreadHeader
        navigation={navigation}
        name="Babu Bhaiya"
        typing={'typing...'}
        image="https://wallpaperaccess.com/full/6424278.jpg"
      />
      <ScrollView className="flex-grow">
        <MessageComponent />
      </ScrollView>
      <View className="flex-row items-center">
        <MessageInputBox />
        <View className="rounded-full w-12 h-12 bg-primary_blue items-center justify-center">
          <PhotoIcon color={Colors.WHITE} />
        </View>
        <View className="rounded-full w-12 h-12 bg-primary_blue items-center justify-center mx-2">
          <PaperAirplaneIcon color={Colors.WHITE} />
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;
