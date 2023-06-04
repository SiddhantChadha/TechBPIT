import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import CustomTopBar from '../components/CustomTopBar';
import {UserGroupIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import CustomButton from '../components/CustomButton';

const RequirementDetailScreen = ({navigation}) => {
  const data = [
    'Node',
    'Android',
    'JavaScript',
    'SQL',
    'AWS',
    'DevOps',
    'React',
    'REdux',
  ];

  return (
    <View className="bg-white flex-grow">
      <CustomTopBar
        title={'Requirement Details'}
        navigation={navigation}
        showBackButton={true}
      />
      <ScrollView>
        <View className="items-center ">
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROA1nkRAnQd11TU_uwpvfyM9mvkcw_FsgsvQ&usqp=CAU',
            }}
            className="rounded-md w-36 h-36 bg-white shadow-xl"
          />
          <Text className="text-2xl text-black font-medium">Deiotr Mettri</Text>
          <View className="flex-row items-center my-2 mx-1">
            <UserGroupIcon color={Colors.GREY_4A} />
            <Text className="mx-1 text-grey_4a">{'5'} Members</Text>
            <Text className="mx-1 text-grey_4a">| Posted by: Tushar Jain</Text>
          </View>
          <View className="self-start mx-2 ">
            <Text className="text-black text-lg font-medium">Skills</Text>
            <View className="flex-row flex-wrap">
              {data.map(item => (
                <Text className="bg-light_purple p-2 mx-2 my-1 rounded-lg text-purple text-base font-medium">
                  {item}
                </Text>
              ))}
            </View>
          </View>
          <Text className="self-start mx-2 mt-2 text-black text-lg font-medium">
            Project description
          </Text>
          <Text className="self-start mx-4 text-grey_4a text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            similique impedit dignissimos culpa eos officiis libero corporis
            omnis, laboriosam vel tenetur ratione debitis laudantium veniam
            atque incidunt molestiae! Nulla, maiores!
          </Text>
          <CustomButton
            title="Show Interest"
            onPress={() => console.log('clicked')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default RequirementDetailScreen;
