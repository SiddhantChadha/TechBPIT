import {ScrollView, View, Text, Image} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import {dateStringToDDMMM, timestampToAgoFormat} from '../Utils/DateTimeUtils';
import CustomTopBar from '../components/CustomTopBar';
const headerTitle = postType => {
  if (postType === 'resourcePost') return 'Resource Details';
  if (postType === 'communityPost') return 'Post Details';
  if (postType === 'eventPost') return 'Event Details';
  return 'kya ho rha h';
};
const PostDetailsScreen = ({route, navigation}) => {
  const item = route.params.itemData;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CustomTopBar
        showBackButton={true}
        navigation={navigation}
        title={headerTitle(item.postType)}
      />
      <View style={{marginHorizontal: '10%'}}>
        {item.imageUrl ? (
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={{
              width: '90%',
              aspectRatio: 1,
              alignSelf: 'center',
              marginVertical: 10,
            }}
          />
        ) : (
          <View />
        )}
        {item.topic ? (
          <Text style={{fontSize: 34, color: Colors.BLACK, fontWeight: 'bold'}}>
            {item.topic}
          </Text>
        ) : (
          <></>
        )}

        <Text
          style={{
            fontSize: 16,
            marginVertical: 10,
            color: Colors.BLACK,
          }}>
          {item.description}
        </Text>

        {item.organizer ? (
          <View className="flex-row items-center">
            <Text className="text-base font-medium text-black">
              Organizer:{' '}
            </Text>
            <Text className="text-base font-medium text-black">
              {item.organizer}
            </Text>
          </View>
        ) : (
          <></>
        )}

        {item.eventDate ? (
          <View className="flex-row items-center">
            <Text className="text-base font-medium text-black">Date: </Text>
            <Text className="text-base font-medium text-black">
              {dateStringToDDMMM(item.eventDate)}
            </Text>
          </View>
        ) : (
          <></>
        )}

        {item.eventTime ? (
          <View className="flex-row">
            <Text className="text-base font-medium text-black">Time: </Text>
            <Text className="text-base font-medium text-black">
              {item.eventTime}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {item.venue ? (
          <View className="flex-row">
            <Text className="text-base font-medium text-black">Venue: </Text>
            <Text className="text-base font-medium text-black">
              {item.venue}
            </Text>
          </View>
        ) : (
          <></>
        )}

        {item.resourceTime ? (
          <View className="flex-row ">
            <Text className="text-base font-medium text-black">
              Read Time:{' '}
            </Text>
            <Text className="text-base font-medium text-black">
              {item.resourceTime}
            </Text>
          </View>
        ) : (
          <></>
        )}

        {item.link ? (
          <View className="flex-row">
            <Text className="text-base font-medium text-black">Link: </Text>
            <Text className="text-base font-medium text-blue-500">
              {item.link}
            </Text>
          </View>
        ) : (
          <></>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Image
            source={{
              uri: item.author.image,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
            }}
            resizeMode="center"
          />

          <View style={{marginLeft: 10}}>
            <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>
              {item.author.username}
            </Text>
            <Text>Author</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Image
            source={{
              uri: item.groupId.image,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
            }}
            resizeMode="center"
          />
          <View style={{marginLeft: 10}}>
            <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>
              {item.groupId.groupName}
            </Text>
            <Text>Owner</Text>
          </View>
        </View>

        <Text style={{marginVertical: 10}}>
          {timestampToAgoFormat(item.timestamp)}
        </Text>
      </View>
    </ScrollView>
  );
};

export default PostDetailsScreen;
