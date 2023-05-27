import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import React from 'react';
import {PencilIcon, PlusIcon} from 'react-native-heroicons/outline';
import CustomTopBar from '../components/CustomTopBar';
import {Colors} from '../colors';
import HorizontalLine from '../components/HorizontalLine';
import ProjectCard from '../components/ProjectCard';
import SocialLinks from '../components/SocialLinks';
import {Carousel} from 'react-native-snap-carousel-v4';

const ProfileScreen = ({navigation}) => {
  const editProfileButton = (
    <PencilIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      onPress={() => navigation.navigate('SetupProfile')}
    />
  );
  const data = [
    'Android',
    'Java',
    'Node',
    'React',
    'React native',
    'SQL',
    'MonogDb',
    'Jenkins',
    'XML',
    'Javascript',
    'Agile',
    'Jira',
  ];
  const links = ['https://www.linkedin.com/feed/'];
  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <CustomTopBar
        navigation={navigation}
        title={'PROFILE'}
        rightComponent={editProfileButton}
      />
      <ScrollView className="bg-gray-100">
        <View className="flex-row items-center m-4">
          <Image
            source={{
              uri: 'https://media.licdn.com/dms/image/D4D03AQFceRkjbq5tdA/profile-displayphoto-shrink_400_400/0/1672917303490?e=1690416000&v=beta&t=SU4i3x_dMRcfSZqFf9noZzZwmi3xtih_idqVPD5QPdc',
            }}
            className="rounded-full w-20 h-20"
          />
          <View className="m-4">
            <Text className="text-xl text-black font-medium">Tushar Jain</Text>
            <Text className="text-base text-gray-500 font-medium">
              Shalimar Bagh, Delhi
            </Text>
          </View>
        </View>
        <HorizontalLine />
        <Text className="mx-4 text-base text-black font-medium">About</Text>
        <Text className="mx-4 text-base text-gray-500">
          Students | Programmer | Learner
        </Text>
        <HorizontalLine />
        <Text className="mx-4 text-base text-black font-medium">Skills</Text>
        <View className="flex-row flex-wrap mx-3">
          {data.map(skill => (
            <Text className="bg-gray-500 p-2 m-1 rounded-lg text-white">
              {skill}
            </Text>
          ))}
        </View>
        <HorizontalLine />
        <Text className="mx-4 text-base text-black font-medium">
          Social/Portfolio
        </Text>
        <View className="mx-4">
          {links.map(link => (
            <SocialLinks />
          ))}
        </View>
        <HorizontalLine />
        <View className="flex-row justify-between px-4">
          <Text className="text-base text-black font-medium">Projects</Text>
          <PlusIcon color={Colors.BLACK} className="" />
        </View>
        <Carousel
          data={data}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 80}
          renderItem={ProjectCard}
          layout="stack"
          autoplay={true}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
