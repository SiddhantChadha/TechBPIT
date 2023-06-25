import {View} from 'react-native';
import React, {useState} from 'react';

import CustomTopBar from '../components/CustomTopBar';
import {
  ChatBubbleLeftIcon,
  PencilSquareIcon,
} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import PostList from '../components/PostList';

const HomeScreen = ({navigation}) => {
  const [refresh, setRefresh] = useState(false);

  const chatButton = (
    <ChatBubbleLeftIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      onPress={() => navigation.navigate('RecentChat')}
    />
  );

  const leftHeaderComponent = (
    <PencilSquareIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-start'}}
      onPress={() => navigation.navigate('ModeratorGroups')}
    />
  );

  return (
    <View className="h-full">
      <CustomTopBar
        navigation={navigation}
        title={'Home Feed'}
        rightComponent={chatButton}
        showLeftComponent={true}
        leftComponent={leftHeaderComponent}
      />
      <PostList
        navigation={navigation}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </View>
  );
};

export default HomeScreen;
