import Realm from 'realm';
import {Todo} from '../models/todos/schema';

const appId = 'react-native-realm-anlwp'; // Set Realm app ID here.
const appConfig = {
  id: appId,
  timeout: 10000,
};

// Returns the shared instance of the Realm app.
export function getRealmApp() {
  return new Realm.App(appConfig);
}

export async function anonymousLogin() {
  let user;

  try {
    const app = new Realm.App(appConfig); // pass in the appConfig variable that you created earlier

    const credentials = Realm.Credentials.anonymous(); // create an anonymous credential

    user = await app.logIn(credentials);

    console.log('user: ', user);

    return user;
  } catch (error) {
    throw `Error logging in anonymously: ${JSON.stringify(error, null, 2)}`;
  }
}

async function openRealm() {
  let realm;

  try {
    const signedUser = await anonymousLogin();

    console.log(`Logged in with the user: ${JSON.stringify(signedUser)}`);

    const config = {
      schema: [Todo.schema],
      sync: {
        user: signedUser,
        partitionValue: 'all-users=all-the-users',
      },
    };

    realm = await Realm.open(config);

    return realm;
  } catch (error) {
    throw `Error opening realm: ${JSON.stringify(error, null, 2)}`;
  }
}

export default openRealm;
