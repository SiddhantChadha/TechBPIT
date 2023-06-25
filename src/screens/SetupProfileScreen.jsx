import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomTopBar from '../components/CustomTopBar';
import InputBox from '../components/InputBox';
import CustomButton from '../components/CustomButton';
import AddSkillsInput from '../components/AddSkillInput';
import {MinusIcon, PlusIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import ImageBottomSheet from '../components/ImageBottomSheet';
import {ActivityIndicator} from 'react-native';
import {execute} from '../APIController/controller';
import {REST_COMMANDS} from '../APIController/RestCommands';

const loadIcon = (
  <ActivityIndicator color="white" style={{marginHorizontal: 6}} />
);

const socialLinksIcons = [
  'https://cdn-icons-png.flaticon.com/512/174/174857.png',
  'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
  'https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3628885-3030025.png',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAh1BMVEX///8hlvP/wQf0QzYAkfOlzvn//vr/wxX0QTT//Pz/vwD0PS/6r6v/8tb3dW70Nib/4aHc7f6s0/oAjvTn8v7s9f5Yrvn/67v1LxzV6fz/+Of/zUH/xAD/24b/2Hj/ySj909D8lpD3fHX8u7j8xMH4a2L4TUD/1Wz/0mD4hX//78n8npj+9PS/G8pbAAABPklEQVRoge3Z23KCMBCA4UAAQzgEUSEiVqTUHvT9n6/SXnRDMi0zXW7a/W9DvslwFRbGKIqivmtdhqByjUhvq01gtKm2WPbOC7xJgbdDwqspPVbh2Hvr3B9n36PgpRsvUfDQjYeEE074H8CbDNZg4tmhlbD2kKHhtZS+mfRrJLzxp/aow1fzC/xo23f9AQc/OfETDu6g760iwglfDu/OOezc4eFxr1VipPsYC88Vn6ZyJPxRWzbnesDBnxIHnuQoeMyFAxd8QZyLJfFFT0444YQTTjjhhBNO+NK4YK3LlquvnXPGrRfnLffCnp2f5y9g54xBce+8n7+yzIm/gZ0zRtydto8udDeOLax5izzCnXOG81dLF/o6LhS+NPMLZjbjt0KqtIJplX4uRHUBqyNm9fMPkduQwoab/QhFUf+nd2kgMGTKsuAOAAAAAElFTkSuQmCC',
  'https://i.pinimg.com/originals/c5/d9/fc/c5d9fc1e18bcf039f464c2ab6cfb3eb6.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5mkSTH3D-x2VqgPa0lASyjPd86HGfVv_C1bZz_COdfOQl4QMxEjejDEcG_b_l1X7rDNY&usqp=CAU',
];

const SetupProfileScreen = ({navigation, route}) => {
  const [addSocialLink, setAddSocialLink] = useState(
    route.params.links?.length ? true : false,
  );
  const [image, setImage] = useState(route.params.image);
  const nameRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();
  const aboutRef = useRef();
  const skillRef = useRef();
  const bottomSheetref = useRef(false);
  const linkedInRef = useRef();
  const githubRef = useRef();
  const leetcodeRef = useRef();
  const codeforcesRef = useRef();
  const codechefRef = useRef();
  const portfolioRef = useRef();
  const [isApiCalling, setIsApiCalling] = useState(false);

  const {name, state, city, about, skills, links, action} = route.params;

  const onResponseReceived = async (command, data) => {
    switch (command) {
      case REST_COMMANDS.REQ_PATCH_UPDATE_PROFILE:
        setIsApiCalling(false);
        action(d => !d);
        navigation.goBack();
        break;
      default:
        break;
    }
  };

  const onResponseFailed = (command, error) => {
    setIsApiCalling(false);
  };

  const updateProfile = () => {
    setIsApiCalling(true);
    execute(
      REST_COMMANDS.REQ_PATCH_UPDATE_PROFILE,
      {
        username: nameRef.current.getData(),
        city: cityRef.current.getData(),
        state: stateRef.current.getData(),
        about: aboutRef.current.getData(),
        image,
        skills:
          skillRef.current.getData().trim().length > 0
            ? skillRef.current
                .getData()
                .trim()
                .replace(/(^[,\s]+)|([,\s]+$)/g, '')
                .split(',')
            : undefined,
        socialLinks: [
          {
            platformImg: socialLinksIcons[0],
            platformLink: linkedInRef.current.getData(),
          },
          {
            platformImg: socialLinksIcons[1],
            platformLink: githubRef.current.getData(),
          },
          {
            platformImg: socialLinksIcons[2],
            platformLink: leetcodeRef.current.getData(),
          },
          {
            platformImg: socialLinksIcons[3],
            platformLink: codeforcesRef.current.getData(),
          },
          {
            platformImg: socialLinksIcons[4],
            platformLink: codechefRef.current.getData(),
          },
          {
            platformImg: socialLinksIcons[5],
            platformLink: portfolioRef.current.getData(),
          },
        ],
      },
      onResponseReceived,
      onResponseFailed,
    );
  };

  return (
    <View className="bg-white h-full">
      <CustomTopBar
        title="Setup Profile"
        navigation={navigation}
        showBackButton={true}
      />
      <ScrollView className="bg-white">
        <Text className="mx-10 my-2 text-center text-base font-medium">
          Hey! we need few details to setup your profile section
        </Text>
        <Pressable onPress={() => bottomSheetref.current.open()}>
          <Image
            source={{
              uri: image,
            }}
            className="rounded-full w-24 h-24 self-center"
          />
        </Pressable>
        <InputBox placeholder="Full Name" ref={nameRef} data={name} />
        <InputBox placeholder="State" ref={stateRef} data={state} />
        <InputBox placeholder="City" ref={cityRef} data={city} />
        <InputBox placeholder="About" ref={aboutRef} data={about} />
        <InputBox
          placeholder="Add Skills (Eg. Android, Node, Sql)"
          ref={skillRef}
          data={skills}
        />
        {addSocialLink ? (
          <TouchableOpacity onPress={() => setAddSocialLink(!addSocialLink)}>
            <View className="rounded-xl mx-10 p-3 border my-5">
              <View className="flex-row items-center mb-4">
                <MinusIcon color={Colors.BLACK} size={20} />
                <Text className="mx-3 text-base">Add Social/Portfolio</Text>
              </View>
              <AddSkillsInput
                icon={socialLinksIcons[0]}
                title="Linkedin"
                ref={linkedInRef}
                data={
                  links[0]?.platformLink ? links[0].platformLink : undefined
                }
              />
              <AddSkillsInput
                icon={socialLinksIcons[1]}
                title="Github"
                ref={githubRef}
                data={
                  links[1]?.platformLink ? links[1].platformLink : undefined
                }
              />
              <AddSkillsInput
                icon={socialLinksIcons[2]}
                title="LeetCode"
                ref={leetcodeRef}
                data={
                  links[2]?.platformLink ? links[2].platformLink : undefined
                }
              />
              <AddSkillsInput
                icon={socialLinksIcons[3]}
                title="CodeForces"
                ref={codeforcesRef}
                data={
                  links[3]?.platformLink ? links[3].platformLink : undefined
                }
              />
              <AddSkillsInput
                icon={socialLinksIcons[4]}
                title="CodeChef"
                ref={codechefRef}
                data={
                  links[4]?.platformLink ? links[4].platformLink : undefined
                }
              />
              <AddSkillsInput
                icon={socialLinksIcons[5]}
                title="Portfolio site"
                ref={portfolioRef}
                data={
                  links[5]?.platformLink ? links[5].platformLink : undefined
                }
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

        {isApiCalling ? (
          <CustomButton title="SAVING ..." icon={loadIcon} />
        ) : (
          <CustomButton title="Get Set Go" onPress={updateProfile} />
        )}
        <ImageBottomSheet
          ref={bottomSheetref}
          navigation={navigation}
          action={setImage}
        />
      </ScrollView>
    </View>
  );
};

export default SetupProfileScreen;
