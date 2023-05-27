import {SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import ChatThreadCard from '../components/ChatThreadCard';

const DATA = [
  {
    _id: '63add1dc5086f6fca8576f01',
    email: 'tjain210@gmail.com',
    username: 'Tushar Jain',
    image:
      'http://res.cloudinary.com/dmigta0dz/image/upload/v1673687173/ts5pi0lvpocxs5wykesr.jpg',
    lastMessage: {
      _id: '6471e0f85812e555c537e53c',
      msgType: 'direct-message',
      sender: '645354875812e555c537c071',
      receiver: '63add1dc5086f6fca8576f01',
      message: 'gyggggh',
      timestamp: '1685184759271',
      imageUrl: '',
      readAt: '1685184759271',
    },
  },
];

const PersonalRecent = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        renderItem={({item}) => <ChatThreadCard obj={item} />}
      />
    </SafeAreaView>
  );
};

export default PersonalRecent;
