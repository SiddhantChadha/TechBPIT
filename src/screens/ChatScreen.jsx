import {View, Text} from 'react-native';
import React from 'react';
import CustomTopBar from '../components/CustomTopBar';
import {PlusIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';

const ChatScreen = () => {
  const newChatButton = (
    <PlusIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      // onPress={() => navigation.navigate('Chat')}
    />
  );
  return (
    <View>
      <CustomTopBar title={'Recent Chats'} rightComponent={newChatButton} />
    </View>
  );
};

export default ChatScreen;
