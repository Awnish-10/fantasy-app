// MatchListScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { deleteMatch, updateMatch } from '../store';

const EditMatchModal: React.FC<{ match: any; onSave: (editedMatch: any) => void; onCancel: () => void }> = ({
  match,
  onSave,
  onCancel,
}) => {
  const [editedMatch, setEditedMatch] = useState({ ...match });

  const handleSave = () => {
    onSave(editedMatch);
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Edit Match Details:</Text>
      <Text>Event Name:</Text>
      <TextInput
        style={styles.input}
        value={editedMatch.eventName}
        onChangeText={(text) => setEditedMatch({ ...editedMatch, eventName: text })}
      />
      <Text>Participants:</Text>
      <TextInput
        style={styles.input}
        value={editedMatch.participants.join(', ')}
        onChangeText={(text) =>
          setEditedMatch({ ...editedMatch, participants: text.split(',').map((p) => p.trim()) })
        }
      />
      <Text>Time Slot:</Text>
      <TextInput
        style={styles.input}
        value={`${editedMatch.from} - ${editedMatch.to}`}
        onChangeText={(text) => {
          const [from, to] = text.split('-').map((time) => time.trim());
          setEditedMatch({ ...editedMatch, from, to });
        }}
      />
      {/* Add additional input fields for other details */}
      <Button title="Cancel" onPress={onCancel} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const MatchListScreen: React.FC = () => {
  const matches = useSelector((state: any) => state.matches);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const showDeleteModal = (match: any) => {
    setSelectedMatch(match);
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleDeleteMatch = () => {
    //@ts-ignore
    dispatch(deleteMatch(selectedMatch));
    hideDeleteModal();
  };

  const showEditModal = (match: any) => {
    setSelectedMatch(match);
    setEditModalVisible(true);
  };

  const hideEditModal = () => {
    setEditModalVisible(false);
  };

  const handleEditMatch = (editedMatch: any) => {
    dispatch(updateMatch(editedMatch));
    hideEditModal();
  };

  const renderMatchItem = ({ item }: { item: any }) => (
    <View style={styles.matchItemContainer}>
      <TouchableOpacity style={styles.matchItem} onPress={() => showEditModal(item)}>
        <Text style={styles.matchTitle}>{item.eventName}</Text>
        <Text>Date: {item.date}</Text>
        <Text>Participants: {item.participants.join(', ')}</Text>
        <Text>Time Slot: {item.from} - {item.to}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editButton} onPress={() => showEditModal(item)}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={() => showDeleteModal(item)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of Matches:</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.date}
        renderItem={renderMatchItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
     
      <Button title="Add Match" onPress={() =>{ 
        //@ts-ignore
        navigation.navigate('Calendar')} }/>

      {/* Delete Modal */}
      <Modal isVisible={isDeleteModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Confirm Delete?</Text>
          <Button title="Cancel" onPress={hideDeleteModal} />
          <Button title="Delete" onPress={handleDeleteMatch} />
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal isVisible={isEditModalVisible}>
        <EditMatchModal
          match={selectedMatch}
          onSave={handleEditMatch}
          onCancel={hideEditModal}
        />
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
      },
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    matchItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    matchItem: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 8,
      elevation: 2,
      flexDirection: 'column',
    },
    matchTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    separator: {
      height: 1,
      backgroundColor: '#ccc',
      marginVertical: 8,
    },
    editButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginRight: 8,
    },
    editButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    deleteButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    // Modal styles
    modalContainer: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 8,
    },
    modalText: {
      fontSize: 18,
      marginBottom: 16,
    },
    // Additional style for input fields in the modal
  
  });
export default MatchListScreen;







