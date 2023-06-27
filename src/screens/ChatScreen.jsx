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
  emitReadStatus,
  listenIsTyping,
  listenNewMessageEvent,
  listenTempMessageReadFromApi,
  listenTempMessageReadFromSocket,
  sendPersonalMessage,
  sendGroupMessage,
  removeListners,
  disconnect,
} from '../Utils/socket';

import {getCurrentTimestamp} from '../Utils/DateTimeUtils';
import {UserContext} from '../context/UserIdContext';
import ImageBottomSheet from '../components/ImageBottomSheet';
import {getUsername} from '../EncryptedStorageHelper';
import {useIsFocused} from '@react-navigation/native';

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
  const [typingUser, setTypingUser] = useState(null);
  const isFocused = useIsFocused();
  const [selfUsername, setSelfUsername] = useState(null);

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_PERSONAL_CHAT:
        setData(data);
        setIsLoading(false);
        emitAllReadStatus(selfId, id);
        listenIsTyping(`${id}-isTyping`, typingListener);
        listenNewMessageEvent(`${id}-msg`, onNewMessage);
        listenTempMessageReadFromApi(`${id}-read`, onTempMessageRead);
        listenTempMessageReadFromSocket(
          `${id}-sent-msg-read`,
          onTempMessageReadFromSocket,
        );
        break;
      case REST_COMMANDS.REQ_GET_GROUP_CHAT:
        setData(data);
        setIsLoading(false);
        listenIsTyping(`${id}-isTyping`, typingListener);
        listenNewMessageEvent(`${id}-msg`, onNewMessage);
      default:
        break;
    }
  };
  const onResponseFailed = (command, error) => {};

  useEffect(() => {
    (async () => {
      setSelfUsername(await getUsername());
    })();

    if (!isGrpChat) {
      execute(
        REST_COMMANDS.REQ_GET_PERSONAL_CHAT,
        {id},
        onResponseReceived,
        onResponseFailed,
      );
    } else {
      execute(
        REST_COMMANDS.REQ_GET_GROUP_CHAT,
        {id},
        onResponseReceived,
        onResponseFailed,
      );
    }

    return () => {
      (async () => {
        await removeListners();
        // await disconnect();
      })();
    };
  }, []);

  const handleTyping = text => {
    setMessage(text);
    clearTimeout(selfTypingTimerRef.current);
    emitIsTyping(selfId, id, true, isGrpChat, selfUsername);
    selfTypingTimerRef.current = setTimeout(() => {
      emitIsTyping(selfId, id, false, isGrpChat, selfUsername);
    }, 1000);
  };

  const typingListener = (status, senderName) => {
    if (!isGrpChat) {
      setIsTyping(status);
      clearTimeout(receiverTypingTimerRef.current);
      receiverTypingTimerRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    } else {
      setTypingUser(senderName);
      setIsTyping(status);
      clearTimeout(receiverTypingTimerRef.current);
      receiverTypingTimerRef.current = setTimeout(() => {
        setIsTyping(false);
        setTypingUser(null);
      }, 1000);
    }
  };
  const onNewMessage = async message => {
    setData(d => {
      return [message, ...d];
    });
    if (!isGrpChat) {
      await emitReadStatus(selfId, id, message._id);
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

  const onTempMessageReadFromSocket = id => {
    setData(d => {
      return d.map(item => {
        if (item.id == id) {
          item.isRead = true;
        }

        return item;
      });
    });
  };

  const sendMessage = async imgUrl => {
    let msg;

    if (isGrpChat) {
      if (imgUrl) {
        msg = {
          msgType: 'group-message-with-image',
          message: null,
          sender: selfId,
          timestamp: getCurrentTimestamp(),
          receiver: id,
          imageUrl: imgUrl,
          isSent: false,
          isError: false,
        };
      } else {
        msg = {
          msgType: 'group-message',
          message,
          sender: selfId,
          timestamp: getCurrentTimestamp(),
          receiver: id,
          imageUrl: null,
          isSent: false,
          isError: false,
        };
      }
    } else {
      if (imgUrl) {
        msg = {
          msgType: 'direct-message-with-image',
          message: null,
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
          imageUrl: null,
          isSent: false,
          isError: false,
          isRead: false,
        };
      }
    }

    setData(d => {
      return [msg, ...d];
    });

    if (isGrpChat) {
      await sendGroupMessage(msg, id, setData);
    } else {
      await sendPersonalMessage(msg, id, setData);
    }
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
        typing={
          isGrpChat
            ? isTyping
              ? `${typingUser} is typing...`
              : ''
            : isTyping
            ? 'typing...'
            : ''
        }
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
              selfId={selfId}
              receiverImg={image}
              receiverName={name}
              navigation={navigation}
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
        <Pressable onPress={() => sendMessage()}>
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
