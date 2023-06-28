import {View, Text, Image, ScrollView, Pressable, Alert} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import {UserGroupIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import CustomButton from '../components/CustomButton';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {UserContext} from '../context/UserIdContext';
import {PencilSquareIcon} from 'react-native-heroicons/outline';

const RequirementDetailScreen = ({navigation, route}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const {id, action} = route.params;
  const selfId = useContext(UserContext);

  const onResponseReceived = async (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_COLLABORATION_PROJECT:
        console.log(data);
        setData(data);
        setIsLoading(false);
        break;
      case REST_COMMANDS.REQ_DELETE_COLLABORATION_PROJECT:
        action(d => !d);
        navigation.goBack();
      default:
        break;
    }
  };

  const onResponseFailed = (command, error) => {
    console.log(error);
  };

  useEffect(() => {
    execute(
      REST_COMMANDS.REQ_GET_COLLABORATION_PROJECT,
      {id},
      onResponseReceived,
      onResponseFailed,
    );
  }, []);

  const deleteProject = () => {
    execute(
      REST_COMMANDS.REQ_DELETE_COLLABORATION_PROJECT,
      {id},
      onResponseReceived,
      onResponseFailed,
    );
  };

  const editButton = data && data.createdBy._id === selfId && (
    <PencilSquareIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      onPress={() =>
        navigation.navigate('AddCollaborationProject', {
          edit: true,
          id,
          title: data.title,
          description: data.description,
          teamSize: data.teamSize,
          skillsRequired: data.skillsRequired.join(),
          image: data.image,
          action,
        })
      }
    />
  );

  const deleteAlert = () =>
    Alert.alert('', 'Are you sure you want to delete this project?', [
      {
        text: 'Cancel',
      },
      {text: 'OK', onPress: deleteProject},
    ]);

  return (
    <ScrollView className="bg-white">
      <CustomTopBar
        title={'Requirement Details'}
        navigation={navigation}
        showBackButton={true}
        rightComponent={editButton}
      />
      {isLoading ? (
        <SkeletonPlaceholder>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 20,
                height: 40,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '5%',
                flexGrow: 1,
              }}
            />
          </View>
          <View
            style={{
              width: '50%',
              height: 20,
              borderRadius: 5,
              marginHorizontal: '5%',
              marginTop: '5%',
            }}
          />
          <View
            style={{
              width: '70%',
              height: 150,
              borderRadius: 5,
              marginHorizontal: '5%',
              marginTop: '5%',
              alignSelf: 'center',
            }}
          />

          <View
            style={{
              width: '50%',
              height: 20,
              borderRadius: 5,
              marginHorizontal: '5%',
              marginTop: '5%',
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 2,
                height: 150,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '5%',
                flexGrow: 1,
              }}
            />
            <View
              style={{
                width: 2,
                height: 150,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '5%',
                flexGrow: 1,
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 2,
                height: 150,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '5%',
                flexGrow: 1,
              }}
            />
            <View
              style={{
                width: 2,
                height: 150,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '5%',
                flexGrow: 1,
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 2,
                height: 150,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '5%',
                flexGrow: 1,
              }}
            />
            <View
              style={{
                width: 2,
                height: 150,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '5%',
                flexGrow: 1,
              }}
            />
          </View>
          <View
            style={{
              width: '50%',
              height: 20,
              borderRadius: 5,
              marginHorizontal: '5%',
              marginTop: '5%',
            }}
          />
          <View
            style={{
              width: '75%',
              borderRadius: 5,
              marginHorizontal: '5%',
              marginTop: '5%',
              alignSelf: 'center',
              aspectRatio: '3/4',
            }}
          />
        </SkeletonPlaceholder>
      ) : (
        <View className="items-center mx-[10%]">
          <Image
            source={{
              uri: data.image,
            }}
            className="rounded-md bg-white shadow-xl aspect-video w-full"
          />
          <Text className="text-2xl text-black font-medium">{data.title}</Text>
          <View className="flex-row items-center my-2 mx-1">
            <UserGroupIcon color={Colors.GREY_4A} />
            <Text className="mx-1 text-grey_4a">{data.teamSize} Members</Text>
            <Text className="mx-1 text-grey_4a">
              | Posted by: {data.createdBy.username}
            </Text>
          </View>
          <View className="self-start mx-2 my-1">
            <Text className="text-black text-lg font-medium">Skills</Text>
            <View className="flex-row flex-wrap">
              {data.skillsRequired.map(item => (
                <Text className="bg-light_purple p-2 mx-2 my-1 rounded-lg text-purple text-base font-medium">
                  {item}
                </Text>
              ))}
            </View>
          </View>
          <Text className="self-start mx-2 mt-2 text-black text-lg font-medium">
            Project description
          </Text>
          <Text className="self-start mx-4 text-grey_4a text-base">
            {data.description}
          </Text>
          {selfId === data.createdBy._id ? (
            <Pressable onPress={deleteAlert}>
              <Text className="text-base text-red-600 rounded-lg border border-red-400 py-3 px-6 my-4">
                DELETE
              </Text>
            </Pressable>
          ) : (
            <CustomButton
              title="Show Interest"
              onPress={() =>
                navigation.navigate('Chat', {
                  id: data.createdBy._id,
                  image: data.createdBy.image,
                  name: data.createdBy.username,
                  isGrpChat:false,
                  action: 'sendCollabMessage',
                  defaultMessage: 'Hello World',
                })
              }
            />
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RequirementDetailScreen;
