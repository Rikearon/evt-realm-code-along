import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {updateTodo} from '../services/models/todos/actions';

const Details = () => {
  const [title, setTitle] = useState('');

  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
      }}>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <TextInput
          value={title}
          style={styles.input}
          onChangeText={value => setTitle(value)}
          returnKeyLabel="Confirmar"
          returnKeyType="done"
        />

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addButtonText: {fontWeight: 'bold', color: '#fff', fontSize: 16},
  addButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#0082fe',
    shadowColor: '#444',
    shadowRadius: 2,
    shadowOffset: {width: 2, height: 1},
    shadowOpacity: 1,
    marginLeft: 10,
  },
  input: {
    padding: 10,
    backgroundColor: '#ccc',
    flex: 1,
    borderRadius: 5,
  },
});

export default Details;
