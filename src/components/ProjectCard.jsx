import {View, Text, Image} from 'react-native';
import React from 'react';
import {dateStringToDDMMMYY} from '../Utils/DateTimeUtils';

const ProjectCard = ({navigation, item}) => {
  const itemData = item.item;

  return (
    <View className="mx-1 my-4 rounded-xl shadow-xl bg-white">
      <Image
        source={{
          uri: itemData.image,
        }}
        className="w-full aspect-video rounded-t-xl"
      />
      <Text className="text-lg text-black mx-4 my-1">{itemData.title}</Text>
      <Text className="text-base text-gray-500 mx-4 mb-3">
        {`${dateStringToDDMMMYY(
          itemData.duration.split(' - ')[0],
        )} - ${dateStringToDDMMMYY(itemData.duration.split(' - ')[1])}`}
      </Text>
    </View>
  );
};

export default ProjectCard;
