// CalendarScreen.tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Calendar } from 'react-native-calendars';
// import { Calendar } from 'react-native-calendars';


type CalendarScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Calendar'>;
};

const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
//   const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  console.log("selected",selected);
  const [result, setresult] = useState({});
  
  const handleDateSelect = (date: string) => {
    // setSelectedDates((prevSelectedDates) => {
    //   if (prevSelectedDates.includes(date)) {
    //     // Deselect the date
    //     return prevSelectedDates.filter((selectedDate) => selectedDate !== date);
    //   } else {
    //     // Select the date
    //     return [...prevSelectedDates, date];
    //   }
    // });
  };

  const navigateToSchedule = () => {
    navigation.navigate('Schedule', { selectedDates:selected });
  };
function addOrRemoveFromArray( searchString: string): string[] {
    const array = selected
    const index = array.indexOf(searchString);
  
    if (index !== -1) {
      // If the string is present, remove it
      array.splice(index, 1);
      console.log(`${searchString} removed from the array.`);
    } else {
      // If the string is not present, add it
      array.push(searchString);
      console.log(`${searchString} added to the array.`);
    }
    const res: { [key: string]: { selected: true,  selectedDotColor: 'orange' } } = selected.reduce((acc:any, current:any) => {
        acc[current] = { selected: true,  selectedDotColor: 'orange' };
        return acc;
      }, {});
      console.log("res",res);
      setresult(res)
      
    // Return the updated array
    return array;
  }
const clickDate = (date:string)=>{

}

//   console.log("result",result);
  
  return (
    <View>
      {/* <Calendar
        onDayPress={(day) => handleDateSelect(day.dateString)}
        markingType={'period'}
        markedDates={getMarkedDates(selectedDates)}
      /> */}
  <Calendar
      onDayPress={day => {
        // setSelected(day.dateString);
        setSelected(addOrRemoveFromArray(day.dateString))
      }}
      markedDates={result}
    />
      <Button title="Next" onPress={navigateToSchedule} />
    </View>
  );
};

// const getMarkedDates = (selectedDates: string[]): MarkedDates => {
//   const markedDates: MarkedDates = {};

//   selectedDates.forEach((date) => {
//     markedDates[date] = { selected: true, selectedColor: 'blue' };
//   });

//   return markedDates;
// };

export default CalendarScreen;
