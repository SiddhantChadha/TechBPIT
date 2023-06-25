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
import {Dropdown} from 'react-native-element-dropdown';
import CustomButton from '../components/CustomButton';
import AddSkillsInput from '../components/AddSkillInput';
import {MinusIcon, PlusIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import ImageBottomSheet from '../components/ImageBottomSheet';
import {ActivityIndicator} from 'react-native';
import {execute} from '../APIController/controller';
import {REST_COMMANDS} from '../APIController/RestCommands';

const labelData = [
  {label: '1st year'},
  {label: '2nd year'},
  {label: '3rd year'},
  {label: '4th year'},
];

const loadIcon = (
  <ActivityIndicator color="white" style={{marginHorizontal: 6}} />
);

const SetupProfileScreen = ({navigation, route}) => {
  const [year, setYear] = useState(labelData[0].label);
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
            platformImg: links[0].platformImg,
            platformLink: linkedInRef.current.getData(),
          },
          {
            platformImg: links[1].platformImg,
            platformLink: githubRef.current.getData(),
          },
          {
            platformImg: links[2].platformImg,
            platformLink: leetcodeRef.current.getData(),
          },
          {
            platformImg: links[3].platformImg,
            platformLink: codeforcesRef.current.getData(),
          },
          {
            platformImg: links[4].platformImg,
            platformLink: codechefRef.current.getData(),
          },
          {
            platformImg: links[5].platformImg,
            platformLink: portfolioRef.current.getData(),
          },
        ],
      },
      onResponseReceived,
      onResponseFailed,
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

      <Dropdown
        data={labelData}
        placeholder="Select year of study"
        labelField="label"
        valueField="label"
        value={year}
        style={{
          marginHorizontal: '10%',
          marginVertical: '5%',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: '4%',
          paddingVertical: '2%',
        }}
        onChange={item => {
          setYear(item.label);
        }}
      />
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
              icon={links[0].platformImg}
              title="Linkedin"
              ref={linkedInRef}
              data={links[0].platformLink}
            />
            <AddSkillsInput
              icon={links[1].platformImg}
              title="Github"
              ref={githubRef}
              data={links[1].platformLink}
            />
            <AddSkillsInput
              icon={links[2].platformImg}
              title="LeetCode"
              ref={leetcodeRef}
              data={links[2].platformLink}
            />
            <AddSkillsInput
              icon={links[3].platformImg}
              title="CodeForces"
              ref={codeforcesRef}
              data={links[3].platformLink}
            />
            <AddSkillsInput
              icon={links[4].platformImg}
              title="CodeChef"
              ref={codechefRef}
              data={links[4].platformLink}
            />
            <AddSkillsInput
              icon={links[5].platformImg}
              title="Portfolio site"
              ref={portfolioRef}
              data={links[5].platformLink}
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
  );
};

export default SetupProfileScreen;
