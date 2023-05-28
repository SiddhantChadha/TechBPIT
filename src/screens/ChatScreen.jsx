import {View, Text, ScrollView, TextInput, ActivityIndicator,FlatList} from 'react-native';
import React, {useState, useRef, useEffect}, {useState,useEffect} from 'react';
import ChatThreadHeader from '../components/ChatThreadHeader';
import MessageComponent from '../components/MessageComponent';
import {PaperAirplaneIcon, PhotoIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';

const ChatScreen = ({navigation,route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const {id,image,name} = route.params;

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_PERSONAL_CHAT:
        setData(data);
        setIsLoading(false);
        break;
      default:
        break;
    }
  };
  const onResponseFailed = (command, error) => {};

  useEffect(() => {
    execute(
      REST_COMMANDS.REQ_GET_PERSONAL_CHAT,
      {id},
      onResponseReceived,
      onResponseFailed,
    );
  }, []);

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
        name={name}
        typing={'typing...'}
        image={image}
      />

      <ScrollView className="flex-grow">
        {isLoading ? <ActivityIndicator size={42} /> : 
        <FlatList data={data} inverted  renderItem={({item}) => (
          
           <MessageComponent item={item} receiver={id} receiverImg={image} receiverName={name} />
        )} />
        }
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
