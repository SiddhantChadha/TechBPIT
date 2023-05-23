import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
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

const ExploreScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const onResponseReceived = (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_GET_ALL_POSTS:
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
      REST_COMMANDS.REQ_GET_ALL_POSTS,
      {},
      onResponseReceived,
      onResponseFailed,
    );
  }, []);
  const screenWidth = Dimensions.get('window').width;
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View>
      <CustomTopBar navigation={navigation} title={'Explore'} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <SearchBar />
          <Text className="text-black font-semibold text-base mx-4">
            Communities you may want to join
          </Text>
          <Carousel
            data={data}
            ref={isCarousel}
            sliderWidth={screenWidth}
            itemWidth={screenWidth - 50}
            layoutCardOffset={9}
            layout={'tinder'}
            onSnapToItem={index => setIndex(index)}
            useScrollView={true}
            renderItem={JoinCommunityCard}
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
          <Text className="text-black font-semibold text-base mx-4">
            People you may know{' '}
          </Text>
          <FlatList
            data={data}
            renderItem={PeopleMayKnowCard}
            numColumns={2}
            keyExtractor={item => item._id}
            className="p-4"
          />
        </ScrollView>
      )}
    </View>
  );
};

function getPostType(item) {
  if (item.postType === 'communityPost') return <PeopleMayKnowCard />;
}

export default ExploreScreen;
