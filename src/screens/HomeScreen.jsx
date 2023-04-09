import {SafeAreaView, FlatList, View, Text} from 'react-native';
import React from 'react';
import ResourceItem from '../components/ResourceItem';
import CommunityPostItem from '../components/CommunityPostItem';
import EventPostItem from '../components/EventPostItem';
import {ROUTES} from '../APIController/routes';

const DATA = [
  {
    _id: '63c3fb6f6b6759362cd85e68',
    author: {
      _id: '63add416bc3a132d96ce6cb2',
      username: 'Siddhant',
      image:
        'https://toppng.com/public/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png',
    },
    timestamp: '1673788271338',
    postType: 'resourcePost',
    groupId: {
      _id: '63add2285086f6fca8576f0c',
      groupName: 'NodeJs',
      image: 'https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png',
    },
    topic: 'web dev',
    description: 'this djshakrhsvs',
    resourceTime: '100 hours',
    link: 'www.trchbpit.com',
    canEdit: false,
  },
  {
    _id: '63c3d964fa117ab324758d97',
    author: {
      _id: '63add1dc5086f6fca8576f01',
      username: 'Tushar Jain',
      image:
        'http://res.cloudinary.com/dmigta0dz/image/upload/v1673687173/ts5pi0lvpocxs5wykesr.jpg',
    },
    timestamp: '1673779554627',
    postType: 'communityPost',
    groupId: {
      _id: '63add2285086f6fca8576f0c',
      groupName: 'NodeJs',
      image: 'https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png',
    },
    description: 'Bhai validation chal rhi h fir dikkt na ho rhne de mt chhed',
    canEdit: false,
  },
  {
    _id: '63c3d821fa117ab324758d7f',
    author: {
      _id: '63add1dc5086f6fca8576f01',
      username: 'Tushar Jain',
      image:
        'http://res.cloudinary.com/dmigta0dz/image/upload/v1673687173/ts5pi0lvpocxs5wykesr.jpg',
    },
    timestamp: '1673779231926',
    postType: 'eventPost',
    groupId: {
      _id: '63add2285086f6fca8576f0c',
      groupName: 'NodeJs',
      image: 'https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png',
    },
    eventDate: '2001-01-15T00:00:00.000Z',
    eventTime: '04:09 PM',
    mode: 'online',
    topic: 'Test topic',
    description: 'qwerty keypad qwerty keypad',
    link: 'meeting.com',
    canEdit: false,
  },
  {
    _id: '63c3d00b475a427468aa73c8',
    author: {
      _id: '63add1dc5086f6fca8576f01',
      username: 'Tushar Jain',
      image:
        'http://res.cloudinary.com/dmigta0dz/image/upload/v1673687173/ts5pi0lvpocxs5wykesr.jpg',
    },
    timestamp: '1673776868138',
    postType: 'eventPost',
    groupId: {
      _id: '63add2285086f6fca8576f0c',
      groupName: 'NodeJs',
      image: 'https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png',
    },
    imageUrl:
      'http://res.cloudinary.com/dmigta0dz/image/upload/v1673776694/rtko3kijhqxgbcg5jzqu.jpg',
    eventDate: '2001-01-21T00:00:00.000Z',
    eventTime: '03:00 AM',
    mode: 'offline',
    organizer: 'Gagan Arora',
    topic: "Code Rush X , NSCC BPIT's",
    description:
      "Hello there 👋\n\nIt's 2023 folks and what else could be the best way to get started this year than by participating in a major Coding Contest ☺😇😇\n\n\nWell the TIME has finally arrived for the 3rd Edition of Code Rush X , NSCC BPIT's flagship grand coding contest 📣🥳\n\nImportant ⚠⚠\nAll those who want to join NSCC BPIT are required to take part in this contest as we'll be shortlisting the candidates on the basis of their score in this contest. 😊😊\n\n𝗣.𝗦. This event happens only twice a year and you are invited to be a part of the best Global Coding Contest. ✨\n\nTeam NSCC BPIT\ncode your way to success 💻",
    resourceTime: '',
    venue: '6A, confeernce room, BPIT',
    link: 'https://meet.google.com/ymd-suxx-iyq?authuser=1',
    canEdit: false,
  },
  {
    _id: '63c2cf8f3a429eefb7ebec83',
    author: {
      _id: '63add1dc5086f6fca8576f01',
      username: 'Tushar Jain',
      image:
        'http://res.cloudinary.com/dmigta0dz/image/upload/v1673687173/ts5pi0lvpocxs5wykesr.jpg',
    },
    timestamp: '1673711503372',
    postType: 'communityPost',
    groupId: {
      _id: '63add2285086f6fca8576f0c',
      groupName: 'NodeJs',
      image: 'https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png',
    },
    imageUrl: '',
    eventDate: '2001-12-25T00:00:00.000Z',
    eventTime: '4:00 pm',
    organizer: '',
    topic: 'testing',
    description: 'what is this',
    resourceTime: '',
    venue: '',
    canEdit: false,
  },
  {
    _id: '63c1916573a9279f12743008',
    author: {
      _id: '63add1dc5086f6fca8576f01',
      username: 'Tushar Jain',
      image:
        'http://res.cloudinary.com/dmigta0dz/image/upload/v1673687173/ts5pi0lvpocxs5wykesr.jpg',
    },
    timestamp: '1673630051278',
    postType: 'eventPost',
    groupId: {
      _id: '63add2285086f6fca8576f0c',
      groupName: 'NodeJs',
      image: 'https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png',
    },
    imageUrl:
      'http://res.cloudinary.com/dmigta0dz/image/upload/v1673630044/hhql2vcvuz2i7i4uaxa5.jpg',
    eventDate: '2001-01-13T00:00:00.000Z',
    eventTime: '10:41 PM',
    mode: 'online',
    organizer: 'trryujn',
    topic: 'test post ',
    description: 'qwertyuiookjvvb',
    resourceTime: '',
    venue: '',
    link: 'qwetyu.com',
    canEdit: false,
  },
  {
    _id: '63b715e78f91b53a73eb8215',
    author: {
      _id: '63add416bc3a132d96ce6cb2',
      username: 'Siddhant',
      image:
        'https://toppng.com/public/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png',
    },
    timestamp: '1672943076431',
    postType: 'communityPost',
    groupId: {
      _id: '63add2285086f6fca8576f0c',
      groupName: 'NodeJs',
      image: 'https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png',
    },
    imageUrl: '',
    eventDate: '2001-12-25T00:00:00.000Z',
    eventTime: '4:00 pm',
    organizer: '',
    topic: 'Tweet Type',
    description: 'Bhai kuchh bhi likh rha hu mein iss time',
    resourceTime: '',
    venue: '',
    canEdit: false,
  },
  {
    _id: '63b712448f91b53a73eb81ca',
    author: {
      _id: '63add416bc3a132d96ce6cb2',
      username: 'Siddhant',
      image:
        'https://toppng.com/public/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png',
    },
    timestamp: '1672942141451',
    postType: 'communityPost',
    groupId: {
      _id: '63add2285086f6fca8576f0c',
      groupName: 'NodeJs',
      image: 'https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png',
    },
    imageUrl:
      'http://res.cloudinary.com/dmigta0dz/image/upload/v1672942130/t3q0mavhpgr5rfeaqiek.jpg',
    eventDate: '2001-12-25T00:00:00.000Z',
    eventTime: '4:00 pm',
    organizer: '',
    topic: 'qwertyu',
    description: 'qawsedrftgyhygfcdxcfvgbhnjhgtf',
    resourceTime: '',
    venue: '',
    canEdit: false,
  },
  {
    _id: '63b7118f8f91b53a73eb81aa',
    author: {
      _id: '63add1dc5086f6fca8576f01',
      username: 'Tushar Jain',
      image:
        'http://res.cloudinary.com/dmigta0dz/image/upload/v1673687173/ts5pi0lvpocxs5wykesr.jpg',
    },
    timestamp: '1672941958971',
    postType: 'eventPost',
    groupId: {
      _id: '63add2605086f6fca8576f14',
      groupName: 'Android',
      image:
        'https://1000logos.net/wp-content/uploads/2016/10/Android-Logo-2008.png',
    },
    imageUrl: '',
    eventDate: '2001-01-05T00:00:00.000Z',
    eventTime: '11:35 AM',
    mode: 'online',
    organizer: 'Tushar Jain',
    topic: 'Android Development',
    description: 'Introduction to android developement for beginners',
    resourceTime: '',
    venue: '',
    link: 'hululala.com',
    canEdit: false,
  },
  {
    _id: '63b463468c46569869db9da5',
    author: {
      _id: '63add1dc5086f6fca8576f01',
      username: 'Tushar Jain',
      image:
        'http://res.cloudinary.com/dmigta0dz/image/upload/v1673687173/ts5pi0lvpocxs5wykesr.jpg',
    },
    timestamp: '1672766273882',
    postType: 'resourcePost',
    groupId: {
      _id: '63add2285086f6fca8576f0c',
      groupName: 'NodeJs',
      image: 'https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png',
    },
    imageUrl:
      'http://res.cloudinary.com/dmigta0dz/image/upload/v1672766247/leaxviiuf0mc3ctvfvc3.jpg',
    eventDate: '2001-12-25T00:00:00.000Z',
    eventTime: '4:00 pm',
    organizer: '',
    topic: 'Tushar Test Post',
    description: 'Tushar test post text',
    resourceTime: '15 mins',
    venue: '',
    link: 'link.com',
    canEdit: false,
  },
];

const HomeScreen = () => {
  //   const DATA = getAllPosts();
  //   console.log(DATA);
  const BATA = ROUTES.getAllPosts();
  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        renderItem={({item}) => getPostType(item)}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
};

function getPostType(item) {
  if (item.postType === 'resourcePost') return <ResourceItem />;
  if (item.postType === 'communityPost') return <CommunityPostItem />;
  if (item.postType === 'eventPost') return <EventPostItem />;
}

export default HomeScreen;
