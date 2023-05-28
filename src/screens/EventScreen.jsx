import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useContext, useRef} from 'react';
import CommunityPostItem from '../components/CommunityPostItem';
import {execute} from '../APIController/controller';
import CustomTopBar from '../components/CustomTopBar';
import {ChatBubbleLeftIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import {REST_COMMANDS} from '../APIController/RestCommands';
import EventItem from '../components/EventItem';
import JoinCommunityCard from '../components/JoinCommunityCard';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';
import {checkIfDateStringUpcoming} from '../Utils/DateTimeUtils';
import Calendar from '../assets/images/ic_calendar.svg';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const EventScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const chatButton = (
    <ChatBubbleLeftIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      onPress={() => navigation.navigate('RecentChat')}
    />
  );
  const renderItem = item => {
    return <EventItem itemData={item} />;
  };

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_ALL_EVENTS:
        data = data.filter(item => checkIfDateStringUpcoming(item.eventDate));
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
      REST_COMMANDS.REQ_GET_ALL_EVENTS,
      {},
      onResponseReceived,
      onResponseFailed,
    );
  }, []);
  return (
    <View>
      <CustomTopBar
        navigation={navigation}
        title={'Upcoming Events'}
        rightComponent={chatButton}
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
      ) : data.length > 0 ? (
        <SafeAreaView>
          <FlatList
            data={data}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={item => item._id}
          />
        </SafeAreaView>
      ) : (
        <View className="justify-center items-center p-10">
          <Calendar />
          <Text className="mt-12 font-medium text-gray-500">
            No Upcomig Event Found :/
          </Text>
        </View>
      )}
    </View>
  );
};

export default EventScreen;
