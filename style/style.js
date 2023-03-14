import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  homecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff',
    marginVertical: 20, // add margin to bottom
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#B5838D',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#B5838D',
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  player: {
    color: 'black',
    fontWeight: 'bold',
    padding:0,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    marginTop: 10
  },
  scoreboard: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10,
    fontWeight:'bold'
  },
  scoreboardtext: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    marginTop: 10

  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#E5989B",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startingbutton: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#E5989B",
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  dicepoints: {
    flexDirection: 'row', 
    width: 280,
    alignContent: 'center'
  },
  pointsColumn: {
    width: 100,
    marginRight: 20,
  },
  points: {
    color:'#6D6875',
    marginLeft:15
  }
});