import {TextInput, Modal} from 'react-native';
import React, {useState, forwardRef, useImperativeHandle} from 'react';

const DateInputBox = forwardRef((props, ref) => {
  const [data, setData] = useState(props.data);
  const [modalVisible, setModalVisible] = useState(false);

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
      <TextInput
        value={data}
        onChangeText={setData}
        style={{
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
          marginVertical: '3%',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: '4%',
          width: 150,
        }}
        placeholder={props.placeholder}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View className="bg-[rgba(0,0,0,0.5)] flex-1 justify-center items-center">
          <View className="bg-white ">
            {/* <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={false}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
              /> */}
          </View>
        </View>
      </Modal>
    </>
  );
});

export default DateInputBox;
