import {
  View,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import React, {forwardRef, useState, useEffect} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import SearchBar from './SearchBar';
import {execute} from '../APIController/controller';
import {REST_COMMANDS} from '../APIController/RestCommands';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import UserCard from './UserCard';
import NotFound from '../assets/images/ic_not_found.svg';
import {MinusCircleIcon, XMarkIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';

const AddTeamMemberBottomSheet = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [list, setList] = useState(props.data.slice(1));
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  const [searchedData, setSearchedData] = useState(data);
  const height = Dimensions.get('window').height;

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

  const addMember = (id, username, image) => {
    const idx = list.findIndex(e => e.id === id);
    if (idx == -1) {
      setList([...list, {id, image, username}]);
    }
  };

  const removeMember = id => {
    const newList = list.filter(e => e.id != id);
    setList(newList);
  };

  const SquareUserCard = ({id, image, username}) => {
    return (
      <View className="flex items-center m-2  p-1">
        <View>
          <Image
            source={{uri: image}}
            className="h-10 w-10 rounded-full mb-1"
          />
          <XMarkIcon
            color="black"
            style={{position: 'absolute', top: -5, right: -8}}
            size={16}
            onPress={() => removeMember(id)}
          />
        </View>
        <Text>{username}</Text>
      </View>
    );
  };

  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={true}
      height={height * 0.7}
      onClose={() =>
        props.setList(d => {
          return [d[0], ...list];
        })
      }>
      <View className="bg-white h-full">
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
          <View className="mb-4">
            <FlatList
              data={list}
              renderItem={({item}) => {
                return (
                  <SquareUserCard
                    id={item.id}
                    username={item.username}
                    image={item.image}
                  />
                );
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
            />

            <FlatList
              className="mt-[5%]"
              data={searchedData}
              renderItem={({item}) => (
                <Pressable
                  onPress={() =>
                    addMember(item._id, item.username, item.image)
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
    </RBSheet>
  );
});

const filterData = (data, text) => {
  if (text === '') {
    console.log(data);
    return data;
  }
  const filtererdList = data.filter(user => user.username.includes(text));
  console.log(filtererdList);
  return filtererdList;
};

export default AddTeamMemberBottomSheet;
