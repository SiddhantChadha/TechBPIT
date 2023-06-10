import {ScrollView} from 'react-native';
import React from 'react';

import CustomTopBar from '../components/CustomTopBar';
import {
  ChatBubbleLeftIcon,
  PencilSquareIcon,
} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import PostList from '../components/PostList';

const HomeScreen = ({navigation}) => {
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
    <ScrollView >
      <CustomTopBar
        navigation={navigation}
        title={'Home Feed'}
        rightComponent={chatButton}
        showLeftComponent={true}
        leftComponent={leftHeaderComponent}
      />
      <PostList navigation={navigation} />
    </ScrollView>
  );
};

export default HomeScreen;
