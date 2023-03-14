import React, {useState, useEffect} from "react";
import {Text, View} from 'react-native';
import Header from "./Header";
import Footer from "./Footer";
import { DataTable } from 'react-native-paper';
import styles from "../style/style";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Scoreboard = ({ route }) => {
    const { totalPoints, username } = route.params;
    const [scoreboardData, setScoreboardData] = useState([]);
    
    useEffect(() => {
        if (totalPoints) {
          const newScore = { username: username, points: totalPoints, date: new Date() };
          AsyncStorage.getItem('scoreboardData').then(existingData => {
            if (existingData) {
              const newData = JSON.parse(existingData).concat(newScore);
              setScoreboardData(newData);
              AsyncStorage.setItem('scoreboardData', JSON.stringify(newData));
            } else {
              setScoreboardData([newScore]);
              AsyncStorage.setItem('scoreboardData', JSON.stringify([newScore]));
            }
          }).then(() => {
            // Get the latest scores after adding the new score
            AsyncStorage.getItem('scoreboardData').then(data => {
              const latestScores = JSON.parse(data).reduce((acc, curr) => {
                const index = acc.findIndex(data => data.username === curr.username);
                if (index === -1) {
                  acc.push(curr);
                } else if (curr.date > acc[index].date) {
                  acc[index] = curr;
                }
                return acc;
              }, []).map(data => ({
                ...data,
                date: new Date(data.date) // parse the date string back into a Date object
              }));
              setScoreboardData(latestScores);
            });
          });
        }
      }, [totalPoints]);
      

    // Filter the scoreboardData array to show only the latest score for each user
    const sortedScores = scoreboardData.sort((a, b) => b.points - a.points)
    .map(data => ({
      ...data,
      date: new Date(data.date) // parse the date string back into a Date object
    }))
    .slice(0, 3);
  
    return (
        <View>
        <Header />
        <Text style={styles.scoreboard}>Top Three</Text>
        {sortedScores.length > 0 ? (
          <DataTable>
            {sortedScores.map((data, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{data.username}</DataTable.Cell>
                <DataTable.Cell style={{ paddingVertical: 0, paddingHorizontal: 60 }}>{data.points}</DataTable.Cell>
                <DataTable.Cell>{data.date.toLocaleDateString()}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        ) : (
            <Text style={[styles.scoreboardtext, { textAlign: 'center' }]}>Scoreboard is empty</Text>
        )}
        <Footer />
      </View>
    );
  };
    

export default Scoreboard;
