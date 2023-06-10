import {View, Text,ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import InputBox from '../components/InputBox';
import {Dropdown} from 'react-native-element-dropdown';
import {Colors} from '../colors';
import CustomButton from '../components/CustomButton';
import {RocketLaunchIcon} from 'react-native-heroicons/outline';
import DateTimeInputBox from '../components/DateTimeInputBox';
import {
  dateStringToDDMMM,
  dateStringToTime,
  dateStringToWeekDayDDMMM,
} from '../Utils/DateTimeUtils';

const labelData = [{label: 'Offline'}, {label: 'Online'}];

const CreatePostScreen = ({navigation}) => {
  const [eventMode, setEventMode] = useState(labelData[0].label);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const organizerRef = useRef();
  const venueRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();

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
        <InputBox placeholder="Add Title" ref={titleRef} />
        <InputBox placeholder="Add Description" ref={descriptionRef} />
        <InputBox placeholder="Add Organizer Name" ref={organizerRef} />

        <View className="flex flex-row justify-between ">
          <DateTimeInputBox
            mode="date"
            marginLeft={'10%'}
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

        <CustomButton title="Post" icon={ButtonIcon} />
      </ScrollView>
    </View>
  );
};

export default CreatePostScreen;
