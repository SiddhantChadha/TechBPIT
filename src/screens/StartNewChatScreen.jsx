import {View, Text, FlatList, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import {execute} from '../APIController/controller';
import {REST_COMMANDS} from '../APIController/RestCommands';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import UserCard from '../components/UserCard';
import NotFound from '../assets/images/ic_not_found.svg';
import SearchBar from '../components/SearchBar';

const StartNewChatScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  const [searchedData, setSearchedData] = useState(data);

  const getSearchedString = text => {
    setSearchedData(filterData(data, text));
  };

  const clearData = () => {
    setSearchString('');
    setSearchedData(filterData(data, ''));
  };

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_ALL_USERS:
        setIsLoading(false);
        setData(data);
        setSearchedData(filterData(data, searchString));
        break;
      default:
        break;
    }
  };
  const onResponseFailed = (command, error) => {};
  useEffect(() => {
    execute(
      REST_COMMANDS.REQ_GET_ALL_USERS,
      {},
      onResponseReceived,
      onResponseFailed,
    );
  }, []);
  useEffect(() => {
    if (searchString.length < 3) {
      setSearchedData(filterData(data, ''));
    }
  }, [searchString]);
  return (
    <View className="bg-white flex-grow">
      <CustomTopBar
        title={'New Chat'}
        navigation={navigation}
        showBackButton={true}
      />
      <SearchBar
        searchString={searchString}
        setSearchString={setSearchString}
        getSearchedString={getSearchedString}
        clearData={clearData}
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
        </ScrollView>
      ) : searchedData.length ? (
        <View className="mb-4 flex-grow">
          <FlatList
            data={searchedData}
            renderItem={({item}) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('Chat', {
                    id: item._id,
                    image: item.image,
                    name: item.username,
                  })
                }>
                <UserCard itemData={item} />
              </Pressable>
            )}
            keyExtractor={item => item._id}
          />
        </View>
      ) : (
        <View className="items-center m-4 ">
          <NotFound />
          <Text className="text-base text-black">No Users Found :/</Text>
        </View>
      )}
    </View>
  );
};
const filterData = (data, text) => {
  if (text === '') {
    console.log(data);
    return data;
  }
  const filtererdList = data.filter(user => user.username.includes(text));
  console.log(filtererdList);
  return filtererdList;
};

export default StartNewChatScreen;
