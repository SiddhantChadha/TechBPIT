import {ActivityIndicator, FlatList, View, Text} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import ResourceItem from '../components/ResourceItem';
import CommunityPostItem from '../components/CommunityPostItem';
import EventPostItem from '../components/EventPostItem';
import {ROUTES} from '../APIController/routes';
import {getAllPosts} from '../APIController/controller';
import {LoggedInContext} from '../context/LoggedInContext';

const HomeScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const setIsLoggedIn = useContext(LoggedInContext);

  const fetchData = async () => {
    setData(await getAllPosts());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
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
