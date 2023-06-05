import {View, Text, Image, StyleSheet} from 'react-native';
import DoubleTick from '../assets/images/ic_double_tick.svg';
import React from 'react';
import {getColorCodeFromName} from '../Utils/NameToColorUtil';
import {convertToLocalTime} from '../Utils/DateTimeUtils';
import {
  CheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from 'react-native-heroicons/outline';
import {Colors} from '../colors';

export default function MessageComponent({
  item,
  receiver,
  receiverImg,
  receiverName,
}) {
  return (
    <View>
      {/* <Text className="self-center px-4 py-2 bg-gray-200 rounded-full text-gray-600">
        Today
      </Text> */}
      {(item.msgType === 'direct-message' ||
        item.msgType === 'group-message') &&
      item.receiver == receiver ? (
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
              <CheckIcon color={Colors.BLACK} />
            ) : item.isError ? (
              <ExclamationTriangleIcon color="red" />
            ) : (
              <ClockIcon color={Colors.GREY_4A} />
            )}
          </View>
        </View>
      ) : (
        <></>
      )}
      {(item.msgType === 'direct-message-with-image' ||
        item.msgType === 'group-message-with-image') &&
      item.receiver == receiver ? (
        <View className="mb-2">
          <View className="max-w-1/2 p-2  bg-primary_blue mx-1 rounded-b-md rounded-tl-md self-end">
            <Image
              source={{
                uri: item.imageUrl,
              }}
              style={{
                width: '100%',
                aspectRatio: 1,
              }}
            />
          </View>
          <View className="flex-row mx-2 self-end">
            <Text className="mx-1 text-xs">
              {convertToLocalTime(item.timestamp)}
            </Text>
            {item.isRead ? (
              <DoubleTick />
            ) : item.isSent ? (
              <CheckIcon color={Colors.BLACK} />
            ) : item.isError ? (
              <ExclamationTriangleIcon color="red" />
            ) : (
              <ClockIcon color={Colors.GREY_4A} />
            )}
          </View>
        </View>
      ) : (
        <></>
      )}
      {(item.msgType === 'direct-message' ||
        item.msgType === 'group-message') &&
      item.sender == receiver ? (
        <View className="mb-2">
          <View className="flex-row items-center">
            <Image
              source={{uri: receiverImg}}
              className="rounded-full h-8 w-8 mx-1"
            />
            <View className="max-w-1/2 p-4 bg-grey_f5 mx-1 rounded-b-lg rounded-tr-lg">
              <Text
                className="text-xs mb-1 font-semibold"
                style={{color: getColorCodeFromName(receiverName)}}>
                {receiverName}
              </Text>
              <Text className="text-black text-base">{item.message}</Text>
            </View>
          </View>
          <Text className="mx-12 text-xs">
            {convertToLocalTime(item.timestamp)}
          </Text>
        </View>
      ) : (
        <></>
      )}
      {(item.msgType === 'direct-message-with-image' ||
        item.msgType === 'group-message-with-image') &&
      item.sender == receiver ? (
        <View className="mb-2">
          <View className="flex-row items-end">
            <Image
              source={{
                uri: receiverImg,
              }}
              className="rounded-full h-8 w-8 bg-black mx-1 my-1 "
            />
            <View className="max-w-1/2 p-2  bg-grey_f5 mx-1 rounded-b-lg rounded-tr-lg">
              <Text
                className="text-xs mb-2 font-semibold"
                style={{color: getColorCodeFromName(receiverName)}}>
                {receiverName}
              </Text>
              <Image
                source={{
                  uri: item.imageUrl,
                }}
                style={{
                  width: '100%',
                  aspectRatio: 1,
                }}
              />
            </View>
          </View>
          <Text className="mx-12 text-xs">
            {convertToLocalTime(item.timestamp)}
          </Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
