import openRealm from '../../realm';
import {Todo} from './schema';

export async function addTodo(payload) {
  console.log('trying to add todo', payload);
  try {
    const realm = await openRealm();

    realm.write(() => {
      realm.create(
        'Todo',
        new Todo({
          title: payload.title,
          description: `Test to course`,
          user: `Aron`,
          partition: 'all-users=all-the-users',
          date: new Date(),
        }),
      );
    });
  } catch (err) {
    console.log('error on addTodo: ', err);
  }
}

export async function removeTodo(todo) {
  try {
    const realm = await openRealm();
    // const todo = realm.objectForPrimaryKey('Todo', _id);

    realm.write(() => {
      realm.delete(todo);

      todo = null;
    });
  } catch (err) {
    console.log('error on removeTodo: ', err);
  }
}

export async function updateTodo(todo, payload) {
  try {
    const realm = await openRealm();

    realm.write(() => {
      Object.assign(todo, payload);
    });
  } catch (err) {
    console.log('error on updateTodo: ', err);
  }
}
