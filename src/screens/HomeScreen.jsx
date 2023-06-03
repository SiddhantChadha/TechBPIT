import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  VirtualizedList,
  TouchableOpacity,
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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import EventPostItem from '../components/EventPostItem';
import ResourceItem from '../components/ResourceItem';

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
    <View style={{flex: 1}}>
      <CustomTopBar
        navigation={navigation}
        title={'Home Feed'}
        rightComponent={chatButton}
      />

      {isLoading ? (
        <ScrollView>
          <View className="flex-col rounded-lg bg-white px-2 py-4 shadow-2xl m-4">
            <SkeletonPlaceholder>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginLeft: '5%',
                  }}
                />
                <View
                  style={{
                    width: 60,
                    height: 35,
                    borderRadius: 5,
                    marginLeft: '5%',
                    marginRight: '10%',
                    flexGrow: 1,
                  }}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 20,
                    height: 35,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: 12,
                    flexGrow: 1,
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </View>

          <View className="flex-col rounded-lg bg-white px-2 py-4 shadow-2xl m-4">
            <SkeletonPlaceholder>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginLeft: '5%',
                  }}
                />
                <View
                  style={{
                    width: 60,
                    height: 35,
                    borderRadius: 5,
                    marginLeft: '5%',
                    marginRight: '10%',
                    flexGrow: 1,
                  }}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 20,
                    height: 200,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: 12,
                    flexGrow: 1,
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </View>

          <View className="flex-col rounded-lg bg-white px-2 py-4 shadow-2xl m-4">
            <SkeletonPlaceholder>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginLeft: '5%',
                  }}
                />
                <View
                  style={{
                    width: 60,
                    height: 35,
                    borderRadius: 5,
                    marginLeft: '5%',
                    marginRight: '10%',
                    flexGrow: 1,
                  }}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 20,
                    height: 150,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: 12,
                    flexGrow: 1,
                  }}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 40,
                    height: 35,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: 12,
                  }}
                />
                <View
                  style={{
                    width: 20,
                    height: 35,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: 12,
                    flexGrow: 1,
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </View>

          <View className="flex-col rounded-lg bg-white px-2 py-4 shadow-2xl m-4">
            <SkeletonPlaceholder>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginLeft: '5%',
                  }}
                />
                <View
                  style={{
                    width: 60,
                    height: 35,
                    borderRadius: 5,
                    marginLeft: '5%',
                    marginRight: '10%',
                    flexGrow: 1,
                  }}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 20,
                    height: 200,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: 12,
                    flexGrow: 1,
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </View>

          <View className="flex-col rounded-lg bg-white px-2 py-4 shadow-2xl m-4">
            <SkeletonPlaceholder>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginLeft: '5%',
                  }}
                />
                <View
                  style={{
                    width: 60,
                    height: 35,
                    borderRadius: 5,
                    marginLeft: '5%',
                    marginRight: '10%',
                    flexGrow: 1,
                  }}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 20,
                    height: 35,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: 12,
                    flexGrow: 1,
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </View>
        </ScrollView>
      ) : (
        <VirtualizedList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PostDetails', {itemData: item})
              }>
              {getPostType(item)}
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
          initialNumToRender={4}
          getItemCount={_data => _data.length}
          getItem={(_data, index) => _data[index]}
        />
      )}
    </View>
  );
};

function getPostType(item) {
  if (item.postType === 'resourcePost') return <ResourceItem itemData={item} />;
  if (item.postType === 'communityPost')
    return <CommunityPostItem itemData={item} />;
  if (item.postType === 'eventPost') return <EventPostItem itemData={item} />;
}

export default HomeScreen;
