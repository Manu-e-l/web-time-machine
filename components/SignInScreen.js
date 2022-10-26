import { View, TextInput, Button, Alert, StyleSheet } from 'react-native'


import { useState, useEffect } from 'react';



function SignInScreen({ navigation }) {
  const [username, setUsername] = useState(null);
  // don't forget = useState(null) -> useState("") coding phase
  const [password, setPassword] = useState(null);
  // don't forget = useState(false) -> useState(true) coding phase
  const [login, setLogin] = useState(false)


  useEffect(() => {
    console.log("login", login);
  }, [login, username, password]);

  return (
    <View style={styles.container}>
      <TextInput style={{ backgroundColor: "#2980b9", color: "white", fontWeight: "bold", width: '75%', borderWidth: "2px", borderRadius: "10px", margin: "3%" }}
        placeholder="Username"
        placeholderTextColor="#FFF"
        onChangeText={(username) => setUsername(username)}
      />
      <TextInput style={{ backgroundColor: "#2980b9", color: "white", fontWeight: "bold", width: '75%', borderWidth: "2px", borderRadius: "10px", margin: "3%" }}
        placeholder="Password"
        placeholderTextColor="#FFF"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
      />
      <Button
        title="Sign in" onPress={() => {
          if (username !== null && password !== null) {
            setLogin(true);
            console.log("OKAYY ")
            navigation.navigate("NewHomeScreen")
          } else {
            Alert.alert("Erreur", "le pseudo ou  le mot de passe sont incorrect");

          }
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default SignInScreen