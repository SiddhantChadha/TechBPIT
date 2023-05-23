import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';

const SearchBar = () => {
  return (
    <View className="flex-row justify-start items-center border border-gray-500 rounded-lg my-2 mx-4 px-2">
      <MagnifyingGlassIcon color={Colors.GREY_4A} />
      <TextInput
        className="mx-2 text-base border-gray-500"
        placeholder={'Search'}
      />
    </View>
  );
};

export default SearchBar;
