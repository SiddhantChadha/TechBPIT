import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserList from '../components/UserList';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';
import HorizontalLine from '../components/HorizontalLine';
import ResourceItem from '../components/ResourceItem';
import {UserContext} from '../context/UserIdContext';
import HomeScreen from './HomeScreen';

const Tab = createMaterialTopTabNavigator();

const CommunityDetailScreen = ({navigation, route}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const {id, name} = route.params;
  const selfId = useContext(UserContext);

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_GROUP_DETAILS:
        setData(data);
        setIsLoading(false);
        break;
      case REST_COMMANDS.REQ_PATCH_LEAVE_GROUP:
        
        break;
      default:
        break;
    }
  };
  const onResponseFailed = (command, error) => {};

  useEffect(() => {
    execute(
      REST_COMMANDS.REQ_GET_GROUP_DETAILS,
      {id},
      onResponseReceived,
      onResponseFailed,
    );
  }, []);

  const leaveGroup = () => {
    execute(
      REST_COMMANDS.REQ_PATCH_LEAVE_GROUP,
      {id},
      onResponseReceived,
      onResponseFailed,
    );
  };

  return (
    <>
      <CustomTopBar
        navigation={navigation}
        showBackButton={true}
        title={`${name} Community`}
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
        <View className="">
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
                  <Pressable className="bg-primary_blue rounded-lg px-2 py-1">
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

          {/* <Tab.Navigator className="mt-1">
              <Tab.Screen name="Posts" component={HomeScreen} />
              <Tab.Screen name="Events" component={example} />
              
            </Tab.Navigator> */}
        </View>
      )}
    </>
  );
};

const example = () => {
  return (
    <View className="">
      <View>
        <Text>Hi</Text>
      </View>
      <View>
        <Text>Hi</Text>
      </View>
      <View>
        <Text>Hi</Text>
      </View>
      <View>
        <Text>Hi</Text>
      </View>
    </View>
  );
};

export default CommunityDetailScreen;
