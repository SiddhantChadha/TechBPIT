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

const AddProjectScreen = ({navigation, route}) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const gitLinkRef = useRef();
  const projectLinkRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const selfId = useContext(UserContext);
  const {
    image,
    username,
    title,
    description,
    gitLink,
    hostedLink,
    startDate,
    endDate,
  } = route.params;
  const bottomSheet = useRef();
  const [memberList, setMemberList] = useState([{id: selfId, image, username}]);
  const [isApiCalling, setIsApiCalling] = useState(false);

  let d = new Date(Date.parse(startDate.toString()));
  console.log(startDate);

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
        navigation.goBack();
        break;
      case REST_COMMANDS.REQ_PATCH_UPDATE_PROJECT:

      default:
        break;
    }
  };

  const onResponseFailed = (command, error) => {
    setIsApiCalling(false);
  };

  const saveOrUpdateProject = () => {
    setIsApiCalling(true);
    execute(
      REST_COMMANDS.REQ_POST_CREATE_PROJECT,
      {
        title: titleRef.current.getData(),
        description: descriptionRef.current.getData(),
        gitLink: gitLinkRef.current.getData(),
        hostedLink: projectLinkRef.current.getData(),
        duration: `${startDateRef.current.getData()} - ${endDateRef.current.getData()}`,
      },
      onResponseReceived,
      onResponseFailed,
    );
  };

  return (
    <View className="h-full">
      <CustomTopBar
        showBackButton={true}
        navigation={navigation}
        title="Add Project"
      />
      <ScrollView>
        <View className="mx-[10%] h-36 bg-gray-300 flex items-center justify-center my-[5%]">
          <PhotoIcon color={Colors.PRIMARY_BLUE} size={72} />
        </View>

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
              data={startDate}
              editable={!isApiCalling}
              maximumDate={new Date(Date.now())}
            />
          </View>
          <View className="mr-[10%]">
            <Text className="text-grey_4a my-2">End Date</Text>
            <DateTimeInputBox
              mode="date"
              data={endDate}
              ref={endDateRef}
              editable={!isApiCalling}
              maximumDate={new Date(Date.now())}
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

        <AddTeamMemberBottomSheet ref={bottomSheet} />
      </ScrollView>
    </View>
  );
};

export default AddProjectScreen;
