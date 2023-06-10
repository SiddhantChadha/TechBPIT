import {View, Text, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import InputBox from '../components/InputBox';
import {Dropdown} from 'react-native-element-dropdown';
import {Colors} from '../colors';
import CustomButton from '../components/CustomButton';
import {PhotoIcon, RocketLaunchIcon} from 'react-native-heroicons/outline';
import DateTimeInputBox from '../components/DateTimeInputBox';
import {
  dateStringToDDMMM,
  dateStringToTime,
  dateStringToWeekDayDDMMM,
} from '../Utils/DateTimeUtils';

const labelData = [{label: 'Offline'}, {label: 'Online'}];

const CreatePostScreen = ({navigation, route}) => {
  const [eventMode, setEventMode] = useState(labelData[0].label);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const organizerRef = useRef();
  const venueRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const tagsRef = useRef();
  const resourceLinkRef = useRef();
  const readTimeRef = useRef();
  const {type} = route.params;

  const ButtonIcon = (
    <RocketLaunchIcon color={Colors.WHITE} style={{marginHorizontal: 6}} />
  );

  return (
    <View className="bg-white h-full">
      <CustomTopBar
        navigation={navigation}
        showBackButton={true}
        title={'Create Post'}
      />
      <ScrollView>
        {(type === 'Community' || type === 'Event') && (
          <View className="mx-[10%] h-36 bg-gray-300 flex items-center justify-center my-[5%]">
            <PhotoIcon color={Colors.PRIMARY_BLUE} size={72} />
          </View>
        )}
        <InputBox placeholder="Add Title" ref={titleRef} />
        <InputBox placeholder="Add Description" ref={descriptionRef} />
        {type === 'Community' ? (
          <InputBox placeholder="Add Tags" ref={tagsRef} />
        ) : type === 'Resource' ? (
          <>
            <InputBox placeholder="Add Resource Link" ref={resourceLinkRef} />
            <InputBox placeholder="Add Read Time" ref={readTimeRef} />
          </>
        ) : (
          <>
            <InputBox placeholder="Add Organizer Name" ref={organizerRef} />

            <View className="flex flex-row justify-between ">
              <DateTimeInputBox
                mode="date"
                marginLeft={'10%'}
                minimumDate={new Date(Date.now())}
                placeholder={`Date: ${dateStringToWeekDayDDMMM(Date.now())}`}
                ref={dateRef}
              />
              <DateTimeInputBox
                mode="time"
                marginRight={'10%'}
                placeholder={`Time: ${dateStringToTime(Date.now())}`}
                ref={timeRef}
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
              ref={venueRef}
            />
          </>
        )}
        <CustomButton title="Post" icon={ButtonIcon} />
      </ScrollView>
    </View>
  );
};

export default CreatePostScreen;
