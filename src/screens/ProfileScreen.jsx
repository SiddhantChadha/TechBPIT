import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {
  Cog6ToothIcon,
  PencilIcon,
  PlusIcon,
} from 'react-native-heroicons/outline';
import CustomTopBar from '../components/CustomTopBar';
import {Colors} from '../colors';
import HorizontalLine from '../components/HorizontalLine';
import ProjectCard from '../components/ProjectCard';
import SocialLinks from '../components/SocialLinks';
import {Carousel} from 'react-native-snap-carousel-v4';
// import useUser from '../hooks/useUser';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {execute} from '../APIController/controller';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {UserContext} from '../context/UserIdContext';
import OptionsMenu from 'react-native-options-menu';
import ProjectSVG from '../assets/images/ic_add_projects.svg';
import {setAuthTokens, setSelfId} from '../EncryptedStorageHelper';
import {LoggedInContext} from '../context/LoggedInContext';
const ProfileScreen = ({navigation, route}) => {
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const [projectData, setProjectData] = useState([]);
  const selfId = useContext(UserContext);
  const setIsLoggedIn = useContext(LoggedInContext);
  const {id, name} = route.params;
  const settingIcon = (
    <Cog6ToothIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      // onPress={() => navigation.navigate('SetupProfile')}
    />
  );
  const navigateToEdit = () => {
    navigation.navigate('SetupProfile');
  };

  const logout = async () => {
    setAuthTokens(null, null);
    setSelfId(null);
    setIsLoggedIn(false);
  };

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_USER_PROFILE:
        setProfileData(data);
        setIsProfileLoading(false);
        break;
      case REST_COMMANDS.REQ_GET_USERS_PROJECT:
        setIsProjectsLoading(false);
        setProjectData(data);
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
    execute(
      REST_COMMANDS.REQ_GET_USERS_PROJECT,
      {id},
      onResponseReceived,
      onResponseFailed,
    );
  }, []);

  const settingsButton = id === selfId && (
    <View style={{alignItems: 'flex-end'}}>
      <OptionsMenu
        customButton={settingIcon}
        options={['Edit profile', 'Logout']}
        actions={[navigateToEdit, logout]}
      />
    </View>
  );

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{flex: 1}}>
      <CustomTopBar
        navigation={navigation}
        title={selfId == id ? 'PROFILE' : `${name}'s Profile`}
        showBackButton={!(selfId === id)}
        rightComponent={settingsButton}
      />
      {isProfileLoading || isProjectsLoading ? (
        <ScrollView>
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                }}
              />
              <View style={{flexGrow: 1}}>
                <View
                  style={{
                    width: '60%',
                    height: 22,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
                <View
                  style={{
                    width: '40%',
                    height: 18,
                    borderRadius: 5,
                    marginHorizontal: '5%',
                    marginTop: '5%',
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: '40%',
                height: 22,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '5%',
              }}
            />
            <View
              style={{
                width: '90%',
                height: 20,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '2%',
              }}
            />
            <View
              style={{
                width: '90%',
                height: 20,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '2%',
              }}
            />
            <View
              style={{
                width: '40%',
                height: 22,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '5%',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginHorizontal: '3%',
              }}>
              <View
                style={{
                  width: '30%',
                  height: 20,
                  borderRadius: 5,
                  marginHorizontal: '2%',
                  marginTop: '2%',
                }}
              />
              <View
                style={{
                  width: '20%',
                  height: 20,
                  borderRadius: 5,
                  marginHorizontal: '2%',
                  marginTop: '2%',
                }}
              />
              <View
                style={{
                  width: '30%',
                  height: 20,
                  borderRadius: 5,
                  marginHorizontal: '2%',
                  marginTop: '2%',
                }}
              />
              <View
                style={{
                  width: '50%',
                  height: 20,
                  borderRadius: 5,
                  marginHorizontal: '2%',
                  marginTop: '2%',
                }}
              />
              <View
                style={{
                  width: '30%',
                  height: 20,
                  borderRadius: 5,
                  marginHorizontal: '2%',
                  marginTop: '2%',
                }}
              />
              <View
                style={{
                  width: '30%',
                  height: 20,
                  borderRadius: 5,
                  marginHorizontal: '2%',
                  marginTop: '2%',
                }}
              />
              <View
                style={{
                  width: '20%',
                  height: 20,
                  borderRadius: 5,
                  marginHorizontal: '2%',
                  marginTop: '2%',
                }}
              />
              <View
                style={{
                  width: '30%',
                  height: 20,
                  borderRadius: 5,
                  marginHorizontal: '2%',
                  marginTop: '2%',
                }}
              />
            </View>

            <View
              style={{
                width: '40%',
                height: 22,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '5%',
              }}
            />
            <View
              style={{
                width: '80%',
                height: 20,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '2%',
              }}
            />
            <View
              style={{
                width: '80%',
                height: 20,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '2%',
              }}
            />
            <View
              style={{
                width: '80%',
                height: 20,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '2%',
              }}
            />
            <View
              style={{
                width: '50%',
                height: 20,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '5%',
              }}
            />
            <View
              style={{
                width: '70%',
                height: 150,
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '2%',
                marginBottom: '5%',
                alignSelf: 'center',
              }}
            />
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <ScrollView className="bg-gray-100">
          <View className="flex-row items-center m-4">
            <Image
              source={{
                uri: profileData.image,
              }}
              className="rounded-full w-20 h-20"
            />
            <View className="m-4">
              <Text className="text-xl text-black font-medium">
                {profileData.username}
              </Text>
              <Text className="text-base text-gray-500 font-medium">
                {profileData.city}, {profileData.state}
              </Text>
            </View>
          </View>
          <HorizontalLine />
          {profileData.about ? (
            <View>
              <Text className="mx-4 text-base text-black font-medium">
                About
              </Text>
              <Text className="mx-4 text-base text-gray-500">
                {profileData.about}
              </Text>
              <HorizontalLine />
            </View>
          ) : (
            <></>
          )}
          {profileData.skills.length ? (
            <View>
              <Text className="mx-4 text-base text-black font-medium">
                Skills
              </Text>
              <View className="flex-row flex-wrap mx-3">
                {profileData.skills &&
                  profileData.skills.map(skill => (
                    <Text className="bg-gray-500 p-2 m-1 rounded-lg text-white">
                      {skill}
                    </Text>
                  ))}
              </View>
              <HorizontalLine />
            </View>
          ) : (
            <></>
          )}
          {profileData.socialLinks.length ? (
            <View>
              <Text className="mx-4 text-base text-black font-medium">
                Social/Portfolio
              </Text>
              <View className="mx-4">
                {profileData.socialLinks &&
                  profileData.socialLinks.map(link => (
                    <SocialLinks
                      image={link.platformImg}
                      link={link.platformLink}
                    />
                  ))}
              </View>
              <HorizontalLine />
            </View>
          ) : (
            <></>
          )}
          {selfId === id ? (
            projectData.length ? (
              <View>
                <View className="flex-row justify-between px-4">
                  <Text className="text-base text-black font-medium">
                    Projects
                  </Text>
                  <PlusIcon
                    color={Colors.BLACK}
                    onPress={() => navigation.navigate('AddProject')}
                  />
                </View>
                <Carousel
                  data={projectData}
                  sliderWidth={screenWidth}
                  itemWidth={screenWidth - 80}
                  renderItem={item => (
                    <ProjectCard item={item} navigation={navigation} />
                  )}
                  keyExtractor={item => item._id}
                  layout="stack"
                  autoplay={true}
                />
              </View>
            ) : (
              <View>
                <View className="flex-row justify-between px-4">
                  <Text className="text-base text-black font-medium">
                    Projects
                  </Text>
                  <PlusIcon color={Colors.BLACK} />
                </View>
                <ProjectSVG style={{alignSelf: 'center', margin: 10}} />
                <Text className="text-base text-grey_4a font-medium self-center mb-10">
                  Add Your Projects
                </Text>
              </View>
            )
          ) : projectData.length ? (
            <View>
              <View className="flex-row justify-between px-4">
                <Text className="text-base text-black font-medium">
                  Projects
                </Text>
              </View>
              <Carousel
                data={projectData}
                sliderWidth={screenWidth}
                itemWidth={screenWidth - 80}
                renderItem={item => (
                  <ProjectCard item={item} navigation={navigation} />
                )}
                layout="stack"
                keyExtractor={item => item._id}
                autoplay={true}
              />
            </View>
          ) : (
            <View></View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ProfileScreen;
