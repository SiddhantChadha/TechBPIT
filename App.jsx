import React, {useEffect, useState} from 'react';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OTPScreen from './src/screens/OTPScreen';
import SignupScreen from './src/screens/SignupScreen';

import {Colors} from './src/colors';
import {getAccessToken, getSelfId} from './src/EncryptedStorageHelper';
import {LoggedInContext} from './src/context/LoggedInContext';
import {loggedInStateSetter} from './src/APIController/controller';
import ProfileScreen from './src/screens/ProfileScreen';
import RecentChatScreen from './src/screens/RecentChatScreen';
import SetupProfileScreen from './src/screens/SetupProfileScreen';
import {StatusBar} from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import {UserContext} from './src/context/UserIdContext';
import HomeTabs from './src/components/HomeTabs';
import UplaodImageScreen from './src/screens/UplaodImageScreen';
import CommunityDetailScreen from './src/screens/CommunityDetailScreen';
import PostDetailsScreen from './src/screens/PostDetailsScreen';
import ModeratorsGroupScreen from './src/screens/ModeratorsGroupScreen';
import StartNewChatScreen from './src/screens/StartNewChatScreen';
import RequirementDetailScreen from './src/screens/RequirementDetailScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import AddProjectScreen from './src/screens/AddProjectScreen';
import ProjectDetailScreen from './src/screens/ProjectDetailsScreen';
import AddCollaborationProjectScreen from './src/screens/AddCollaborationProjectScreen';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selfId, setSelfId] = useState(null);
  const checkIfLoggedIn = async () => {
    setSelfId(await getSelfId());
    if ((await getAccessToken()) != null) {
      setIsLoggedIn(true);
    } else {
      setSelfId(null);
    }
  };
  loggedInStateSetter(setIsLoggedIn);
  useEffect(() => {
    checkIfLoggedIn();
  }, [isLoggedIn]);
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);

  return (
    <SafeAreaProvider
      initialMetrics={{
        insets: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      }}>
      <LoggedInContext.Provider value={setIsLoggedIn}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={Colors.PRIMARY_BLUE}
        />
        <NavigationContainer>
          {selfId ? (
            <UserContext.Provider value={selfId}>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="HomeTabs" component={HomeTabs} />
                <Stack.Screen name="RecentChat" component={RecentChatScreen} />
                <Stack.Screen
                  name="SetupProfile"
                  component={SetupProfileScreen}
                />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen
                  name="UploadImage"
                  component={UplaodImageScreen}
                />
                <Stack.Screen
                  name="ViewUserProfile"
                  component={ProfileScreen}
                />
                <Stack.Screen
                  name="CommunityDetail"
                  component={CommunityDetailScreen}
                />
                <Stack.Screen
                  name="PostDetails"
                  component={PostDetailsScreen}
                />
                <Stack.Screen
                  name="RequirementDetails"
                  component={RequirementDetailScreen}
                />
                <Stack.Screen
                  name="ModeratorGroups"
                  component={ModeratorsGroupScreen}
                />
                <Stack.Screen
                  name="StartNewChat"
                  component={StartNewChatScreen}
                />
                <Stack.Screen name="CreatePost" component={CreatePostScreen} />
                <Stack.Screen name="AddProject" component={AddProjectScreen} />
                <Stack.Screen
                  name="ProjectDetails"
                  component={ProjectDetailScreen}
                />
                <Stack.Screen
                  name="AddCollaborationProject"
                  component={AddCollaborationProjectScreen}
                />
              </Stack.Navigator>
            </UserContext.Provider>
          ) : (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Otp" component={OTPScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </LoggedInContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
