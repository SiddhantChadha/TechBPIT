import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import {PencilSquareIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import {UserContext} from '../context/UserIdContext';
import {execute} from '../APIController/controller';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {dateStringToDDMMMYY} from '../Utils/DateTimeUtils';

const ProjectDetailScreen = ({navigation, route}) => {
  const [isApiCalling, setIsApiCalling] = useState(false);
  const {itemData, action} = route.params;

  const data = [
    {
      image: itemData.createdBy.image,
      username: itemData.createdBy.username,
      id: itemData.createdBy._id,
    },
    ...itemData.teamMembers,
  ];
  const selfId = useContext(UserContext);

  const editButton = itemData.createdBy._id === selfId && !isApiCalling && (
    <PencilSquareIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      onPress={() =>
        navigation.navigate('AddProject', {
          edit: true,
          id: itemData._id,
          selfImage: itemData.createdBy.image,
          username: itemData.createdBy.username,
          title: itemData.title,
          description: itemData.description,
          gitLink: itemData.gitLink,
          hostedLink: itemData.hostedLink,
          startDate: itemData.duration.split(' - ')[0],
          endDate: itemData.duration.split(' - ')[1],
          image: itemData.image,
          teamMembers: data,
          action,
        })
      }
    />
  );

  const UserCard = ({id, image, username}) => {
    return (
      <View className="flex items-center m-2">
        <Image source={{uri: image}} className="h-10 w-10 rounded-full mb-1" />
        {id === selfId ? <Text>You</Text> : <Text>{username}</Text>}
      </View>
    );
  };

  const deleteAlert = () =>
    Alert.alert('', 'Are you sure you want to delete this project?', [
      {
        text: 'Cancel',
      },
      {text: 'OK', onPress: deleteProject},
    ]);

  const onResponseReceived = async (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_DELETE_PROJECT:
        setIsApiCalling(false);
        action(d => !d);
        navigation.goBack();
        break;
      default:
        break;
    }
  };

  const onResponseFailed = (command, error) => {
    setIsApiCalling(false);
  };

  const deleteProject = () => {
    setIsApiCalling(true);
    execute(
      REST_COMMANDS.REQ_DELETE_PROJECT,
      {id: itemData._id},
      onResponseReceived,
      onResponseFailed,
    );
  };

  return (
    <View>
      <CustomTopBar
        navigation={navigation}
        showBackButton={true}
        title={itemData.title}
        rightComponent={editButton}
      />
      <ScrollView className="mx-[10%] my-[5%] flex-grow">
        <Image
          source={{
            uri: itemData.image,
          }}
          className="w-full aspect-video"
          showsVerticalScrollIndicator={false}
        />
        {itemData.description && (
          <View className="my-2">
            <Text className="text-black font-medium text-lg">Description</Text>
            <Text className="text-GREY_70 text-justify">
              {itemData.description}
            </Text>
          </View>
        )}

        <View className="my-2">
          <Text className="text-black font-medium text-lg">Duration</Text>
          <Text>
            {' '}
            {`${dateStringToDDMMMYY(
              itemData.duration.split(' - ')[0],
            )} - ${dateStringToDDMMMYY(itemData.duration.split(' - ')[1])}`}
          </Text>
        </View>
        <View>
          <Text className="text-black font-medium text-lg">Team Members</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({item}) => (
              <UserCard
                image={item.image}
                username={item.username}
                id={item.id}
              />
            )}
          />
        </View>

        {itemData.gitLink && (
          <View className="my-2">
            <Text className="text-black font-medium text-lg">Git Link</Text>
            <Text>{itemData.gitLink}</Text>
          </View>
        )}
        {itemData.hostedLink && (
          <View className="my-2">
            <Text className="text-black font-medium text-lg">Project Link</Text>
            <Text>{itemData.hostedLink}</Text>
          </View>
        )}
        {itemData.createdBy._id === selfId ? (
          <View className="flex items-center justify-center my-5">
            {isApiCalling ? (
              <Text className="text-base text-red-600 rounded-lg border border-red-400 py-3 px-6">
                DELETING...
              </Text>
            ) : (
              <Pressable onPress={deleteAlert}>
                <Text className="text-base text-red-600 rounded-lg border border-red-400 py-3 px-6">
                  DELETE
                </Text>
              </Pressable>
            )}
          </View>
        ) : (
          <View />
        )}
      </ScrollView>
    </View>
  );
};

export default ProjectDetailScreen;
