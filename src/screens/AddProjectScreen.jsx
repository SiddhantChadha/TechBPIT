import {View, TextInput, Text, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import InputBox from '../components/InputBox';
import {ArrowTrendingUpIcon, PhotoIcon, UserPlusIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import DateTimeInputBox from '../components/DateTimeInputBox';
import CustomButton from '../components/CustomButton';

const AddProjectScreen = ({navigation}) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const gitLinkRef = useRef();
  const projectLinkRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [memberList,setMemberList] = useState([])

  const ButtonIcon = (
    <ArrowTrendingUpIcon color={Colors.WHITE} style={{marginHorizontal: 6}} />
  );


  return (
    <View>
      <CustomTopBar
        showBackButton={true}
        navigation={navigation}
        title="Add Project"
      />
      <ScrollView>
        <View className="mx-[10%] h-36 bg-gray-300 flex items-center justify-center my-[5%]">
          <PhotoIcon color={Colors.PRIMARY_BLUE} size={72} />
        </View>

        <InputBox placeholder="Title" ref={titleRef} />
        <InputBox placeholder="Description" ref={descriptionRef} />
        <InputBox placeholder="Git Link" ref={gitLinkRef} />
        <InputBox placeholder="Project Link" ref={projectLinkRef} />

        <View className="flex flex-row justify-between ">
          <View className="ml-[10%]">
            <Text className="text-grey_4a my-2">Start Date</Text>
            <DateTimeInputBox mode="date" ref={startDateRef} maximumDate={new Date(Date.now())}/>
          </View>
          <View className="mr-[10%]">
            <Text className="text-grey_4a my-2">End Date</Text>
            <DateTimeInputBox mode="date" ref={endDateRef} maximumDate={new Date(Date.now())}/>
          </View>
        </View>

        <View className="mx-[10%] my-[5%] flex flex-row items-center">
          <Text className="text-black text-lg">Team Members</Text>
          <View className="border border-black mx-3 rounded-md ">
            <UserPlusIcon color={Colors.PRIMARY_BLUE} />
          </View>
        </View>
       

        <CustomButton title="SAVE" icon={ButtonIcon}/>

      </ScrollView>
    </View>
  );
};

export default AddProjectScreen;
