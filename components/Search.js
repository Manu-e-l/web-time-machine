import { View, Text, Button, Platform, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';


function Search() {
  {
    // Hook timePicker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState("")

    // Hook rechercher
    const [textRecherche, setTextRecherche] = useState("")
    // Hook Stockage donnée
    const [data, setData] = useState("")
    const [dataUrl, setDataUrl] = useState("")

    // const  pour avoir le bon format timestamp spécifique pour l'api
    const dateTimeStamp = date.toLocaleDateString('en-GB').split('/').reverse().join('');

    
    // const webBrowser
    const _handlePressButtonAsync = async () => {
      let result = await WebBrowser.openBrowserAsync(dataUrl);
      console.log("Oki Doki", result);
    };


    // Fetch Get Api 
    const getApi = (cacahuete, banane) => {
      const url = `http://archive.org/wayback/available?url=${cacahuete}&timestamp=${banane}`
      const options = {
        method: "GET",

      };
      fetch(
        url,
        options
      )
        .then((response) => {
          return response.json();
        })
        .then(
          (responseObject) => {
            if (responseObject) {
              console.log("Api récup : ", responseObject);
              setData(responseObject);
              setDataUrl(responseObject.archived_snapshots.closest.url)


            } else {
              console.log("non");
            }
          },

          (error) => {
            console.log("Erreur API : ", error);
          }
        );
    };



    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === "ios");
      setDate(currentDate);

      let tempDate = new Date(currentDate);
      let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
      let fTime = "Hours: " + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
      setText(fDate + '\n' + fTime)

      console.log(fDate + ' (' + fTime + ')')
    };

    const showMode = (currentMode) => {
      //   if (Platform.OS === 'android') {
      setShow(true);
      setMode(currentMode);
      // for iOS, add a button that closes the picker

    };

    const showDatepicker = () => {
      showMode('date');
    };

    return (
      <View className='mainContainer' style={{ flex: 1, justifyContent: "center" }}>




        <Text style={{ fontWeight: "bold", fontSize: 20, alignItems: "center" }}>{date.toLocaleString()}</Text>
        <View style={{ margin: 2 }}>
          <Button onPress={showDatepicker} title="Choisissez une date !" />

          {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>



        <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
        <Text>{dataUrl}</Text>
        <TextInput placeholder="Renseignez un site internet. 'Exemple : www.facebook.com'" placeholderTextColor="#FFF" onChangeText={(paramsEvent) => setTextRecherche(paramsEvent)}
          style={{ backgroundColor: "#2ecc71", borderStyle: "solid", borderColor: "black", borderWidth: "2em", borderRadius: "20px", width: "100%" }}>

        </TextInput>
        <Button title='Rechercher' onPress={() => {
          console.log(textRecherche);
          getApi(textRecherche, dateTimeStamp)
        }}></Button>
        <WebView
          style={styles.container}

          source={{ uri: `${dataUrl}` }}
        />
      </View>
    );
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});


export default Search