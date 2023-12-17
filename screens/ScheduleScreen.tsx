import React, { useState } from 'react';
import { View, Button, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch } from 'react-redux';
import { addMatch } from '../store';
import { RootStackParamList } from '../App';

type ScheduleScreenProps = StackScreenProps<RootStackParamList, 'Schedule'>;

const ScheduleScreen: React.FC<ScheduleScreenProps> = ({ navigation, route }) => {
  const { selectedDates } = route.params;
  const [eventName, setEventName] = useState('');
  const [participants, setParticipants] = useState('');
  const [timeSlots, setTimeSlots] = useState<{ [key: string]: { from: Date; to: Date } }>({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const dispatch = useDispatch();

  const handleAddMatch = () => {
    const newMatches = selectedDates.map((date: any) => ({
      eventName,
      participants: participants.split(',').map((p) => p.trim()),
      date,
      from: timeSlots[date]?.from.toLocaleTimeString(),
      to: timeSlots[date]?.to.toLocaleTimeString(),
    }));

    dispatch(addMatch(newMatches));
    navigation.navigate('MatchList')
  };

  const showDatePicker = (date: string) => {
    setSelectedDate(date);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (selectedDateTime: Date) => {
    setTimeSlots((prevSlots) => ({
      ...prevSlots,
      [selectedDate]: {
        from: selectedDateTime,
        to: new Date(selectedDateTime.getTime() + 1 * 60 * 60 * 1000), // Assuming 1-hour duration
      },
    }));
    hideDatePicker();
  };

  return (
    <ScrollView>
      <View>
        <Text>Event Name:</Text>
        <TextInput value={eventName} onChangeText={setEventName} />
        <Text>Participants:</Text>
        <TextInput multiline value={participants} onChangeText={setParticipants} />
        {selectedDates.map((date: any) => (
          <View key={date.toString()}>
            <Text>{date.toString()}</Text>
            <TouchableOpacity onPress={() => showDatePicker(date.toString())}>
              <Text>Time Slot:</Text>
              <Text>{timeSlots[date]?.from.toLocaleTimeString()} - {timeSlots[date]?.to.toLocaleTimeString()}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <Button title="Add Match" onPress={handleAddMatch} />
      </View>
    </ScrollView>
  );
};

export default ScheduleScreen;
