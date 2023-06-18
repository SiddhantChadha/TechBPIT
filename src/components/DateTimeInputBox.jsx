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
        onPress={() => {
          if (props.editable) {
            setDatePickerVisibility(true);
          }
        }}
        style={{
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
          marginVertical: '3%',
        }}>
        <View pointerEvents="none">
          <TextInput
            value={
              props.mode === 'date'
                ? dateStringToWeekDayDDMMM(data)
                : dateStringToTime(data)
            }
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
        minimumDate={props.minimumDate}
        maximumDate={props.maximumDate}
        isVisible={isDatePickerVisible}
        date={data}
        mode={props.mode}
        onConfirm={date => {
          setDatePickerVisibility(false);
          setData(date);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </>
  );
});

export default DateTimeInputBox;
