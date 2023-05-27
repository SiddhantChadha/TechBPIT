import {View, Text} from 'react-native';
import React from 'react';
import ChatThreadHeader from '../components/ChatThreadHeader';

const ChatScreen = ({navigation}) => {
  return (
    <View>
      <ChatThreadHeader
        navigation={navigation}
        name="Tushar jain"
        typing={'typing...'}
        image="https://media.licdn.com/dms/image/C5103AQHExyLqyBIe8w/profile-displayphoto-shrink_400_400/0/1567182680271?e=1690416000&v=beta&t=GiDtuuOw570GjY9zaX81J3IkRJCTxtQKhHBD8sm5MII"
      />
    </View>
  );
};

export default ChatScreen;
