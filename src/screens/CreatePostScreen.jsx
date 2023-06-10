import {View, Text} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import InputBox from '../components/InputBox';
import {Dropdown} from 'react-native-element-dropdown';
import {Colors} from '../colors';
import CustomButton from '../components/CustomButton';
import {RocketLaunchIcon} from 'react-native-heroicons/outline';
import DateInputBox from '../components/DateInputBox';
import { dateStringToDDMMM, dateStringToTime } from '../Utils/DateTimeUtils';

const labelData = [{label: 'Online'}, {label: 'Offline'}];

const CreatePostScreen = ({navigation}) => {
  const [eventMode, setEventMode] = useState();
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

      <InputBox placeholder="Add Title" ref={titleRef} />
      <InputBox placeholder="Add Description" ref={descriptionRef} />
      <InputBox placeholder="Add Organizer Name" ref={organizerRef} />

      <View className="flex flex-row justify-between ">
        <DateInputBox marginLeft={'10%'} placeholder={`Date: ${dateStringToDDMMM(Date.now())}`} />
        <DateInputBox marginRight={'10%'} placeholder={`Time: ${dateStringToTime(Date.now())}`} />
      </View>

      <Dropdown
        data={labelData}
        placeholder="Select Event Mode"
        labelField="label"
        valueField="label"
        value={eventMode}
        style={{
          marginHorizontal: '10%',
          marginVertical: '5%',
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

      <InputBox
        placeholder={eventMode === 'Online' ? 'Add Meeting Link' : 'Add Venue'}
        ref={venueRef}
      />

      <CustomButton title="Post" icon={ButtonIcon} />
    </View>
  );
};

export default CreatePostScreen;
