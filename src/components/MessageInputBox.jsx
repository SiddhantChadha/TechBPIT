import {View, TextInput} from 'react-native';
import React, {useState} from 'react';

const MessageInputBox = () => {
  const [data, setData] = useState('');
  return (
    <View className="flex-grow">
      <TextInput
        value={data}
        onChangeText={setData}
        className="m-2 px-5 rounded-3xl border  border-grey_4a"
        placeholder={'Type a message'}
      />
    </View>
  );
};

export default MessageInputBox;
