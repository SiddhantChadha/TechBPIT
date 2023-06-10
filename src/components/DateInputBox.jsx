import {TextInput} from 'react-native';
import React, {useState, forwardRef, useImperativeHandle} from 'react';

const DateInputBox = forwardRef((props, ref) => {
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
        marginLeft:props.marginLeft,
        marginRight:props.marginRight,
        marginVertical: '3%',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: '4%',
        width:150
      }}
      placeholder={props.placeholder}
    />
  );
});

export default DateInputBox;
