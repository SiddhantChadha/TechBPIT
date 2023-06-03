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
        marginVertical: '5%',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: '4%',
      }}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
    />
  );
});

export default InputBox;
