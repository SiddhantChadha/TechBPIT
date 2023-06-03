import {
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
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
import {getSelfId} from '../EncryptedStorageHelper';
import {getCurrentTimestamp} from '../Utils/DateTimeUtils';

const ChatScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const selfTypingTimerRef = useRef(null);
  const receiverTypingTimerRef = useRef(null);
  const {id, image, name} = route.params;
  const selfId = useRef();
  const isGrpchat = false;

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_PERSONAL_CHAT:
        setData(data);
        setIsLoading(false);
        if (!isGrpchat) emitAllReadStatus(selfId.current, id);
        listenIsTyping(`${id}-isTyping`, typingListener);
        if (!isGrpchat) listenNewMessageEvent(`${id}-msg`, onNewMessage);
        if (!isGrpchat) listenTempMessageRead(`${id}-read`, onTempMessageRead);
        break;
      default:
        break;
    }
  };
  const onResponseFailed = (command, error) => {};

  useEffect(() => {
    (async () => {
      selfId.current = await getSelfId();
    })();

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
    emitIsTyping(selfId.current, id, true, isGrpchat, 'Tushar Jain');
    selfTypingTimerRef.current = setTimeout(() => {
      emitIsTyping(selfId.current, id, false, isGrpchat, 'Tushar Jain');
    }, 1000);
  };

  const typingListener = (status, senderName) => {
    if (!isGrpchat) {
      setIsTyping(status);
      clearTimeout(receiverTypingTimerRef.current);
      receiverTypingTimerRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
  };
  const onNewMessage = message => {
    if (!isGrpchat) {
      setData([message, ...data]);
    }
  };

  const onTempMessageRead = () => {
    //todo: mark all sent message read
    let newData = [...data];
    newData.every(obj => {
      if (obj.isRead == true) {
        return false;
      }

      obj.isRead = true;
      return true;
    });

    setData(newData);
  };

  const sendMessage = async () => {
    let msg = {
      msgType: 'direct-message',
      message,
      sender: selfId.current,
      timestamp: getCurrentTimestamp(),
      receiver: id,
      imageUrl: '',
      isSent: false,
      isError: false,
    };
    setData([msg, ...data]);
    await sendPersonalMessage(msg, id);
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
        <FlatList
          data={data}
          inverted
          className="flex-grow"
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
        <View className="rounded-full w-12 h-12 bg-primary_blue items-center justify-center">
          <PhotoIcon color={Colors.WHITE} />
        </View>
        <View className="rounded-full w-12 h-12 bg-primary_blue items-center justify-center mx-2">
          <PaperAirplaneIcon color={Colors.WHITE} onPress={sendMessage} />
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;
