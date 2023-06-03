import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import InputBox from '../components/InputBox';
import {Dropdown} from 'react-native-element-dropdown';
import CustomButton from '../components/CustomButton';
import AddSkillsInput from '../components/AddSkillInput';
import {MinusIcon, PlusIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';

const SetupProfileScreen = ({navigation, data}) => {
  const labelData = [
    {label: '1st year'},
    {label: '2nd year'},
    {label: '3rd year'},
    {label: '4th year'},
  ];

  const [value, setValue] = useState(null);
  const [addSocialLink, setAddSocialLink] = useState(false);
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{'lool'}</Text>
      </View>
    );
  };

  return (
    <ScrollView className="bg-white">
      <CustomTopBar
        title="Setup Profile"
        navigation={navigation}
        showBackButton={true}
      />
      <Text className="mx-10 my-2 text-center text-base font-medium">
        Hey! we need few details to setup your profile section
      </Text>
      <Image
        source={{
          uri: 'https://media.licdn.com/dms/image/C5103AQHExyLqyBIe8w/profile-displayphoto-shrink_800_800/0/1567182680271?e=1690416000&v=beta&t=x1EOjDxYtqSemAf6E3DUvLpiLQZOgzD1G_X6N8Ij3NY',
        }}
        className="rounded-full w-24 h-24 self-center"
      />

      <InputBox placeholder="Full Name" />
      <InputBox placeholder="State" />
      <InputBox placeholder="City" />
      <InputBox placeholder="About" />

      <Dropdown
        data={labelData}
        placeholder="Select year of study"
        labelField="label"
        valueField="label"
        value={value}
        style={{
          marginHorizontal: '10%',
          marginVertical: '5%',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: '4%',
          paddingVertical: '2%',
        }}
        onChange={item => {
          setValue(item.label);
        }}
      />
      <InputBox placeholder="Add Skills (Eg. Android, Node, Sql)" />
      {addSocialLink ? (
        <TouchableOpacity onPress={() => setAddSocialLink(!addSocialLink)}>
          <View className="rounded-xl mx-10 p-3 border my-5">
            <View className="flex-row items-center mb-4">
              <MinusIcon color={Colors.BLACK} size={20} />
              <Text className="mx-3 text-base">Add Social/Portfolio</Text>
            </View>
            <AddSkillsInput
              icon="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              title="Linkedin"
            />
            <AddSkillsInput
              icon="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              title="Github"
            />
            <AddSkillsInput
              icon="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3628885-3030025.png"
              title="LeetCode"
            />
            <AddSkillsInput
              icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAh1BMVEX///8hlvP/wQf0QzYAkfOlzvn//vr/wxX0QTT//Pz/vwD0PS/6r6v/8tb3dW70Nib/4aHc7f6s0/oAjvTn8v7s9f5Yrvn/67v1LxzV6fz/+Of/zUH/xAD/24b/2Hj/ySj909D8lpD3fHX8u7j8xMH4a2L4TUD/1Wz/0mD4hX//78n8npj+9PS/G8pbAAABPklEQVRoge3Z23KCMBCA4UAAQzgEUSEiVqTUHvT9n6/SXnRDMi0zXW7a/W9DvslwFRbGKIqivmtdhqByjUhvq01gtKm2WPbOC7xJgbdDwqspPVbh2Hvr3B9n36PgpRsvUfDQjYeEE074H8CbDNZg4tmhlbD2kKHhtZS+mfRrJLzxp/aow1fzC/xo23f9AQc/OfETDu6g760iwglfDu/OOezc4eFxr1VipPsYC88Vn6ZyJPxRWzbnesDBnxIHnuQoeMyFAxd8QZyLJfFFT0444YQTTjjhhBNO+NK4YK3LlquvnXPGrRfnLffCnp2f5y9g54xBce+8n7+yzIm/gZ0zRtydto8udDeOLax5izzCnXOG81dLF/o6LhS+NPMLZjbjt0KqtIJplX4uRHUBqyNm9fMPkduQwoab/QhFUf+nd2kgMGTKsuAOAAAAAElFTkSuQmCC"
              title="CodeForces"
            />
            <AddSkillsInput
              icon="https://i.pinimg.com/originals/c5/d9/fc/c5d9fc1e18bcf039f464c2ab6cfb3eb6.jpg"
              title="CodeChef"
            />
            <AddSkillsInput
              icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5mkSTH3D-x2VqgPa0lASyjPd86HGfVv_C1bZz_COdfOQl4QMxEjejDEcG_b_l1X7rDNY&usqp=CAU"
              title="Portfolio site"
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setAddSocialLink(!addSocialLink)}>
          <View className="flex-row items-center rounded-xl mx-10 my-5 p-3 border">
            <PlusIcon color={Colors.BLACK} size={20} />
            <Text className="mx-3 text-base">Add Social/Portfolio</Text>
          </View>
        </TouchableOpacity>
      )}

      <CustomButton title="Get Set Go" />
    </ScrollView>
  );
};

export default SetupProfileScreen;
