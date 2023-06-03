import {View, Text, Button, Pressable} from 'react-native';
import {useRef, useCallback, useMemo} from 'react';
import React from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {CameraIcon, PhotoIcon} from 'react-native-heroicons/solid';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {Colors} from '../colors';

const ImageBottomSheet = ({navigation,ref}) => {
  const {dismiss} = useBottomSheetModal();

  // variables
  const snapPoints = useMemo(() => ['20%'], []);


  return (
    <View className="">
      
      <BottomSheetModal ref={ref} snapPoints={snapPoints}>
        <View className="flex mx-4">
          <Text className="text-lg font-bold text-black my-2">Select File</Text>
          <View className="flex flex-row justify-around">
            <View className="flex items-center">
              <Pressable
                onPress={() => {
                  dismiss();
                  navigation.navigate('Camera');
                }}>
                <View className="h-16 w-16 rounded-full border-2 border-gray-100 bg-white flex items-center justify-center">
                  <CameraIcon color={Colors.PRIMARY_BLUE} size={40} />
                </View>
              </Pressable>
              <Text>Camera</Text>
            </View>
            <View className="flex items-center">
              <Pressable>
                <View className="h-16 w-16 rounded-full border-2 border-gray-100 bg-white flex items-center justify-center">
                  <PhotoIcon color={Colors.PRIMARY_BLUE} size={40} />
                </View>
              </Pressable>
              <Text>Gallery</Text>
            </View>
          </View>
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default ImageBottomSheet;
