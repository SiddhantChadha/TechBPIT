import {ActivityIndicator, FlatList, View, Text} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import ResourceItem from '../components/ResourceItem';
import CommunityPostItem from '../components/CommunityPostItem';
import EventPostItem from '../components/EventPostItem';
import {ROUTES} from '../APIController/routes';
import {getAllPosts} from '../APIController/controller';
import {LoggedInContext} from '../context/LoggedInContext';
import GroupMessage from '../components/GroupMessage';
import ChatScreen from './ChatScreen';
import CustomTopBar from '../components/CustomTopBar';
import {ChatBubbleLeftIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';

const HomeScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const setIsLoggedIn = useContext(LoggedInContext);
  const chatButton = (
    <ChatBubbleLeftIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      onPress={() => navigation.navigate('RecentChat')}
    />
  );

  const fetchData = async () => {
    setData(await getAllPosts());
    setLoading(false);
  };

  const onResponseReceived = (command, data) => {
    setData(data);
    setLoading(false);
  };
  const onResponseFailed = (command, error) => {};

  useEffect(() => {
    getAllPosts(onResponseReceived, onResponseFailed);
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
        <FlatList
          data={data}
          renderItem={({item}) => getPostType(item)}
          keyExtractor={item => item._id}
        />
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
