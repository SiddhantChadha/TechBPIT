import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomTopBar from '../components/CustomTopBar';
import {PlusIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import {Text} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const RecentChatScreen = () => {
  const newChatButton = (
    <PlusIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      // onPress={() => navigation.navigate('Chat')}
    />
  );
  return (
    <>
      <CustomTopBar title={'Recent Chats'} rightComponent={newChatButton} />
      {/* <Tab.Navigator>
        <Tab.Screen name="Personal" component={PersonalRecent} />
        <Tab.Screen name="Groups" component={GroupRecent} />
      </Tab.Navigator> */}
      {/* <Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore ullam
        et animi, iure repudiandae exercitationem enim possimus voluptas eius
        expedita, ex deleniti! Libero minus quisquam tempore, ipsa quaerat
        architecto placeat! Qui molestias, iure est ut exercitationem illo neque
        enim minima aliquid, ipsa facilis voluptas nihil nesciunt ea pariatur
        nisi beatae voluptatem atque, officiis distinctio ullam modi consequatur
        deserunt? Quod, cupiditate. Perferendis iure vero laborum quam facere
        earum, nisi, et, accusantium quidem error maiores. Asperiores enim
        commodi quisquam molestias voluptates modi maiores officiis! Quidem
        molestiae et alias reprehenderit vero molestias quod. Nemo fuga,
        consequatur eos nostrum porro aspernatur pariatur ipsum cumque quisquam,
        quia a eveniet omnis neque suscipit quam repellendus sequi
        necessitatibus dolorem amet nobis vel. Officia eaque eos totam expedita.
        Quasi at corrupti quaerat aliquam accusamus deserunt recusandae delectus
        enim, a eaque laudantium necessitatibus repellendus sequi, ipsam quod ea
        sed non. Eos maiores cupiditate at unde architecto adipisci natus fuga!
      </Text> */}
    </>
  );
};

export default RecentChatScreen;
