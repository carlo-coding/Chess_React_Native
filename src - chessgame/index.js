import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import { screenWidth } from "./chest/utils";
import chessLogic from "./gamelogic";

export default function App() {
  const [running, setRunning] = useState(false);


  useEffect(()=> {
    setRunning(true);
  }, []);

  return (
      <GameEngine 
        systems={[chessLogic]}
        entities={entities()}
        running={running}
        style={styles.scene}
      >
      </GameEngine>
  )
}


const styles = StyleSheet.create({
  scene: {
    backgroundColor: "#666",
    flex: 1
  },
})