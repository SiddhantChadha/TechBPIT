import {View, Text, ScrollView, Image, Pressable} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import InputBox from '../components/InputBox';
import {Dropdown} from 'react-native-element-dropdown';
import {Colors} from '../colors';
import CustomButton from '../components/CustomButton';
import {PhotoIcon, ArrowTrendingUpIcon} from 'react-native-heroicons/outline';
import DateTimeInputBox from '../components/DateTimeInputBox';
import {
  dateStringToDDMMM,
  dateStringToTime,
  dateStringToWeekDayDDMMM,
} from '../Utils/DateTimeUtils';
import ImageBottomSheet from '../components/ImageBottomSheet';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';
import {ActivityIndicator} from 'react-native';

const labelData = [{label: 'Offline'}, {label: 'Online'}];

const CreatePostScreen = ({navigation, route}) => {
  const [eventMode, setEventMode] = useState(
    route.params.mode
      ? labelData[labelData.findIndex(e => e.label === route.params.mode)].label
      : labelData[0].label,
  );
  const [isApiCalling, setIsApiCalling] = useState(false);
  const [image, setImage] = useState(
    route.params.image ? route.params.image : undefined,
  );

  const bottomSheetRef = useRef(false);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const organizerRef = useRef();
  const venueRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const resourceLinkRef = useRef();
  const readTimeRef = useRef();
  const {
    edit,
    action,
    id,
    type,
    groupId,
    title,
    description,
    resourceLink,
    readTime,
    eventDate,
    eventTime,
    organizer,
    venue,
  } = route.params;

  const onResponseReceived = async (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_POST_CREATE_POST:
        setIsApiCalling(false);
        action(d => !d);
        navigation.goBack();
        break;
      case REST_COMMANDS.REQ_PATCH_UPDATE_POST:
        setIsApiCalling(false);
        action(d => !d);
        navigation.navigate('Home');
      default:
        break;
    }
  };

  const onResponseFailed = (command, error) => {
    setIsApiCalling(false);
  };

  const createOrUpdatePost = () => {
    setIsApiCalling(true);

    if (!edit) {
      execute(
        REST_COMMANDS.REQ_POST_CREATE_POST,
        {
          timestamp: Date.now(),
          postType: type,
          groupId,
          imageUrl: image ? image : undefined,
          eventDate:
            type == 'eventPost' ? dateRef.current.getData() : undefined,
          eventTime:
            type == 'eventPost' ? timeRef.current.getData() : undefined,
          mode: type == 'eventPost' ? eventMode : undefined,
          organizer:
            type === 'eventPost' ? organizerRef.current.getData() : undefined,
          topic: titleRef.current.getData(),
          description: descriptionRef.current.getData(),
          venue:
            type === 'eventPost' && eventMode === 'Offline'
              ? venueRef.current.getData()
              : undefined,
          link:
            type === 'resourcePost'
              ? resourceLinkRef.current.getData()
              : type === 'eventPost' && eventMode === 'Online'
              ? venueRef.current.getData()
              : undefined,
          resourceTime:
            type === 'resourcePost' ? readTimeRef.current.getData() : undefined,
          resourceTime:
            type === 'resourcePost' ? readTimeRef.current.getData() : undefined,
        },
        onResponseReceived,
        onResponseFailed,
      );
    } else {
      execute(
        REST_COMMANDS.REQ_PATCH_UPDATE_POST,
        {
          id,
          timestamp: Date.now(),
          imageUrl: image ? image : undefined,
          eventDate:
            type == 'eventPost' ? dateRef.current.getData() : undefined,
          eventTime:
            type == 'eventPost' ? timeRef.current.getData() : undefined,
          mode: type == 'eventPost' ? eventMode : undefined,
          organizer:
            type === 'eventPost' ? organizerRef.current.getData() : undefined,
          topic: titleRef.current.getData(),
          description: descriptionRef.current.getData(),
          venue: type === 'eventPost' ? venueRef.current.getData() : undefined,

          link:
            type === 'resourcePost'
              ? resourceLinkRef.current.getData()
              : type === 'eventPost'
              ? venueRef.current.getData()
              : undefined,
          resourceTime:
            type === 'resourcePost' ? readTimeRef.current.getData() : undefined,
        },
        onResponseReceived,
        onResponseFailed,
      );
    }
  };

  const ButtonIcon = isApiCalling ? (
    <ActivityIndicator color="white" style={{marginHorizontal: 6}} />
  ) : (
    <ArrowTrendingUpIcon color={Colors.WHITE} style={{marginHorizontal: 6}} />
  );

  return (
    <View className="bg-white h-full">
      <CustomTopBar
        navigation={navigation}
        showBackButton={true}
        title={edit ? 'Edit Post' : 'Create Post'}
      />
      <ScrollView>
        {(type === 'communityPost' || type === 'eventPost') && (
          <Pressable
            onPress={() => {
              if (!isApiCalling) bottomSheetRef.current.open();
            }}>
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
        )}
        <InputBox
          placeholder="Add Title"
          ref={titleRef}
          editable={!isApiCalling}
          data={title}
        />
        <InputBox
          placeholder="Add Description"
          ref={descriptionRef}
          editable={!isApiCalling}
          data={description}
        />
        {type === 'resourcePost' ? (
          <>
            <InputBox
              placeholder="Add Resource Link"
              ref={resourceLinkRef}
              editable={!isApiCalling}
              data={resourceLink}
            />
            <InputBox
              placeholder="Add Read Time"
              ref={readTimeRef}
              editable={!isApiCalling}
              data={readTime}
            />
          </>
        ) : (
          type === 'eventPost' && (
            <>
              <InputBox
                placeholder="Add Organizer Name"
                ref={organizerRef}
                editable={!isApiCalling}
                data={organizer}
              />

              <View className="flex flex-row justify-between ">
                <DateTimeInputBox
                  mode="date"
                  marginLeft={'10%'}
                  minimumDate={new Date(Date.now())}
                  placeholder={`Date: ${dateStringToWeekDayDDMMM(Date.now())}`}
                  editable={!isApiCalling}
                  ref={dateRef}
                  data={eventDate ? new Date(eventDate) : undefined}
                />
                <DateTimeInputBox
                  mode="time"
                  marginRight={'10%'}
                  placeholder={`Time: ${dateStringToTime(Date.now())}`}
                  editable={!isApiCalling}
                  ref={timeRef}
                  data={eventTime ? new Date(eventTime) : undefined}
                />
              </View>
              <View className="mx-[10%]">
                <Text className="text-grey_4a my-2">Select Event Mode</Text>
                <Dropdown
                  data={labelData}
                  labelField="label"
                  valueField="label"
                  value={eventMode}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: '4%',
                    paddingVertical: '2%',
                  }}
                  onChange={item => {
                    setEventMode(item.label);
                  }}
                  selectedTextStyle={{color: Colors.BLACK}}
                />
              </View>

              <InputBox
                placeholder={
                  eventMode === 'Online' ? 'Add Meeting Link' : 'Add Venue'
                }
                editable={!isApiCalling}
                ref={venueRef}
                data={venue}
              />
            </>
          )
        )}

        {isApiCalling ? (
          <CustomButton title="POSTING..." icon={ButtonIcon} />
        ) : (
          <CustomButton
            title="POST"
            icon={ButtonIcon}
            onPress={createOrUpdatePost}
          />
        )}

        <ImageBottomSheet
          ref={bottomSheetRef}
          action={setImage}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
};

export default CreatePostScreen;
