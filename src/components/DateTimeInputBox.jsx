import {TextInput, Pressable, View} from 'react-native';
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  dateStringToTime,
  dateStringToWeekDayDDMMM,
} from '../Utils/DateTimeUtils';
import {Colors} from '../colors';

const DateTimeInputBox = forwardRef((props, ref) => {
  const [data, setData] = useState(props.data);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
    <>
      <Pressable
        onPress={() => setDatePickerVisibility(true)}
        style={{
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
          marginVertical: '3%',
        }}>
        <View pointerEvents="none">
          <TextInput
            value={data}
            onChangeText={setData}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: '4%',
              width: 150,
              color: Colors.BLACK,
            }}
            editable={false}
            placeholder={props.placeholder}
          />
        </View>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={props.mode}
        onConfirm={date => {
          if (props.mode === 'date') {
            setData(dateStringToWeekDayDDMMM(date));
          } else {
            setData(dateStringToTime(date));
          }
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </>
  );
});

export default DateTimeInputBox;
