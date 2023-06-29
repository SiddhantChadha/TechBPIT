import {View, Text, Image, Pressable} from 'react-native';
import DoubleTick from '../assets/images/ic_double_tick.svg';
import React from 'react';
import {getColorCodeFromName} from '../Utils/NameToColorUtil';
import {convertToLocalTime, dateStringToDDMMMYY} from '../Utils/DateTimeUtils';
import {
  CheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from 'react-native-heroicons/outline';
import {Colors} from '../colors';

export default function MessageComponent({
  item,
  selfId,
  receiverImg,
  receiverName,
  navigation,
}) {
  return (
    <View>
      {item.showDate && (
        <View className="flex flex-row justify-center my-2">
          <View className="bg-gray-200 rounded-sm px-2 py-1">
            <Text className="text-xs text-gray-800">
              {dateStringToDDMMMYY(Number(item.timestamp))}
            </Text>
          </View>
        </View>
      )}
      {(item.msgType === 'direct-message' ||
        item.msgType === 'group-message') &&
        (item.sender == selfId || item.sender?._id == selfId) && (
          <View className="mb-2">
            <Text className="text-white max-w-1/2 p-4 bg-primary_blue mx-1 rounded-b-lg rounded-tl-lg self-end">
              {item.message}
            </Text>
            <View className="flex-row mx-2 self-end">
              <Text className="mx-1 text-xs">
                {convertToLocalTime(item.timestamp)}
              </Text>
              {item.isRead ? (
                <DoubleTick />
              ) : item.isSent ? (
                <CheckIcon color={Colors.BLACK} size={16} />
              ) : item.isError ? (
                <ExclamationTriangleIcon color="red" size={16} />
              ) : (
                <ClockIcon color={Colors.GREY_4A} size={16} />
              )}
            </View>
          </View>
        )}
      {(item.msgType === 'direct-message-with-image' ||
        item.msgType === 'group-message-with-image') &&
        (item.sender == selfId || item.sender?._id == selfId) && (
          <View className="mb-2">
            <View className="max-w-1/2 p-2  bg-primary_blue mx-1 rounded-b-md rounded-tl-md self-end">
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
                    width: '100%',
                    aspectRatio: 1,
                  }}
                />
              </Pressable>
            </View>
            <View className="flex-row mx-2 self-end">
              <Text className="mx-1 text-xs">
                {convertToLocalTime(item.timestamp)}
              </Text>
              {item.isRead ? (
                <DoubleTick />
              ) : item.isSent ? (
                <CheckIcon color={Colors.BLACK} size={16} />
              ) : item.isError ? (
                <ExclamationTriangleIcon color="red" size={16} />
              ) : (
                <ClockIcon color={Colors.GREY_4A} size={16} />
              )}
            </View>
          </View>
        )}
      {(item.msgType === 'direct-message' ||
        item.msgType === 'group-message') &&
        item.sender != selfId &&
        item.sender._id != selfId && (
          <View className="mb-2">
            <View className="flex-row items-center">
              <Image
                source={{
                  uri:
                    item.msgType === 'group-message'
                      ? item.sender.image
                      : receiverImg,
                }}
                className="rounded-full h-8 w-8 mx-1"
              />
              <View className="max-w-1/2 p-4 bg-grey_f5 mx-1 rounded-b-lg rounded-tr-lg">
                <Text
                  className="text-xs mb-1 font-semibold"
                  style={{
                    color: getColorCodeFromName(
                      item.msgType === 'group-message'
                        ? item.sender.username
                        : receiverName,
                    ),
                  }}>
                  {item.msgType === 'group-message'
                    ? item.sender.username
                    : receiverName}
                </Text>
                <Text className="text-black text-base">{item.message}</Text>
              </View>
            </View>
            <Text className="mx-12 text-xs">
              {convertToLocalTime(item.timestamp)}
            </Text>
          </View>
        )}
      {(item.msgType === 'direct-message-with-image' ||
        item.msgType === 'group-message-with-image') &&
        item.sender != selfId &&
        item.sender._id != selfId && (
          <View className="mb-2">
            <View className="flex-row items-end">
              <Image
                source={{
                  uri:
                    item.msgType === 'group-message'
                      ? item.sender.image
                      : receiverImg,
                }}
                className="rounded-full h-8 w-8 bg-black mx-1 my-1 "
              />
              <View className="max-w-1/2 p-2  bg-grey_f5 mx-1 rounded-b-lg rounded-tr-lg">
                <Text
                  className="text-xs mb-2 font-semibold"
                  style={{
                    color: getColorCodeFromName(
                      item.msgType === 'group-message'
                        ? item.sender.username
                        : receiverName,
                    ),
                  }}>
                  {item.msgType === 'group-message'
                    ? item.sender.username
                    : receiverName}
                </Text>
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
                      width: '100%',
                      aspectRatio: 1,
                    }}
                  />
                </Pressable>
              </View>
            </View>
            <Text className="mx-12 text-xs">
              {convertToLocalTime(item.timestamp)}
            </Text>
          </View>
        )}
    </View>
  );
}
