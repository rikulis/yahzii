import React, {useState} from 'react';
import { TextInput, Text, View, Pressable,Keyboard } from 'react-native';
import { BONUS_POINTS, BONUS_POINTS_LIMIT, MAX_SPOT,NBR_OF_DICES,NBR_OF_THROWS,MIN_SPOT } from '../constants/constants';
import styles from '../style/style';
import Header from './Header';
import Footer from './Footer';

const Home = ({ navigation }) => {
    const handlePress = () => {
      navigation.navigate('Scoreboard', { username });
      navigation.navigate('Gameboard', {username});
    }
    
    const [username, setUsername] = useState('');
    const [showRules, setShowRules] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const handleUsernameSubmit = () => {
      setShowRules(true);
      setShowButton(false);
      Keyboard.dismiss();
    }
  return (
    <View style={styles.container}>
        <Header />
        {showButton && (
  <View>
    <Text style={styles.gameinfo}>For scoreboard enter your name</Text>
    <TextInput
      style={styles.player}
      onChangeText={text => setUsername(text)}
      value={username}
      placeholderTextColor="black"
      onSubmitEditing={handleUsernameSubmit}
    />
    <Pressable style={styles.startingbutton} onPress={handleUsernameSubmit}>
      <Text style={styles.buttonText}>OK</Text>
    </Pressable>
  </View>
        )}
        
        
         {showRules && (
        <View style={styles.homecontainer}>
          <Text style={styles.title}>Rules of the game</Text>
          <Text style={styles.gameinfo}>THE GAME: Upper section of the classic Yahtzee 
          dice game. You have {NBR_OF_DICES} dices and 
          for the every dice you have {NBR_OF_THROWS} 
          throws. After each throw you can keep dices in 
          order to get same dice spot counts as many as 
          possible. In the end of the turn you must select 
          your points from {MIN_SPOT} to {MAX_SPOT}. 
          Game ends when all points have been selected. 
          The order for selecting those is free.
          </Text>
          <Text style={styles.gameinfo}>
          POINTS: After each turn game calculates the sum 
          for the dices you selected. Only the dices having 
          the same spot count are calculated. Inside the 
          game you can not select same points from 
          {MIN_SPOT} to {MAX_SPOT} again. </Text>
          <Text style={styles.gameinfo}>
          GOAL: To get points as much as possible. 
          {BONUS_POINTS_LIMIT} points is the limit of 
          getting bonus which gives you {BONUS_POINTS} 
          points more
          </Text>
          <Text style={styles.gameinfo}>Good luck {username}!</Text>
          
          <Pressable style={styles.startingbutton} 
            title="Start Game"
            onPress={handlePress}
            >
            <Text style={styles.buttonText}>Start Game</Text>
            </Pressable>
          
           <Footer />
        </View>
      )}
    </View>
   
  );
};



export default Home;