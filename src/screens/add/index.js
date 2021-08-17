/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, View, Image, TouchableHighlight} from 'react-native';
import {Button} from 'react-native-paper';
import {inspect} from 'util';
import {useIpfs} from '../../ipfs-http-client';
import CameraRoll from '@react-native-community/cameraroll';
// import dataUriToBuffer from 'data-uri-to-buffer';
// import buffer from 'buffer';

const addString = (client) => async () => {
  console.log('Demo App .add string start');

  const file = {
    path: '/tmp/rn-ipfs-add-string',
    content: '邑中陽裏人也，姓劉氏。母媼嘗息大澤之陂，夢與神遇',
  };
  try {
    console.log('Demo App .add string', {
      result: inspect(await client.add(file)),
    });
  } catch (error) {
    console.error('Demo App .add string', {error});
  }
};

const addUint8Array = (client) => async () => {
  console.log('Demo App .add string start');

  const file = {
    path: '/tmp/rn-ipfs-add-uint8array',
    content: Uint8Array.from('123456789'),
  };
  try {
    console.log('Demo App .add Uint8Array', {
      result: inspect(await client.add(file)),
    });
  } catch (error) {
    console.error('Demo App .add Uint8Array', {error});
  }
};

const addUint8Arrays = (client) => async () => {
  console.log('Demo App .add Uint8Arrays start');

  const file = {
    path: '/tmp/rn-ipfs-add-uint8arrays',
    content: [
      Uint8Array.from('123456789'),
      Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    ],
  };
  try {
    console.log('Demo App .add Uint8Arrays', {
      result: inspect(await client.add(file)),
    });
  } catch (error) {
    console.error('Demo App .add Uint8Arrays', {error});
  }
};

const addNumbers = (client) => async () => {
  console.log('Demo App .add numbers start');

  const file = {
    path: '/tmp/rn-ipfs-add-numbers',
    content: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  };
  try {
    console.log('Demo App .add numbers', {
      result: inspect(await client.add(file)),
    });
  } catch (error) {
    console.error('Demo App .add numbers', {error});
  }
};

const addBlob = (client) => async () => {
  console.log('Demo App .add blob start');

  const buffer = new ArrayBuffer(9);
  const view = new Uint8Array(buffer);

  view.set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const file = {
    path: '/tmp/rn-ipfs-add-blob',
    content: new Blob(['React Native IPFS', view.buffer]),
  };
  try {
    console.log('Demo App .add blob', {
      result: inspect(await client.add(file)),
    });
  } catch (error) {
    console.error('Demo App .add blob', {error});
  }
};

const viewPhoto = (setPhotos) => async () => {
  console.log('Demo App .view photo start');
  const all = CameraRoll.getAlbums();
  console.log('all', all);

  CameraRoll.getPhotos({
    first: 20,
    assetType: 'Photos',
  }).then((r) => {
    setPhotos(r.edges);
    r.edges.forEach((img) => console.log(img.node));
  });
  // const buffer = new ArrayBuffer(9);
  // const view = new Uint8Array(buffer);

  // view.set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
};

const addPhoto = (photo, client) => async () => {
  console.log('Demo App .add photo start');
  // console.log('photo', photo);
  try {
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    console.log('blob', blob);
    const file = {
      path: photo.filename,
      content: blob,
    };
    const options = {
      wrapWithDirectory: true,
    };
    // console.log('Demo App .add photo', {
    //   result: inspect(await client.add(file)),
    // });
    const result = await client.add(file, options);
    console.log(
      `result --> ${result}`,
      result[0],
      result.cid,
      result.cid.toString(),
    );
    const url = `https://ipfs.io/ipfs/${result.cid.toString()}`;
    console.log(`Url --> ${url}`);
  } catch (error) {
    console.error('Demo App .add photo', {error});
  }
};

// const hasAndroidPermission = async () => {
//   const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

//   const hasPermission = await PermissionsAndroid.check(permission);
//   if (hasPermission) {
//     return true;
//   }

//   const status = await PermissionsAndroid.request(permission);
//   return status === 'granted';
// };

// const savePicture = async () => {
//   if (Platform.OS === "android" && !(await hasAndroidPermission())) {
//     return;
//   }

//   CameraRoll.save(tag, { type, album })
// };

const AddScreen = () => {
  const {client} = useIpfs();
  const [photos, setPhotos] = useState();

  return (
    <View>
      <Button mode="contained" onPress={addString(client)}>
        Add string
      </Button>
      <Button mode="contained" onPress={addUint8Array(client)}>
        Add Uint8Array
      </Button>
      <Button mode="contained" onPress={addUint8Arrays(client)}>
        Add Uint8Arrays
      </Button>
      <Button mode="contained" onPress={addNumbers(client)}>
        Add numbers
      </Button>
      <Button mode="contained" onPress={addBlob(client)}>
        Add blob
      </Button>
      <Button mode="contained" onPress={viewPhoto(setPhotos)}>
        Add Photo
      </Button>
      <ScrollView>
        {photos?.map((p, i) => {
          return (
            <TouchableHighlight
              key={i}
              onPress={addPhoto(p.node.image, client)}>
              <Image
                style={{
                  width: 300,
                  height: 100,
                }}
                source={{uri: p.node.image.uri}}
              />
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AddScreen;
