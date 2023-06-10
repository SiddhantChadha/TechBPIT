import {View, Text, Pressable} from 'react-native';
import React, {forwardRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

const posts = ['Event','Community', 'Resource'];

const PostBottomSheet = forwardRef((props, ref) => {
  return (
    <RBSheet
      ref={ref}
      closeOnPressMask={true}
      height={150}
      animationType="fade">
      <View className="flex items-center h-full">
        {posts.map((item, idx) => {
          return (
            <Pressable
              onPress={() => {
                ref.current.close();
                props.navigation.navigate('CreatePost',{type:item});
              }}
              className="border-b-[1px] border-grey_4a w-full h-1/3 flex justify-center"
              key={idx}>
              <Text className="text-center text-black font-medium text-base">
                Add {item} Post
              </Text>
            </Pressable>
          );
        })}
      </View>
    </RBSheet>
  );
});

export default PostBottomSheet;
