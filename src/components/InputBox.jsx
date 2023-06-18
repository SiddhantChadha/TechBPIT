import {TextInput} from 'react-native';
import React, {useState, forwardRef, useImperativeHandle} from 'react';

const InputBox = forwardRef((props, ref) => {
  const [data, setData] = useState(props.data);

  useImperativeHandle(
    ref,
    () => ({
      getData: () => {
        return data;
      },
    }),
    [data],
  );

  return (
    <TextInput
      value={data}
      onChangeText={setData}
      style={{
        marginHorizontal: '10%',
        marginVertical: '3%',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: '4%',
      }}
      placeholder={props.placeholder}
      keyboardType={props.keyboardType}
      secureTextEntry={props.secureTextEntry}
      editable={props.editable}
    />
  );
});

export default InputBox;
