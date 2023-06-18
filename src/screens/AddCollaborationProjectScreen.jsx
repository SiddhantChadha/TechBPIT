import {View, Pressable, ScrollView} from 'react-native';
import React, {useState, useRef} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import CustomButton from '../components/CustomButton';
import InputBox from '../components/InputBox';
import {PhotoIcon, ArrowTrendingUpIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import ImageBottomSheet from '../components/ImageBottomSheet';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';
import {ActivityIndicator} from 'react-native-paper';

const AddCollaborationProjectScreen = ({navigation, route}) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const teamSizeRef = useRef();
  const skillsRef = useRef();
  const bottomSheetRef = useRef(false);
  const [isApiCalling, setIsApiCalling] = useState(false);
  let id, title, description, teamSize, skillsRequired;

  if (route.params) {
    id = route.params.id;
    title = route.params.title;
    description = route.params.description;
    teamSize = route.params.teamSize;
    skillsRequired = route.params.skillsRequired;
  }

  const onResponseReceived = async (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_POST_CREATE_COLLABORATION_PROJECT:
        setIsApiCalling(false);
        navigation.goBack();
        break;
      case REST_COMMANDS.REQ_PATCH_COLLABORATION_PROJECT:
        setIsApiCalling(false);
        navigation.goBack();
        break;
      default:
        break;
    }
  };

  const onResponseFailed = (command, error) => {
    setIsApiCalling(false);
  };

  const createOrUpdateCollaborationProject = () => {
    setIsApiCalling(true);

    if (route.params) {
      execute(
        REST_COMMANDS.REQ_PATCH_COLLABORATION_PROJECT,
        {
          id,
          title: titleRef.current.getData(),
          description: descriptionRef.current.getData(),
          teamSize: teamSizeRef.current.getData(),
          skillsRequired: skillsRef.current.getData().split(','),
        },
        onResponseReceived,
        onResponseFailed,
      );
    } else {
      execute(
        REST_COMMANDS.REQ_POST_CREATE_COLLABORATION_PROJECT,
        {
          title: titleRef.current.getData(),
          description: descriptionRef.current.getData(),
          teamSize: teamSizeRef.current.getData(),
          skillsRequired: skillsRef.current.getData().split(','),
        },
        onResponseReceived,
        onResponseFailed,
      );
    }
  };

  const ButtonIcon = (
    <ArrowTrendingUpIcon color={Colors.WHITE} style={{marginHorizontal: 6}} />
  );

  const loadIcon = (
    <ActivityIndicator color="white" style={{marginHorizontal: 6}} />
  );

  return (
    <View className="h-full">
      <CustomTopBar
        showBackButton={true}
        navigation={navigation}
        title="Add Collaboration Project"
      />
      <ScrollView>
        <Pressable onPress={() => bottomSheetRef.current.open()}>
          <View className="mx-[10%] h-36 bg-gray-300 flex items-center justify-center my-[5%]">
            <PhotoIcon color={Colors.PRIMARY_BLUE} size={72} />
          </View>
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
          placeholder="Team Size"
          ref={teamSizeRef}
          keyboardType="numeric"
          editable={!isApiCalling}
          data={teamSize && teamSize.toString()}
        />
        <InputBox
          placeholder="Skill Required"
          ref={skillsRef}
          editable={!isApiCalling}
          data={skillsRequired}
        />
        {isApiCalling ? (
          <CustomButton title="SAVING ..." icon={loadIcon} />
        ) : (
          <CustomButton
            title="SAVE"
            icon={ButtonIcon}
            onPress={createOrUpdateCollaborationProject}
          />
        )}

        <ImageBottomSheet ref={bottomSheetRef} />
      </ScrollView>
    </View>
  );
};

export default AddCollaborationProjectScreen;
