import {View, Text, Image} from 'react-native';
import React from 'react';

const ProjectCard = () => {
  return (
    <View className="mx-1 my-4 rounded-xl shadow-xl bg-white">
      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROA1nkRAnQd11TU_uwpvfyM9mvkcw_FsgsvQ&usqp=CAU',
        }}
        className="w-full aspect-video rounded-t-xl"
      />
      <Text className="text-lg text-black mx-4 my-1">Quil Bot</Text>
      <Text className="text-base text-gray-500 mx-4 mb-3">
        25 Jan, 23 - 25 Jan, 23
      </Text>
    </View>
  );
};

export default ProjectCard;
