import {View, Text, Image, FlatList, ScrollView, Pressable} from 'react-native';
import React, {useContext} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import {PencilSquareIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import {UserContext} from '../context/UserIdContext';

const ProjectDetailScreen = ({navigation, route}) => {
  const {itemData} = route.params;
  const data = [
    {
      image: itemData.createdBy.image,
      username: itemData.createdBy.username,
      _id: itemData.createdBy._id,
    },
    ...itemData.teamMembers,
  ];
  const selfId = useContext(UserContext);

  const editButton = itemData.createdBy._id === selfId && (
    <PencilSquareIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      onPress={() => navigation.navigate('')}
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

  const deleteProject = () => {
    
  };

  return (
    <View>
      <CustomTopBar
        navigation={navigation}
        showBackButton={true}
        title={itemData.title}
        rightComponent={editButton}
      />
      <ScrollView className="mx-[10%] my-[5%]">
        <Image
          source={{
            uri: itemData.image,
          }}
          className="w-full aspect-video"
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
          <Text>{itemData.duration}</Text>
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
                id={item._id}
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

        <View className="flex items-center justify-center my-5">
          <Pressable onPress={deleteProject}>
            <Text className="text-base text-red-600 rounded-lg border border-red-400 py-3 px-6">
              DELETE
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProjectDetailScreen;
