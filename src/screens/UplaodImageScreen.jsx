import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {Colors} from '../colors';

const UplaodImageScreen = ({navigation, route}) => {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(route.params.edit ? true : false);

  useEffect(() => {
    const handleUpload = async uploadFile => {
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('upload_preset', 'admin-techbpit');
      const resp = await fetch(
        'https://api.cloudinary.com/v1_1/dmigta0dz/image/upload',
        {method: 'POST', body: formData},
      );
      const data = await resp.json();
      setLoading(false);
      setImage(data.secure_url);
    };

    if (route.params.edit) {
      handleUpload(route.params.file);
    }
  }, []);

  return (
    <View className="h-full bg-black flex ">
      <View className="flex-1 justify-center items-center">
        <Image
          source={{
            uri: route.params.file.uri,
          }}
          style={{
            width: '100%',
            aspectRatio: 1,
          }}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size={64}
          color={Colors.PRIMARY_BLUE}
          className="relative"
        />
      ) : (
        route.params.edit &&
        <View className="flex flex-row justify-evenly">
          <Pressable onPress={() => navigation.goBack()}>
            <Text className="text-white text-lg font-medium">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              route.params.action(image);
              navigation.goBack();
            }}>
            <Text className="text-white text-lg font-medium">OK</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default UplaodImageScreen;
