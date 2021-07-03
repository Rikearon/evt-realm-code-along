/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {addTodo, removeTodo} from './src/services/models/todos/actions';
import openRealm from './src/services/realm';
import {watch} from './src/services/realm/watch';

const App = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  // const handleAddTodo = () => {
  //   setTodos([...todos, todo]);
  //   setTodo('');
  // };

  const handleSubmitTodo = () => {
    // if (isEditing) return updateTodo(todo, user, todoEditingId);

    addTodo({title: todo});

    setTodo('');
  };

  useEffect(() => {
    loadRealm();
  }, []);

  const loadRealm = async () => {
    const realm = await openRealm();

    watch(realm, setTodos);

    const todos = realm.objects('Todo');

    setTodos(todos.sorted('date', true));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <TextInput value={todo} style={styles.input} onChangeText={setTodo} />

        <TouchableOpacity style={styles.addButton} onPress={handleSubmitTodo}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            onLongPress={() =>
              Alert.alert(
                'Tem certeza?',
                'Ao remover este Todo não é possível desfazer.',
                [
                  {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel',
                  },
                  {text: 'Sim', onPress: () => removeTodo(item)},
                ],
              )
            }>
            <View style={styles.itemView}>
              <Text style={styles.itemText}>{item.title}</Text>

              <Text style={styles.itemText}>
                {item.description} - {item.user}
              </Text>

              <Text style={styles.itemText}>
                Criado em: {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {padding: 10, flex: 1, justifyContent: 'center'},
  topRow: {flexDirection: 'row'},
  input: {
    backgroundColor: '#ccc',
    flex: 1,
    borderRadius: 5,
    padding: 10,
  },
  addButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#0082fe',
    shadowColor: '#444',
    shadowRadius: 2,
    shadowOpacity: 1,
    marginLeft: 10,
  },
  addButtonText: {fontWeight: 'bold', color: '#fff', fontSize: 22},
  itemView: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  itemText: {fontWeight: '700', color: '#444'},
});

export default App;
