import {
  SafeAreaView,
  FlatList,
  ScrollView,
  Pressable,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatThreadCard from '../components/ChatThreadCard';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useIsFocused} from '@react-navigation/native';

const GroupRecent = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_GROUP_RECENT_CHAT:
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
      REST_COMMANDS.REQ_GET_GROUP_RECENT_CHAT,
      {},
      onResponseReceived,
      onResponseFailed,
    );
  }, [isFocused]);

  return (
    <SafeAreaView>
      {isLoading ? (
        <ScrollView className="bg-white h-full">
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                }}
              />
              <View style={{flexGrow: 1}}>
                <View
                  style={{
                    width: '60%',
                    height: 25,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
                <View
                  style={{
                    width: '40%',
                    height: 15,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                }}
              />
              <View style={{flexGrow: 1}}>
                <View
                  style={{
                    width: '60%',
                    height: 25,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
                <View
                  style={{
                    width: '40%',
                    height: 15,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                }}
              />
              <View style={{flexGrow: 1}}>
                <View
                  style={{
                    width: '60%',
                    height: 25,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
                <View
                  style={{
                    width: '40%',
                    height: 15,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                }}
              />
              <View style={{flexGrow: 1}}>
                <View
                  style={{
                    width: '60%',
                    height: 25,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
                <View
                  style={{
                    width: '40%',
                    height: 15,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                }}
              />
              <View style={{flexGrow: 1}}>
                <View
                  style={{
                    width: '60%',
                    height: 25,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
                <View
                  style={{
                    width: '40%',
                    height: 15,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                }}
              />
              <View style={{flexGrow: 1}}>
                <View
                  style={{
                    width: '60%',
                    height: 25,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
                <View
                  style={{
                    width: '40%',
                    height: 15,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                }}
              />
              <View style={{flexGrow: 1}}>
                <View
                  style={{
                    width: '60%',
                    height: 25,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
                <View
                  style={{
                    width: '40%',
                    height: 15,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                }}
              />
              <View style={{flexGrow: 1}}>
                <View
                  style={{
                    width: '60%',
                    height: 25,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
                <View
                  style={{
                    width: '40%',
                    height: 15,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
              </View>
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <FlatList
          className="h-full bg-white"
          data={data.groupsJoined}
          renderItem={({item}) => (
            <Pressable
              onPress={() =>
                navigation.navigate('Chat', {
                  id: item._id,
                  image: item.image,
                  name: item.groupName,
                  isGrpChat: true,
                })
              }>
              <ChatThreadCard
                image={item.image}
                name={item.groupName}
                lastMessage={item.lastMessage}
                id={item._id}
              />
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default GroupRecent;
