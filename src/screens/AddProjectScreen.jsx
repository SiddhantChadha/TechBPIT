import {View, Text, ScrollView, Image, FlatList, Pressable} from 'react-native';
import React, {useRef, useState, useContext} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import InputBox from '../components/InputBox';
import {
  ArrowTrendingUpIcon,
  PhotoIcon,
  UserPlusIcon,
} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import DateTimeInputBox from '../components/DateTimeInputBox';
import CustomButton from '../components/CustomButton';
import {UserContext} from '../context/UserIdContext';
import AddTeamMemberBottomSheet from '../components/AddTeamMemberBottomSheet';
import {execute} from '../APIController/controller';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {ActivityIndicator} from 'react-native-paper';
import ImageBottomSheet from '../components/ImageBottomSheet';

const AddProjectScreen = ({navigation, route}) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const gitLinkRef = useRef();
  const projectLinkRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const selfId = useContext(UserContext);
  const bottomSheetRef = useRef(false);
  const [image, setImage] = useState(
    route.params ? route.params.image : undefined,
  );
  const {
    action,
    id,
    selfImage,
    username,
    title,
    description,
    gitLink,
    hostedLink,
    startDate,
    endDate,
    edit,
  } = route.params;
  const bottomSheet = useRef();
  const [memberList, setMemberList] = useState(
    route.params.teamMembers
      ? route.params.teamMembers
      : [{id: selfId, image: selfImage, username}],
  );
  const [isApiCalling, setIsApiCalling] = useState(false);

  const UserCard = ({id, image, username}) => {
    return (
      <View className="flex items-center m-2">
        <Image source={{uri: image}} className="h-10 w-10 rounded-full mb-1" />
        {id === selfId ? <Text>You</Text> : <Text>{username}</Text>}
      </View>
    );
  };

  const ButtonIcon = isApiCalling ? (
    <ActivityIndicator color="white" style={{marginHorizontal: 6}} />
  ) : (
    <ArrowTrendingUpIcon color={Colors.WHITE} style={{marginHorizontal: 6}} />
  );
  const onResponseReceived = async (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_POST_CREATE_PROJECT:
        setIsApiCalling(false);
        action(d => !d);
        navigation.goBack();
        break;
      case REST_COMMANDS.REQ_PATCH_UPDATE_PROJECT:
        setIsApiCalling(false);
        action(d => !d);
        navigation.navigate('Profile', {id: selfId});
      default:
        break;
    }
  };

  const onResponseFailed = (command, error) => {
    setIsApiCalling(false);
  };

  const saveOrUpdateProject = () => {
    setIsApiCalling(true);

    if (edit) {
      execute(
        REST_COMMANDS.REQ_PATCH_UPDATE_PROJECT,
        {
          id,
          title: titleRef.current.getData(),
          description: descriptionRef.current.getData(),
          gitLink: gitLinkRef.current.getData(),
          hostedLink: projectLinkRef.current.getData(),
          duration: `${startDateRef.current.getData()} - ${endDateRef.current.getData()}`,
          image,
          teamMembers: memberList.slice(1).map(member => member.id),
        },
        onResponseReceived,
        onResponseFailed,
      );
    } else {
      execute(
        REST_COMMANDS.REQ_POST_CREATE_PROJECT,
        {
          title: titleRef.current.getData(),
          description: descriptionRef.current.getData(),
          gitLink: gitLinkRef.current.getData(),
          hostedLink: projectLinkRef.current.getData(),
          duration: `${startDateRef.current.getData()} - ${endDateRef.current.getData()}`,
          image,
          teamMembers: memberList.slice(1).map(member => member.id),
        },
        onResponseReceived,
        onResponseFailed,
      );
    }
  };

  return (
    <View className="h-full">
      <CustomTopBar
        showBackButton={true}
        navigation={navigation}
        title={edit ? 'Update Project' : 'Add Project'}
      />
      <ScrollView>
        <Pressable onPress={() => bottomSheetRef.current.open()}>
          {image ? (
            <Image
              source={{uri: image}}
              className="mx-[10%] w-4/5 aspect-video my-[5%]"
            />
          ) : (
            <View className="mx-[10%] h-36 bg-gray-300 flex items-center justify-center my-[5%]">
              <PhotoIcon color={Colors.PRIMARY_BLUE} size={72} />
            </View>
          )}
        </Pressable>
        <InputBox
          placeholder="Title"
          ref={titleRef}
          editable={!isApiCalling}
          data={title}
        />
        <InputBox
          placeholder="Description"
          ref={descriptionRef}
          editable={!isApiCalling}
          data={description}
        />
        <InputBox
          placeholder="Git Link"
          ref={gitLinkRef}
          editable={!isApiCalling}
          data={gitLink}
        />
        <InputBox
          placeholder="Project Link"
          ref={projectLinkRef}
          editable={!isApiCalling}
          data={hostedLink}
        />

        <View className="flex flex-row justify-between ">
          <View className="ml-[10%]">
            <Text className="text-grey_4a my-2">Start Date</Text>
            <DateTimeInputBox
              mode="date"
              ref={startDateRef}
              maximumDate={new Date(Date.now())}
              data={startDate ? new Date(startDate) : undefined}
              editable={!isApiCalling}
            />
          </View>
          <View className="mr-[10%]">
            <Text className="text-grey_4a my-2">End Date</Text>
            <DateTimeInputBox
              mode="date"
              ref={endDateRef}
              data={endDate ? new Date(endDate) : undefined}
              maximumDate={new Date(Date.now())}
              editable={!isApiCalling}
            />
          </View>
        </View>

        <View className="mx-[10%] my-[5%] flex flex-row items-center">
          <Text className="text-black text-lg">Team Members</Text>
          <Pressable onPress={() => bottomSheet.current.open()}>
            <View className="border border-black mx-3 rounded-md ">
              <UserPlusIcon color={Colors.PRIMARY_BLUE} />
            </View>
          </Pressable>
        </View>

        <FlatList
          className="mx-[10%]"
          data={memberList}
          renderItem={({item}) => (
            <UserCard
              id={item.id}
              image={item.image}
              username={item.username}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
        />
        {isApiCalling ? (
          <CustomButton title="SAVING..." icon={ButtonIcon} />
        ) : (
          <CustomButton
            title="SAVE"
            icon={ButtonIcon}
            onPress={saveOrUpdateProject}
          />
        )}

        <AddTeamMemberBottomSheet ref={bottomSheet} data={memberList} setList={setMemberList} />
        <ImageBottomSheet
          ref={bottomSheetRef}
          action={setImage}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
};

export default AddProjectScreen;
