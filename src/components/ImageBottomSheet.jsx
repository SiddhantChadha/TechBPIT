import {View, Text, Pressable} from 'react-native';
import React, {useCallback} from 'react';
import {CameraIcon, PhotoIcon} from 'react-native-heroicons/solid';
import {Colors} from '../colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import {forwardRef} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImageBottomSheet = forwardRef((props, ref) => {
  const onCameraPress = useCallback(async () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    const result = await launchCamera(options);
    ref.current.close();
    const file = {
      uri: result.assets[0].uri,
      type: result.assets[0].type,
      name: result.assets[0].fileName,
    };
    props.navigation.navigate('UploadImage', {file, action: props.action});
  }, []);

  const onImageLibraryPress = useCallback(async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    const result = await launchImageLibrary(options);

    ref.current.close();
    const file = {
      uri: result.assets[0].uri,
      type: result.assets[0].type,
      name: result.assets[0].fileName,
    };

    props.navigation.navigate('UploadImage', {
      file,
      action: props.action,
      id: props.receiver.id,
      image: props.receiver.image,
      name: props.receiver.name,
    });
  }, []);

  return (
    <RBSheet
      ref={ref}
      closeOnPressMask={true}
      height={150}
      animationType="fade">
      <View className="flex mx-4">
        <Text className="text-lg font-bold text-black my-2">Select File</Text>
        <View className="flex flex-row justify-around">
          <View className="flex items-center">
            <Pressable onPress={onCameraPress}>
              <View className="h-16 w-16 rounded-full border-2 border-gray-100 bg-white flex items-center justify-center">
                <CameraIcon color={Colors.PRIMARY_BLUE} size={40} />
              </View>
            </Pressable>
            <Text>Camera</Text>
          </View>
          <View className="flex items-center">
            <Pressable onPress={onImageLibraryPress}>
              <View className="h-16 w-16 rounded-full border-2 border-gray-100 bg-white flex items-center justify-center">
                <PhotoIcon color={Colors.PRIMARY_BLUE} size={40} />
              </View>
            </Pressable>
            <Text>Gallery</Text>
          </View>
        </View>
      </View>
    </RBSheet>
  );
});

export default ImageBottomSheet;
