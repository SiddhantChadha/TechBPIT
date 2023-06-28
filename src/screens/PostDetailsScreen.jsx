import {ScrollView, View, Text, Image, Pressable, Alert} from 'react-native';
import React from 'react';
import {Colors} from '../colors';
import {
  dateStringToDDMMM,
  dateStringToTime,
  timestampToAgoFormat,
} from '../Utils/DateTimeUtils';
import CustomTopBar from '../components/CustomTopBar';
import {execute} from '../APIController/controller';
import {REST_COMMANDS} from '../APIController/RestCommands';
import {PencilIcon} from 'react-native-heroicons/outline';

const headerTitle = postType => {
  if (postType === 'resourcePost') return 'Resource Details';
  if (postType === 'communityPost') return 'Post Details';
  if (postType === 'eventPost') return 'Event Details';
};
const PostDetailsScreen = ({route, navigation}) => {
  const item = route.params.itemData;
  const {action} = route.params;

  const deleteAlert = () =>
    Alert.alert('', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
      },
      {text: 'OK', onPress: deletePost},
    ]);

  const onResponseReceived = async (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_DELETE_POST:
        action(d => !d);
        navigation.goBack();
        break;
      default:
        break;
    }
  };

  const onResponseFailed = (command, error) => {
    console.log(error);
  };

  const deletePost = () => {
    execute(
      REST_COMMANDS.REQ_DELETE_POST,
      {id: item._id},
      onResponseReceived,
      onResponseFailed,
    );
  };

  const editButton = item.canEdit && (
    <PencilIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      onPress={() =>
        navigation.navigate('CreatePost', {
          edit: true,
          action,
          id: item._id,
          type: item.postType,
          groupId: item.groupId._id,
          title: item.topic,
          description: item.description,
          resourceLink: item.link,
          readTime: item.resourceTime,
          image: item.imageUrl,
          eventDate: item.eventDate,
          eventTime: item.eventTime,
          organizer: item.organizer,
          venue: item.venue,
          mode: item.mode,
        })
      }
    />
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CustomTopBar
        showBackButton={true}
        navigation={navigation}
        title={headerTitle(item.postType)}
        rightComponent={editButton}
      />
      <View style={{marginHorizontal: '10%'}}>
        {item.imageUrl && (
          <Pressable
            onPress={() =>
              navigation.navigate('UploadImage', {
                edit: false,
                file: {uri: item.imageUrl},
              })
            }>
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
          </Pressable>
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
              {dateStringToTime(item.eventTime)}
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

        <View className="flex flex-row">
          <Text style={{marginVertical: 10}}>
            {timestampToAgoFormat(item.timestamp)}
          </Text>

          {item.edited && <Text style={{marginVertical: 10}}> (Edited)</Text>}
        </View>

        {item.canEdit && (
          <Pressable
            onPress={deleteAlert}
            className="flex flex-row justify-center">
            <Text className="text-base text-red-600 rounded-lg border border-red-400 py-3 px-6 my-4 text-center w-3/4">
              DELETE
            </Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

export default PostDetailsScreen;
