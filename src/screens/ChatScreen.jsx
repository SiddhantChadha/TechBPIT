import {View, Text, ScrollView, TextInput} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import ChatThreadHeader from '../components/ChatThreadHeader';
import MessageComponent from '../components/MessageComponent';
import {PaperAirplaneIcon, PhotoIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';

const ChatScreen = ({navigation}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef(null);

  const handleTyping = text => {
    setMessage(text);
    setIsTyping(true);
    clearTimeout(typingTimerRef.current);

    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimerRef.current);
    };
  }, []);

  return (
    <View className="flex-col bg-white h-full">
      <ChatThreadHeader
        navigation={navigation}
        name="Babu Bhaiya"
        typing={isTyping ? 'typing...' : ''}
        image="https://wallpaperaccess.com/full/6424278.jpg"
      />
      <ScrollView className="flex-grow">
        <MessageComponent />
      </ScrollView>
      <View className="flex-row items-center">
        <TextInput
          value={message}
          onChangeText={text => handleTyping(text)}
          className="m-2 px-5 rounded-3xl border  border-grey_4a flex-grow"
          placeholder={'Type a message'}
        />
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
