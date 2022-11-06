import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PDFReader from "rn-pdf-reader-js";

// You can import from local files
import library from "./assets/books.json";
// or any pure javascript modules available in npm
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
const LeftContent = (props) => <Avatar.Icon {...props} icon="book" />;

const Stack = createNativeStackNavigator();

// console.log(books);

const HomeScreen = ({ navigation }) => {
  let [books, setBooks] = React.useState(library.books);
  const renderBook = books.map((book, index) => {
    return (
      <Card style={styles.book} key={index}>
        <Card.Title
          title={book["title"]}
          subtitle="Novel (pdf format)"
          left={LeftContent}
        />
        <Card.Content>
          <Title>Author: </Title>
          <Paragraph>{book["author"]}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: book["uri"] }} />
        <Card.Actions>
          <Button
            onPress={() =>
              navigation.navigate("Book", {
                itemId: index,
                book: book,
              })
            }
          >
            Click to Read
          </Button>
        </Card.Actions>
      </Card>
    );
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.cardWrap}>{renderBook}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const BookPage = ({ route }) => {
  const { itemId, book } = route.params;
  console.log(book.link);
  return <PDFReader source={{ uri: book.link }} />;
};

function App() {
  // console.log(book["title"])

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6200ee",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "PDF READER" }}
        />
        <Stack.Screen
          name="Book"
          component={BookPage}
          options={{ title: "PDF READER" }}
        />
      </Stack.Navigator>
      <StatusBar barStyle="light-content" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F3E5F5",
    alignItems: "center",
  },

  book: {
    display: "flex",
    padding: 5,
    height: 400,
    margin: 10,
    backgroundColor: "#CE93D8",
    justifyContent: "center",
  },
  cardWrap: {
    width: "100%",
    marginTop: "5%",
    paddingHorizontal: 10,
  },
});
export default App;
