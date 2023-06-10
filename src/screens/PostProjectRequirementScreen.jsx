import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import InputBox from '../components/InputBox';
import {Dropdown} from 'react-native-element-dropdown';
import CustomButton from '../components/CustomButton';
import AddSkillsInput from '../components/AddSkillInput';
import {MinusIcon, PlusIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';

const PostProjectRequirementScreen = ({navigation}) => {
  return (
    <ScrollView className="bg-white">
      <CustomTopBar
        title="Add Requirement"
        navigation={navigation}
        showBackButton={true}
      />
      <Text className="mx-10 my-2 text-center text-base font-medium">
        Hey! Add details to post your project requirements
      </Text>
      <Image
        source={{
          uri: 'https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png',
        }}
        className="rounded-md w-36 h-36 bg-white shadow-xl self-center"
      />
      <InputBox placeholder="Project Name" />
      <InputBox placeholder="No of Team members" />
      <InputBox placeholder="Project Description" />

      <InputBox placeholder="Add Required Skills (Eg. Android, Node, Sql)" />

      <CustomButton title="Get Set Go" />
    </ScrollView>
  );
};

export default PostProjectRequirementScreen;
