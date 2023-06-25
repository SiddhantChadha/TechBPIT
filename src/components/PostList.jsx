import {
  View,
  ScrollView,
  VirtualizedList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';
import React, {useEffect, useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import EventPostItem from '../components/EventPostItem';
import ResourceItem from '../components/ResourceItem';
import CommunityPostItem from '../components/CommunityPostItem';

const PostList = ({navigation, filterType, id, refresh, setRefresh}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_ALL_POSTS:
        if (filterType) {
          data = data.filter(
            e => e.groupId._id === id && e.postType === filterType,
          );
        }
        setData(data);
        setLoading(false);
        break;
      default:
        break;
    }
  };
  const onResponseFailed = (command, error) => {};

  useEffect(() => {
    setLoading(true);
    execute(
      REST_COMMANDS.REQ_GET_ALL_POSTS,
      {},
      onResponseReceived,
      onResponseFailed,
    );
  }, [refresh]);

  const onRefresh = () => {
    setLoading(true);
    execute(
      REST_COMMANDS.REQ_GET_ALL_POSTS,
      {},
      onResponseReceived,
      onResponseFailed,
    );
  };

  return (
    <>
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
          scrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PostDetails', {
                  itemData: item,
                  action: setRefresh,
                })
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
    </>
  );
};

function getPostType(item) {
  if (item.postType === 'resourcePost') return <ResourceItem itemData={item} />;
  if (item.postType === 'communityPost')
    return <CommunityPostItem itemData={item} />;
  if (item.postType === 'eventPost') return <EventPostItem itemData={item} />;
}

export default PostList;
