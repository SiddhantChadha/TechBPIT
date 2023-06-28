import {View, Text, Image} from 'react-native';
import React from 'react';
import {Colors} from '../colors';
import {UserGroupIcon} from 'react-native-heroicons/outline';

const ProjectRequirementItem = props => {
  const {image, title, teamSize, skillsRequired} = props.data;

  return (
    <View className="shadow-xl p-4 bg-white rounded-lg mx-4 my-5 w-80">
      <View className="flex-row items-center ">
        <Image
          source={{
            uri: image,
          }}
          className="rounded-md w-10 h-10 bg-white"
        />
        <Text className="text-black text-lg px-4 font-semibold">{title}</Text>
      </View>
      <View className="flex-row items-center my-2 mx-1">
        <UserGroupIcon color={Colors.GREY_4A} />
        <Text className="mx-1 text-grey_4a">{teamSize} Members</Text>
      </View>
      <View className="flex-row truncate">
        {skillsRequired.map(item => (
          <Text className="bg-light_purple p-2 m-1 rounded-lg text-purple font-medium">
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default ProjectRequirementItem;
