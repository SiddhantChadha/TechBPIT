import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {PencilIcon, PlusIcon} from 'react-native-heroicons/outline';
import CustomTopBar from '../components/CustomTopBar';
import {Colors} from '../colors';
import HorizontalLine from '../components/HorizontalLine';
import ProjectCard from '../components/ProjectCard';
import SocialLinks from '../components/SocialLinks';
import {Carousel} from 'react-native-snap-carousel-v4';
import useUser from '../hooks/useUser';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProfileScreen = ({navigation, route}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const selfId = useUser();
  const {id, name} = route.params;

  const projectData = [];

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_USER_PROFILE:
        setData(data);
        setLoading(false);
        break;
      default:
        break;
    }
  };
  const onResponseFailed = (command, error) => {};

  useEffect(() => {
    execute(
      REST_COMMANDS.REQ_GET_USER_PROFILE,
      {id},
      onResponseReceived,
      onResponseFailed,
    );
  }, []);

  const editProfileButton =
    id === selfId ? (
      <PencilIcon
        color={Colors.BLACK}
        style={{position: 'absolute', alignSelf: 'flex-end'}}
        onPress={() => navigation.navigate('SetupProfile')}
      />
    ) : (
      <></>
    );

  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <CustomTopBar
        navigation={navigation}
        title={selfId == id ? 'PROFILE' : `${name}'s Profile`}
        showBackButton={!(selfId === id)}
        rightComponent={editProfileButton}
      />
      {isLoading ? (
        <ScrollView>
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 20,
                  height: 65,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
            </View>
          </SkeletonPlaceholder>
          <HorizontalLine />
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 20,
                  height: 65,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
            </View>
          </SkeletonPlaceholder>
          <HorizontalLine />
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 20,
                  height: 100,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
            </View>
          </SkeletonPlaceholder>
          <HorizontalLine />
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View 
                style={{
                  width: 20,
                  height: 200,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
            </View>
          </SkeletonPlaceholder>
        
        </ScrollView>
      ) : (
        <ScrollView className="bg-gray-100">
          <View className="flex-row items-center m-4">
            <Image
              source={{
                uri: data.image,
              }}
              className="rounded-full w-20 h-20"
            />
            <View className="m-4">
              <Text className="text-xl text-black font-medium">
                {data.username}
              </Text>
              <Text className="text-base text-gray-500 font-medium">
                {data.city}, {data.state}
              </Text>
            </View>
          </View>
          <HorizontalLine />
          <Text className="mx-4 text-base text-black font-medium">About</Text>
          <Text className="mx-4 text-base text-gray-500">{data.about}</Text>
          <HorizontalLine />
          <Text className="mx-4 text-base text-black font-medium">Skills</Text>
          <View className="flex-row flex-wrap mx-3">
            {data.skills &&
              data.skills.map(skill => (
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
            {data.socialLinks &&
              data.socialLinks.map(link => (
                <SocialLinks
                  image={link.platformImg}
                  link={link.platformLink}
                />
              ))}
          </View>
          <HorizontalLine />
          <View className="flex-row justify-between px-4">
            <Text className="text-base text-black font-medium">Projects</Text>
            <PlusIcon color={Colors.BLACK} className="" />
          </View>
          <Carousel
            data={projectData}
            sliderWidth={screenWidth}
            itemWidth={screenWidth - 80}
            renderItem={ProjectCard}
            layout="stack"
            autoplay={true}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default ProfileScreen;
