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

const HomeScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const chatButton = (
    <ChatBubbleLeftIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      onPress={() => navigation.navigate('RecentChat')}
    />
  );

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_ALL_POSTS:
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
      REST_COMMANDS.REQ_GET_ALL_POSTS,
      {},
      onResponseReceived,
      onResponseFailed,
    );
  }, []);
  return (
    <View>
      <CustomTopBar
        navigation={navigation}
        title={'Home Feed'}
        rightComponent={chatButton}
      />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView>
          <FlatList
            data={data}
            renderItem={({item}) => getPostType(item)}
            keyExtractor={item => item._id}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

function getPostType(item) {
  // if (item.postType === 'resourcePost') return <ResourceItem />;
  if (item.postType === 'communityPost')
    return <CommunityPostItem itemData={item} />;
  // if (item.postType === 'eventPost') return <EventPostItem />;
}

export default HomeScreen;
