import {View, Text, Image} from 'react-native';
import React from 'react';
import {PencilIcon} from 'react-native-heroicons/outline';
import CustomTopBar from '../components/CustomTopBar';
import {Colors} from '../colors';
import HorizontalLine from '../components/HorizontalLine';

const ProfileScreen = ({navigation}) => {
  const editProfileButton = (
    <PencilIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      onPress={() => navigation.navigate('RecentChat')}
    />
  );
  return (
    <View>
      <CustomTopBar
        navigation={navigation}
        title={'PROFILE'}
        rightComponent={editProfileButton}
      />
      <View>
        <View className="flex-row">
          <Image
            source={{
              uri: 'https://media.licdn.com/dms/image/D4D03AQFceRkjbq5tdA/profile-displayphoto-shrink_400_400/0/1672917303490?e=1690416000&v=beta&t=SU4i3x_dMRcfSZqFf9noZzZwmi3xtih_idqVPD5QPdc',
            }}
            className="rounded-full w-12 h-12"
          />
          <View>
            <Text>Tushar Jain</Text>
            <Text>Shalimar Bagh, Delhi</Text>
          </View>
        </View>
        <HorizontalLine />
      </View>
    </View>
  );
};

export default ProfileScreen;
