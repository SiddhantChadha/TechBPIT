import {SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import ChatThreadCard from '../components/ChatThreadCard';

const DATA = {
  _id: "645354875812e555c537c071",
  email: "tusharjain@gmail.com",
  username: "Tushar Jain",
  image: "https://toppng.com/public/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png",
  groupsJoined: [
      {
          _id: "63add2285086f6fca8576f0c",
          groupName: "NodeJs",
          image: "https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png",
          lastMessage: {
              msgType: "group-message-with-image",
              sender: {
                  _id: "63add1dc5086f6fca8576f01",
                  username: "Tushar Jain"
              },
              receiver: "63add2285086f6fca8576f0c",
              message: "",
              timestamp: "1673688639749",
              imageUrl: "http://res.cloudinary.com/dmigta0dz/image/upload/v1673688639/qwdr7w9bb7nnxtir6gfl.jpg",
              readAt: null,
             
          }
      },
      {
          _id: "63c5f871aea9c742cbe465f4",
          groupName: "Machine Learning",
          image: "https://builtin.com/sites/www.builtin.com/files/styles/og/public/2021-12/machine-learning-examples-applications.png",
          lastMessage: {
              msgType: "group-message",
              sender: {
                  _id: "645354875812e555c537c071",
                  username: "Tushar Jain"
              },
              receiver: "63c5f871aea9c742cbe465f4",
              message: "fggh",
              timestamp: "1685199233226",
              imageUrl: "",
              readAt: null,
              
          }
      }
  ]
}

const GroupRecent = () => {
  return (
    <SafeAreaView>
      <FlatList
        className="h-full bg-w"
        data={DATA.groupsJoined}
        renderItem={({item}) => <ChatThreadCard image={item.image} name={item.groupName} lastMessage={item.lastMessage}/>}
      />
    </SafeAreaView>
  );
};

export default GroupRecent;
