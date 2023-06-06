import {View, Text, FlatList, Pressable, Image} from 'react-native';
import React, {useState, useContext} from 'react';
import {ChevronDownIcon, ChevronUpIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import {UserContext} from '../context/UserIdContext';

const UserList = ({navigation, heading, data}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selfId = useContext(UserContext);

  const UserCard = ({image, username, id}) => (
    <Pressable
      onPress={() => {
        if (selfId != id) {
          navigation.navigate('Chat', {
            id,
            image,
            name: username,
            isGrpChat: false,
          });
        }
      }}>
      <View className="flex flex-row items-center bg-white mx-2 border-gray-200 border-t-2 p-2">
        <Image source={{uri: image}} className="h-14 w-14 rounded-full mx-2" />
        {selfId === id ? (
          <Text className="text-black text-lg">You</Text>
        ) : (
          <Text className="text-black text-lg">{username}</Text>
        )}
      </View>
    </Pressable>
  );

  return (
    <>
      {data.length != 0 && (
        <View className="my-1">
          <Pressable onPress={() => setIsOpen(!isOpen)}>
            <View className="bg-white flex flex-row justify-between items-center mx-2 rounded-sm px-3 py-1">
              <Text className="text-black text-lg">
                {heading} ({data.length})
              </Text>

              {isOpen ? (
                <ChevronUpIcon color={Colors.BLACK} />
              ) : (
                <ChevronDownIcon color={Colors.BLACK} />
              )}
            </View>
          </Pressable>
          {isOpen && (
            <FlatList
              data={data}
              renderItem={({item}) => (
                <UserCard
                  image={item.image}
                  username={item.username}
                  id={item._id}
                />
              )}
            />
          )}
        </View>
      )}
    </>
  );
};

export default UserList;
