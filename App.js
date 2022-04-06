// Importando bibliotecas padrão
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image,View,Pressable, ScrollView } from 'react-native';

// Importando bibliotecas para navegação entre páginas
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
// Importando bibliotecas para uso do slider
import Slider from '@react-native-community/slider';

// Definindo design da Página Padrão
function HomeScreen ({ navigation }) {

  const [emojis, setEmojis] = useState([])

  // Recebendo dados do Banco de Dados pela API
  const getData = async() => {
    try{
      const response = await (await (fetch('https://my-json-server.typicode.com/joaofaria/jsonFile-main-db/posts/'))).json()
      setEmojis(response)
    } 
    catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    getData()
  }, []);

  return(
    <ScrollView style={styles.container}>
    <View style={{backgroundColor: `#825EEB`, flexDirection:'row', padding: 13}}>          
      <Text style={styles.headerText}>Como você está se sentindo?</Text>
    </View>
    <View style = {{flexDirection: 'row', alignContent: 'baseline', flexWrap: 'wrap',alignItems:  'flex-start'}}>
    {emojis.map((item, key) => (
      console.log(item.sentimento),
        <Pressable key = {key} style={styles.botaoEmoji}
        onPress={() => navigation.navigate('Como estou', {item: item})}>
          <Image 
            style = {styles.imagemEmoji}
            source={{
              uri: `${item.referenciaImagem}`,
            }}>
          </Image>
          <Text style={styles.textoEmoji}>{item.sentimento}</Text>
        </Pressable>
      ))
    }
    </View>
    </ScrollView>
  )
}

// Definindo design da Pagina de 
// descrever intensidade do sentimento
function FeelScreen ({route, navigation}) {
  const item = route.params;

  const [sliderValue, setSliderValue] = useState(0)
  const [intensidade, setIntensidade] = useState('')

  const defineIntensidade = () => {
    switch (sliderValue) {
      case 0:
        setIntensidade('Levemente')
        break;
      case 25:
        setIntensidade('Um pouco')
        break;
      case 50:
        setIntensidade('Relativamente')
        break;
      case 75:
        setIntensidade('Muito')
        break;
      case 100:
        setIntensidade('Extremamente')
        break;
    }
  }

  useEffect(() => {
    defineIntensidade()
  }, [sliderValue]);

  return(
    <View style={{ flex: 1, alignItems: 'center'}}>
      <View style={styles.ladoCima}>
        <Image 
          style = {styles.imagemEmojiSlider}
          source={{
            uri: `${item.item.referenciaImagem}`,
          }}>
        </Image>
        <Text style={styles.fonteA}>Estou me sentindo </Text>
        <Text style={styles.fonteB}>{intensidade} {JSON.stringify(item.item.sentimento)}</Text>
        <Text style={styles.fonteC}>Selecione a intensidade de seu sentimento</Text>
      </View>
      <View style={styles.ladoBaixo}>
      <Text style={styles.fonteD}>{intensidade}</Text>
        <Slider
            style = {styles.slider}
            maximumValue={100}
            minimumValue={0}
            step={25}
            scale = {sliderValue}
            minimumTrackTintColor="white"
            maximumTrackTintColor="white"
            thumbTintColor = "white"
            valueLabelDisplay="on"
            onValueChange={value => setSliderValue(value)}
          />
          <Pressable
            style={styles.button}
            onPress={() =>  navigation.navigate('Início')}
          >
          <Text>Próximo</Text>
        </Pressable>
      </View>
      <View>

      </View>
    </View>
  )
}

export default function App() {

  return(
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Início" component={HomeScreen} />
      <Stack.Screen name="Como estou" component={FeelScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#825EEB"
  },

  text: {
    fontSize: 42,
  },
  viewEmoji: {
    flexDirection: 'column',
    width: '100%',
  },
  imagemEmoji: {
    width: '70%',
    height: '84%'  
  },
  textoEmoji:{
    color: 'white',
  },
  botaoEmoji:{
    borderRadius: 100,
    backgroundColor: '#906BFA',
    alignItems: 'center',
    padding: 10,
    width: '33%',
    height: 100
  },
  headerText:{
    color: 'white',
    fontWeight: "bold",
    fontSize: 20
  },
  imagemEmojiSlider:{
    width: 100,
    height: 100
  },
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 10,
  },
  ladoCima:{
    backgroundColor: "white",
    height: '45%',
    width: '100%',
    alignItems: 'center',
    paddingTop: 5
  },
  ladoBaixo:{
    paddingTop: 25,
    backgroundColor: "#906BFA",
    width: '100%',
    alignItems: 'center',
    height: '65%',
  },
  fonteA: {
    fontSize: 30,
    color: "black"
  },
  fonteB: {
    fontSize: 30,
    color: "#906BFA"
  },
  fonteC: {
    marginTop: 20
  },
  fonteD: {
    fontSize: 30,
    color: "white"
  },
  button: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    marginTop: 100,
    backgroundColor: 'white',
    width: '80%'
  },
});