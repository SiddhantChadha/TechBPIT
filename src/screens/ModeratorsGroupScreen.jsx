import {View, Text, FlatList, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import SearchedItem from '../components/SearchedItem';
import CustomTopBar from '../components/CustomTopBar';
import {UserContext} from '../context/UserIdContext';
import {execute} from '../APIController/controller';
import {REST_COMMANDS} from '../APIController/RestCommands';
import NoAccess from '../assets/images/ic_no_access.svg';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ModeratorsGroupScreen = ({navigation}) => {
  const selfId = useContext(UserContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_MANAGEABLE_GROUPS:
        setIsLoading(false);
        setData(data);
        break;
      default:
        break;
    }
  };
  const onResponseFailed = (command, error) => {};
  useEffect(() => {
    execute(
      REST_COMMANDS.REQ_GET_MANAGEABLE_GROUPS,
      {id: selfId},
      onResponseReceived,
      onResponseFailed,
    );
  }, []);
  return (
    <View>
      <CustomTopBar
        title={'Manage Groups'}
        showBackButton={true}
        navigation={navigation}
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
      ) : data.length ? (
        <View>
          <FlatList
            data={data}
            renderItem={item => (
              <Pressable
                onPress={() =>
                  navigation.navigate('CommunityDetail', {
                    id: item.item._id,
                    name: item.item.groupName,
                  })
                }>
                <SearchedItem item={item} />
              </Pressable>
            )}
            keyExtractor={item => item._id}
          />
        </View>
      ) : (
        <View className="items-center m-4">
          <NoAccess />
          <Text>You don't have acces to manage any groups :/</Text>
        </View>
      )}
    </View>
  );
};

export default ModeratorsGroupScreen;
