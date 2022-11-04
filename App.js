import * as React from 'react';
import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationActions as navigation} from "react-navigation";


const DATA = [
    {
        id: 1,
        questionTitle: 'Group 1',
    },
    {
        id: 2,
        questionTitle: 'Group 2',
    },
    {
        id: 3,
        questionTitle: 'Group 3',
    },
];

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => {
                    navigation.navigate('Details', {
                        itemId: 86
                    });
                }}
            />
        </View>
    );
}

function DetailsScreen({ route, navigation }) {
    const { question, otherParam, questionTitle } = route.params;
    const Item = ({ questionTitle }) => (
            <View >
                <Text >{questionTitle}</Text>
            </View>
    );
    const renderItem = ({ item }) => (
        <Item
            title={item.questionTitle}
        />
    );
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 300 }}>
            {DATA.filter(inquiry => inquiry.id === question).map(filteredQuestion => (
                <Text>{filteredQuestion.questionTitle}</Text>
            ))}
            <Text>itemId: {JSON.stringify(question)}</Text>
            <Text>otherParam: {JSON.stringify(questionTitle)}</Text>
            <Button
                title={'goker i need gok'}
                onPress={() =>
                    navigation.push('Details', {
                        question: question+1,
                    })
                }
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <View>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>

    );

}

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen}  initialParams={{ question: 1 }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
