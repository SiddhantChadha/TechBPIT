import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useContext, useRef} from 'react';
import CommunityPostItem from '../components/CommunityPostItem';
import {execute} from '../APIController/controller';
import CustomTopBar from '../components/CustomTopBar';
import {ChatBubbleLeftIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import {REST_COMMANDS} from '../APIController/RestCommands';
import JoinCommunityCard from '../components/JoinCommunityCard';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';
import PeopleMayKnowCard from '../components/PeopleMayKnowCard';
import SearchBar from '../components/SearchBar';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SearchedItem from '../components/SearchedItem';
import ProjectCard from '../components/ProjectCard';
import ProjectRequirementItem from '../components/ProjectRequirementItem';

const ExploreScreen = ({navigation}) => {
  const [isGroupLoading, setGroupLoading] = useState(true);
  const [isUserLoading, setUserLoading] = useState(true);
  const [groupData, setGroupData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [userData, setUserData] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const [searchString, setSearchString] = useState('');

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_EXPLORE_GROUPS:
        setGroupData(data);
        setGroupLoading(false);
        break;
      case REST_COMMANDS.REQ_GET_SEARCH_EXPLORE:
        setSearchedData(data);
        console.log(data);
        break;
      case REST_COMMANDS.REQ_GET_EXPLORE_USERS:
        setUserData(data);
        setUserLoading(false);
        break;
      default:
        break;
    }
  };
  const onResponseFailed = (command, error) => {
    console.log(error);
  };

  useEffect(() => {
    execute(
      REST_COMMANDS.REQ_GET_EXPLORE_GROUPS,
      {},
      onResponseReceived,
      onResponseFailed,
    );
    execute(
      REST_COMMANDS.REQ_GET_EXPLORE_USERS,
      {count: 10},
      onResponseReceived,
      onResponseFailed,
    );
  }, []);

  useEffect(() => {
    if (searchString.length < 3) {
      setSearchedData([]);
    }
    console.log(searchedData);
  }, [searchString]);

  const getSearchedString = text => {
    console.log('MAking api calls');
    execute(
      REST_COMMANDS.REQ_GET_SEARCH_EXPLORE,
      {searchString: text},
      onResponseReceived,
      onResponseFailed,
    );
  };

  const clearData = () => {
    setSearchString('');
    setSearchedData([]);
  };

  return (
    <View style={{flex: 1}}>
      <CustomTopBar navigation={navigation} title={'Explore'} />
      {isGroupLoading || isUserLoading ? (
        <ScrollView>
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 20,
                  height: 40,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
            </View>
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
                marginTop: '5%',
                alignSelf: 'center',
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
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 2,
                  height: 150,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
              <View
                style={{
                  width: 2,
                  height: 150,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 2,
                  height: 150,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
              <View
                style={{
                  width: 2,
                  height: 150,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 2,
                  height: 150,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
              <View
                style={{
                  width: 2,
                  height: 150,
                  borderRadius: 5,
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  flexGrow: 1,
                }}
              />
            </View>
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
                width: '75%',
                borderRadius: 5,
                marginHorizontal: '5%',
                marginTop: '5%',
                alignSelf: 'center',
                aspectRatio: '3/4',
              }}
            />
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <ScrollView>
          <SearchBar
            searchString={searchString}
            setSearchString={setSearchString}
            getSearchedString={getSearchedString}
            clearData={clearData}
          />
          {searchString ? (
            <View>
              <FlatList
                data={searchedData}
                renderItem={item => <SearchedItem item={item} />}
                keyExtractor={item => item._id}
                scrollEnabled={false}
              />
            </View>
          ) : (
            <View>
              {groupData.length ? (
                <View>
                  <Text className="text-black font-semibold text-base mx-4">
                    Communities you may want to join
                  </Text>
                  <Carousel
                    data={groupData}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth - 50}
                    renderItem={item => <JoinCommunityCard item={item} navigation={navigation}/>}
                  />
                </View>
              ) : (
                <></>
              )}

              <View>
                <Text className="text-black font-semibold text-base mx-4">
                  Collaborate on Projects
                </Text>
                <FlatList
                  data={['Node', 'Android', 'JavaScript', 'SQL']}
                  renderItem={({items}) => (
                    <Pressable
                      onPress={() => navigation.navigate('RequirementDetails')}>
                      <ProjectRequirementItem />
                    </Pressable>
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: 16,
                  }}
                />
              </View>

              <Text className="text-black font-semibold text-base mx-4">
                People you may know{' '}
              </Text>
              <FlatList
                data={userData}
                renderItem={item => (
                  <PeopleMayKnowCard item={item} navigation={navigation} />
                )}
                numColumns={2}
                keyExtractor={item => item._id}
                scrollEnabled={false}
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingBottom: 16,
                }}
              />
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ExploreScreen;
