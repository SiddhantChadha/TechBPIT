import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserList from '../components/UserList';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';
import HorizontalLine from '../components/HorizontalLine';
import {UserContext} from '../context/UserIdContext';
import PostList from '../components/PostList';
import {SquaresPlusIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import PostBottomSheet from '../components/PostBottomSheet';

const Tab = createMaterialTopTabNavigator();

const CommunityDetailScreen = ({navigation, route}) => {
  const [data, setData] = useState();
  const [isModerator, setIsModerator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChange, setDataChange] = useState(false);
  const {id, name} = route.params;
  const selfId = useContext(UserContext);
  const bottomSheet = useRef();

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_GROUP_DETAILS:
        setData(data);
        setIsModerator(data.canEdit);
        setIsLoading(false);

        break;
      case REST_COMMANDS.REQ_PATCH_LEAVE_GROUP:
        setDataChange(!dataChange);
        break;
      case REST_COMMANDS.REQ_POST_JOIN_GROUP:
        setDataChange(!dataChange);
        break;
      default:
        break;
    }
  };
  const onResponseFailed = (command, error) => {
    console.log(error);
  };

  useEffect(() => {
    execute(
      REST_COMMANDS.REQ_GET_GROUP_DETAILS,
      {id},
      onResponseReceived,
      onResponseFailed,
    );
  }, [dataChange]);

  const leaveGroup = () => {
    execute(
      REST_COMMANDS.REQ_PATCH_LEAVE_GROUP,
      {id},
      onResponseReceived,
      onResponseFailed,
    );
  };

  const joinGroup = () => {
    execute(
      REST_COMMANDS.REQ_POST_JOIN_GROUP,
      {id},
      onResponseReceived,
      onResponseFailed,
    );
  };

  const rightHeaderComponent = (
    <>
      {isModerator ? (
        <SquaresPlusIcon
          color={Colors.BLACK}
          style={{position: 'absolute', alignSelf: 'flex-end'}}
          onPress={() => bottomSheet.current.open()}
        />
      ) : (
        <></>
      )}
    </>
  );

  return (
    <View style={{flex: 1}}>
      <CustomTopBar
        navigation={navigation}
        showBackButton={true}
        title={`${name} Community`}
        rightComponent={rightHeaderComponent}
      />
      {isLoading ? (
        <ScrollView>
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 20,
                  height: 65,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
            </View>
          </SkeletonPlaceholder>
          <HorizontalLine />
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 20,
                  height: 65,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
            </View>
          </SkeletonPlaceholder>
          <HorizontalLine />
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 20,
                  height: 100,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
            </View>
          </SkeletonPlaceholder>

          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 20,
                  height: 200,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View className="flex flex-row items-center my-3">
            <Image
              source={{
                uri: data.image,
              }}
              className="rounded-full h-14 w-14 object-contain mx-3"
            />
            <View className="flex mx-2">
              <Text className="text-black font-semibold text-xl mb-1">
                {data.groupName}
              </Text>
              <View className="flex flex-row gap-x-2">
                {data.moderators.some(e => e._id === selfId) ||
                data.usersJoined.some(e => e._id === selfId) ? (
                  <>
                    <Pressable
                      className="border-red-500 border bg-white rounded-lg px-2 py-1"
                      onPress={leaveGroup}>
                      <Text className="text-red-500 text-xs">UNFOLLOW</Text>
                    </Pressable>
                    <Pressable
                      className="bg-primary_blue rounded-lg px-2 py-1"
                      onPress={() =>
                        navigation.navigate('Chat', {
                          id: data._id,
                          image: data.image,
                          name: data.groupName,
                          isGrpChat: true,
                        })
                      }>
                      <Text className="text-white text-xs">MESSAGE</Text>
                    </Pressable>
                  </>
                ) : (
                  <Pressable
                    className="bg-primary_blue rounded-lg px-2 py-1"
                    onPress={joinGroup}>
                    <Text className="text-white text-xs">FOLLOW</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
          <View className="border-gray-300 border-y-[1px] my-3 p-3">
            <Text className="text-black font-medium text-lg ">Description</Text>
            <Text className="text-justify text-GREY_70">
              {data.description}
            </Text>
          </View>
          <UserList
            heading="Mentors"
            data={data.moderators}
            navigation={navigation}
          />

          <UserList
            heading="Participants"
            data={data.usersJoined}
            navigation={navigation}
          />

          <Tab.Navigator className="mt-1">
            <Tab.Screen
              name="Posts"
              children={() => (
                <PostList
                  navigation={navigation}
                  filterType={'communityPost'}
                  id={id}
                />
              )}
            />
            <Tab.Screen
              name="Events"
              children={() => (
                <PostList
                  navigation={navigation}
                  filterType={'eventPost'}
                  id={id}
                />
              )}
            />
            <Tab.Screen
              name="Resources"
              children={() => (
                <PostList
                  navigation={navigation}
                  filterType={'resourcePost'}
                  id={id}
                />
              )}
            />
          </Tab.Navigator>
        </ScrollView>
      )}

      <PostBottomSheet navigation={navigation} ref={bottomSheet} />
    </View>
  );
};

export default CommunityDetailScreen;
