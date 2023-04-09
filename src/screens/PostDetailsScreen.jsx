import {ScrollView, View, Text, Image} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';

const PostDetailsScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, justifyContent: 'center', marginVertical: 24}}>
        <ChevronLeftIcon
          color={Colors.BLACK}
          style={{position: 'absolute'}}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            color: Colors.BLACK,
            fontSize: 18,
            fontWeight: '600',
            alignSelf: 'center',
            marginHorizontal: '20%',
          }}>
          Event Details
        </Text>
      </View>

      <View style={{marginHorizontal: '10%'}}>
        <Image
          source={{
            uri: 'https://content.jdmagicbox.com/comp/ernakulam/m4/0484px484.x484.140206113128.a9m4/catalogue/we-create-events-panampilly-nagar-ernakulam-event-management-companies-nsobpzm660.jpg?clr=123354',
          }}
          style={{width: '90%', aspectRatio: 1,alignSelf:"center", marginVertical:10}}
        />
        <Text style={{fontSize: 34, color: Colors.BLACK, fontWeight: 'bold'}}>
          Welcome to NSCC
        </Text>
        <Text style={{fontSize: 16, marginVertical: 10}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ipsum,
          eligendi ipsam deleniti cumque, eum aspernatur suscipit quos eius sit
          nulla laudantium fugiat temporibus eveniet libero. Saepe quo impedit
          quaerat. Nemo ex quidem enim, ea, ut quos amet dolorem cupiditate
          accusantium eligendi nulla sequi voluptate, harum earum! Quos dicta
          praesentium perspiciatis! Totam dignissimos facere iste excepturi
          dolor perspiciatis repellendus maiores! Totam neque quos suscipit
          perspiciatis perferendis fugiat modi! Nulla consequuntur enim earum
          minus eius iure laudantium! Veniam ipsam maiores distinctio, delectus
          odio excepturi, minus deserunt doloremque labore, odit itaque
          deleniti? Voluptas deleniti eos, nihil aliquam voluptates debitis quae
          officia itaque ipsa nostrum ipsum. Neque obcaecati laborum recusandae
          suscipit veritatis harum quod enim mollitia reiciendis. Maiores omnis
          molestias deleniti repellat. Deserunt! Perferendis, quis quod eos
          dolores atque saepe laborum natus eveniet culpa odio quaerat corrupti
          veniam iste in harum fuga aliquid ipsam aspernatur eius? Qui deleniti
          autem sint voluptatibus repudiandae atque! Eius aut ipsam dignissimos
          aspernatur repellat magnam provident perferendis eos tenetur explicabo
          illo exercitationem, quae ad consequuntur magni totam sed tempora,
          asperiores reprehenderit et quasi minima enim ut quo. Voluptates.
          Aperiam voluptatem alias natus eligendi nam maiores quas vero. Tenetur
          velit fuga perspiciatis dolorem doloribus ullam repudiandae, at ab
          itaque culpa nesciunt, optio harum vel qui voluptatibus facere
          quisquam similique! Quis voluptatibus, molestiae eaque nemo vitae
          mollitia, beatae, voluptates reiciendis neque commodi odio provident.
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Image
            source={{
              uri: 'https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png',
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
            }}
            resizeMode="center"
          />
          <View style={{marginLeft: 10}}>
            <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>
              Tushar Jain
            </Text>
            <Text>Author</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Image
            source={{
              uri: 'https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png',
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
            }}
            resizeMode="center"
          />
          <View style={{marginLeft: 10}}>
            <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>
              NodeJS
            </Text>
            <Text>Owner</Text>
          </View>
        </View>

        <Text style={{marginVertical: 10}}>15 Jan 2023</Text>
      </View>
    </ScrollView>
  );
};

export default PostDetailsScreen;
