import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import { BONUS_POINTS, BONUS_POINTS_LIMIT, MAX_SPOT,NBR_OF_DICES,NBR_OF_THROWS } from '../constants/constants';
import { Col, Grid } from 'react-native-easy-grid';
import { useNavigation } from '@react-navigation/native';
import { Home } from './Home';
import Header from './Header';
import Footer from './Footer';

let board = [];


    const Gameboard = ({ route }) => {
  const { username } = route.params;
  const [gameEnded, setGameEnded] = useState(false);
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('');
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
  const [diceSpots, setDiceSpots] =  useState(new Array(NBR_OF_DICES).fill(0));
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
  const [totalPoints, setTotalPoints] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(BONUS_POINTS_LIMIT);
  const navigation = useNavigation();
    

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable 
          key={"row" + i}
          onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={50} 
          color={getDiceColor(i)}>
        </MaterialCommunityIcons>
      </Pressable>
    );
  }
  const buttonRow = [];
    for (let dicebutton = 0; dicebutton < MAX_SPOT ; dicebutton++) {
        buttonRow.push(
        <Col key={'buttonsRow'+dicebutton}>
            <Pressable 
                key={'buttonsRow'+dicebutton}
                onPress={() => selectDicePoints(dicebutton)}>
                <MaterialCommunityIcons
                    name={"numeric-" + (dicebutton + 1) + "-circle"}
                    key={"buttonsRow"+ dicebutton}
                    size={40}
                    color={getDicePointsColor(dicebutton)}
                ></MaterialCommunityIcons>
            </Pressable>
        </Col>
    )}

    function getSpotTotal(i) {
        return dicePointsTotal[i];
    }

    const pointsRow = []
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"points"+spot}>
                <Text key={"points"+spot} style={styles.points}>{getSpotTotal(spot)}</Text>
            </Col>
        )
    }
  
    useEffect(() => {
        checkPoints();
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Throw Dices');
            setGameEnded(false);
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
            setGameEnded(true);
        }
    }, [nbrOfThrowsLeft]);
    
    useEffect(() => {
        if (selectedDicePoints.every(x => x)) {
            setStatus('game over, all points selected.\n Throw dices to start again.');
            setGameEnded(true);
            navigation.navigate('Scoreboard', { totalPoints: totalPoints, username });
        }
    }, [selectedDicePoints, totalPoints]);
    
    const resetGame = () => {
       
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setGameEnded(false);
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        setDicePointsTotal(new Array(MAX_SPOT).fill(0));
        setTotalPoints(0);
        setBonusPoints(BONUS_POINTS_LIMIT);
        
    };
      
  function getDiceColor(i) {
    if (board.every((val, i, arr) => val === arr[0])) {
      return "orange";
    }
    else {
      return selectedDices[i] ? "black" : "#FFB4A2";
    }
  }

  function getDicePointsColor(i) {
    return selectedDicePoints[i] ? "black" : "#FFB4A2";
}

  function selectDice(i) {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  function selectDicePoints(i) {
    if (nbrOfThrowsLeft > 0) {
      setStatus("Throw 3 times before setting points")
    } else {
      let selected = [...selectedDices];
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];
  
      if (selectedPoints[i]) {
        setStatus("You already selected points for " + [i + 1])
      } else if (diceSpots.includes(i + 1)) {
        selectedPoints[i] = true;
        let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
        points[i] = nbrOfDices * (i + 1);
        setDicePointsTotal(points);
        selected.fill(false);
        setSelectedDices(selected);
        setSelectedDicePoints(selectedPoints);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
      } else {
        setStatus("Invalid dice number selected.");
      }
    }
  }
  

  
  function checkPoints() {
    const dpt = [...dicePointsTotal]
    const sum = dpt.reduce((total, a) => total + a, 0);

    if(nbrOfThrowsLeft >= 0) {
        setTotalPoints(sum)
        checkBonusPoints(sum)
        
    }
  }

  const checkBonusPoints = (sum) => {
    const bonus = BONUS_POINTS_LIMIT - sum;

    if(bonus <= 0) {
        setBonusPoints(0)
        setTotalPoints(sum+BONUS_POINTS)
        
    }
    else if(bonus > 0) {
        setBonusPoints(bonus)
    }
  }

  function throwDices() {
    if (gameEnded) {
        resetGame();
        return;
    }
    if(nbrOfThrowsLeft === 0) {
        setStatus("Select your points before next throw")
    }
    else {
        let spots = [...diceSpots];
        for(let i = 0; i < NBR_OF_DICES; i++) {
            if(!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                spots[i] = randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        setDiceSpots(spots);
        setStatus("Select and throw dices again")
    }
  
    }


  return(
    <View style={styles.gameboard}>
        <Header />
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button}
        onPress={() => throwDices()}>
          <Text style={styles.buttonText}>
            Throw dices
          </Text>
          
      </Pressable>

      <Text style={styles.gameinfo}>Points until bonus: {bonusPoints}</Text>
      
      <Text style={styles.gameinfo}>Total points: {totalPoints}</Text>
      <View style={styles.dicepoints}>
            <Grid>{pointsRow}</Grid>
        </View>
      <View style={styles.dicepoints}>
            <Grid>{buttonRow}</Grid>
      </View>
      <Text>Player {username}</Text>
      <Footer />
    </View>
  );
}
export default Gameboard;