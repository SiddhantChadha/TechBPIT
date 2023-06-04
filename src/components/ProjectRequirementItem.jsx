import {View, Text, Image} from 'react-native';
import React from 'react';
import {Colors} from '../colors';
import {UserGroupIcon} from 'react-native-heroicons/outline';

const ProjectRequirementItem = () => {
  const data = ['Node', 'Android', 'JavaScript', 'SQL'];
  return (
    <View className="shadow-xl p-4 bg-white rounded-lg mx-4 my-5">
      <View className="flex-row items-center ">
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROA1nkRAnQd11TU_uwpvfyM9mvkcw_FsgsvQ&usqp=CAU',
          }}
          className="rounded-md w-10 h-10 bg-white"
        />
        <Text className="text-black text-lg px-4 font-semibold">
          {'Deitor'}
        </Text>
      </View>
      <View className="flex-row items-center my-2 mx-1">
        <UserGroupIcon color={Colors.GREY_4A} />
        <Text className="mx-1 text-grey_4a">{'5'} Members</Text>
      </View>
      <View className="flex-row overflow-hidden">
        {data.map(item => (
          <Text className="bg-light_purple p-2 m-1 rounded-lg text-purple font-medium">
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default ProjectRequirementItem;
