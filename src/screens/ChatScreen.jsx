import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
  VirtualizedList,
} from 'react-native';
import React, {useState, useRef, useEffect, useContext} from 'react';
import ChatThreadHeader from '../components/ChatThreadHeader';
import MessageComponent from '../components/MessageComponent';
import {PaperAirplaneIcon, PhotoIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  emitAllReadStatus,
  emitIsTyping,
  getSocket,
  listenIsTyping,
  listenNewMessageEvent,
  listenTempMessageRead,
  sendPersonalMessage,
} from '../Utils/socket';

import {getCurrentTimestamp} from '../Utils/DateTimeUtils';
import {UserContext} from '../context/UserIdContext';
import ImageBottomSheet from '../components/ImageBottomSheet';

const ChatScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const selfTypingTimerRef = useRef(null);
  const receiverTypingTimerRef = useRef(null);
  const {id, image, name, isGrpChat} = route.params;
  const selfId = useContext(UserContext);
  const bottomSheet = useRef();


  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_PERSONAL_CHAT:
        setData(data);
        setIsLoading(false);
        if (!isGrpChat) emitAllReadStatus(selfId, id);
        listenIsTyping(`${id}-isTyping`, typingListener);

        if (!isGrpChat) listenNewMessageEvent(`${id}-msg`, onNewMessage);
        if (!isGrpChat) listenTempMessageRead(`${id}-read`, onTempMessageRead);
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

  const handleTyping = text => {
    setMessage(text);
    clearTimeout(selfTypingTimerRef.current);
    emitIsTyping(selfId, id, true, isGrpChat, 'Tushar Jain');
    selfTypingTimerRef.current = setTimeout(() => {
      emitIsTyping(selfId, id, false, isGrpChat, 'Tushar Jain');
    }, 1000);
  };

  const typingListener = (status, senderName) => {
    if (!isGrpChat) {
      setIsTyping(status);
      clearTimeout(receiverTypingTimerRef.current);
      receiverTypingTimerRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
  };
  const onNewMessage = message => {
    if (!isGrpChat) {
      setData(d => {
        return [message, ...d];
      });
    }
  };

  const onTempMessageRead = () => {
    //mark all sent message read
    setData(d => {
      return d.map(item => {
        if (item.isRead == false) {
          item.isRead = true;
        }

        return item;
      });
    });
  };

  const sendMessage = async imgUrl => {
    let msg;

    if (imgUrl) {
      msg = {
        msgType: 'direct-message-with-image',
        message: '',
        sender: selfId,
        timestamp: getCurrentTimestamp(),
        receiver: id,
        imageUrl: imgUrl,
        isSent: false,
        isError: false,
        isRead: false,
      };
    } else {
      msg = {
        msgType: 'direct-message',
        message,
        sender: selfId,
        timestamp: getCurrentTimestamp(),
        receiver: id,
        imageUrl: '',
        isSent: false,
        isError: false,
        isRead: false,
      };
    }

    setData([msg, ...data]);
    await sendPersonalMessage(msg, id, setData);
    setMessage('');
  };

  useEffect(() => {
    return () => {
      clearTimeout(selfTypingTimerRef.current);
      clearTimeout(receiverTypingTimerRef.current);
    };
  }, []);

  return (
    <View className="flex-col bg-white h-full">
      <ChatThreadHeader
        navigation={navigation}
        name={name}
        typing={isTyping ? 'typing...' : ''}
        image={image}
        id={id}
        isGrpChat={isGrpChat}
      />

      {isLoading ? (
        <ScrollView className="bg-white h-full">
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'column-reverse', flexGrow: 1}}>
              <View
                style={{
                  width: '30%',
                  height: 30,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopLeftRadius: 5,
                  marginHorizontal: '5%',
                  marginVertical: '5%',
                  alignSelf: 'flex-end',
                }}
              />
              <View
                style={{
                  width: '30%',
                  height: 30,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopLeftRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  alignSelf: 'flex-end',
                }}
              />
              <View
                style={{
                  width: '50%',
                  height: 200,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopLeftRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  alignSelf: 'flex-end',
                }}
              />
              <View
                style={{
                  width: '30%',
                  height: 30,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopRightRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  alignSelf: 'flex-start',
                }}
              />
              <View
                style={{
                  width: '30%',
                  height: 30,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopRightRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  alignSelf: 'flex-start',
                }}
              />
              <View
                style={{
                  width: '50%',
                  height: 200,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopRightRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  alignSelf: 'flex-start',
                }}
              />
              <View
                style={{
                  width: '30%',
                  height: 30,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopLeftRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  alignSelf: 'flex-end',
                }}
              />
              <View
                style={{
                  width: '30%',
                  height: 30,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopLeftRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  alignSelf: 'flex-end',
                }}
              />
              <View
                style={{
                  width: '30%',
                  height: 30,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopLeftRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  alignSelf: 'flex-end',
                }}
              />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <VirtualizedList
          data={data}
          inverted
          className="flex-grow"
          keyExtractor={(item, index) => index}
          initialNumToRender={12}
          getItemCount={_data => _data.length}
          getItem={(_data, index) => _data[index]}
          renderItem={({item}) => (
            <MessageComponent
              item={item}
              receiver={id}
              receiverImg={image}
              receiverName={name}
            />
          )}
        />
      )}
      <View className="flex-row items-center">
        <TextInput
          value={message}
          onChangeText={text => handleTyping(text)}
          className="m-2 px-5 rounded-3xl border  border-grey_4a flex-grow"
          placeholder={'Type a message'}
        />
        <Pressable onPress={() => bottomSheet.current.open()}>
          <View className="rounded-full w-12 h-12 bg-primary_blue items-center justify-center">
            <PhotoIcon color={Colors.WHITE} />
          </View>
        </Pressable>
        <Pressable onPress={()=>sendMessage()}>
          <View className="rounded-full w-12 h-12 bg-primary_blue items-center justify-center mx-2">
            <PaperAirplaneIcon color={Colors.WHITE} />
          </View>
        </Pressable>
      </View>
      <ImageBottomSheet
        ref={bottomSheet}
        navigation={navigation}
        action={sendMessage}
        receiver={{id, image, name}}
      />
    </View>
  );
};

export default ChatScreen;
