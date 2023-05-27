import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState, useContext, useRef} from 'react';
import CommunityPostItem from '../components/CommunityPostItem';
import {execute} from '../APIController/controller';
import CustomTopBar from '../components/CustomTopBar';
import {ChatBubbleLeftIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import {REST_COMMANDS} from '../APIController/RestCommands';
import EventItem from '../components/EventItem';
import JoinCommunityCard from '../components/JoinCommunityCard';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';
const EventScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const chatButton = (
    <ChatBubbleLeftIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      onPress={() => navigation.navigate('RecentChat')}
    />
  );
  const renderItem = item => {
    return <EventItem itemData={item} />;
  };

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_ALL_EVENTS:
        setData(data);
        setLoading(false);
        break;
      default:
        break;
    }
  };
  const onResponseFailed = (command, error) => {};

  useEffect(() => {
    execute(
      REST_COMMANDS.REQ_GET_ALL_EVENTS,
      {},
      onResponseReceived,
      onResponseFailed,
    );
  }, []);
  return (
    <View>
      <CustomTopBar
        navigation={navigation}
        title={'Upcoming Events'}
        rightComponent={chatButton}
      />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView>
          <FlatList
            data={data}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={item => item._id}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

export default EventScreen;
