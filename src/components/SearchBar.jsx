import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {MagnifyingGlassIcon, XMarkIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';

const SearchBar = ({
  searchString,
  setSearchString,
  getSearchedString,
  clearData,
}) => {
  return (
    <View className="flex-row justify-between items-center border border-gray-500 rounded-lg my-2 mx-4 px-2">
      <MagnifyingGlassIcon color={Colors.GREY_4A} />
      <TextInput
        className="mx-2 text-base border-gray-500 w-9/12"
        placeholder={'Search'}
        value={searchString}
        onChangeText={text => {
          setSearchString(text);
          if (text.length > 2) getSearchedString(text);
        }}
      />

      {searchString ? (
        <TouchableOpacity onPress={clearData}>
          <XMarkIcon color={Colors.GREY_4A} size={16} />
        </TouchableOpacity>
      ) : (
        <XMarkIcon size={16} />
      )}
    </View>
  );
};

export default SearchBar;
