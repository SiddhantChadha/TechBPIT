import {
  SafeAreaView,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ChatThreadCard from '../components/ChatThreadCard';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';

const PersonalRecent = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_PERSONAL_RECENT_CHAT:
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
      REST_COMMANDS.REQ_GET_PERSONAL_RECENT_CHAT,
      {},
      onResponseReceived,
      onResponseFailed,
    );
  }, []);

  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          className="h-full bg-white"
          data={data}
          renderItem={({item}) => (
            <Pressable
              onPress={() =>
                navigation.navigate('Chat', {
                  id: item._id,
                  image: item.image,
                  name: item.username,
                })
              }>
              <ChatThreadCard
                image={item.image}
                lastMessage={item.lastMessage}
                name={item.username}
                id={item._id}
              />
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default PersonalRecent;
