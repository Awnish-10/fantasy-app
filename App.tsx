// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
// import store from './store';
import CalendarScreen from './screens/CalendarScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import { store } from './store';
import MatchListScreen from './screens/MatchListScreen';

// types.ts
export type RootStackParamList = {
  MatchList: undefined;
  Calendar: undefined;
  Schedule: { selectedDates: string[] };
};
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MatchList">
          <Stack.Screen name="MatchList" component={MatchListScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
