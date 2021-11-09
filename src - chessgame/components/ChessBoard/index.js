import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Grid from "react-native-grid-component";
import {ChessPiece} from "../ChessPiece";
import { screenWidth } from "../../chest/utils";

function Board({pieces}) {

  return (
    <View style={styles.boardContainer}>
        <View style={styles.board}>
            <Grid 
                data={pieces}
                renderItem={item => <ChessPiece {...{...item}}/>}
                numColumns={8}
            />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    boardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    board: {
        width: screenWidth, 
        height: screenWidth,
        borderColor: "#111",
        borderWidth: 2,
    }
}) 

export default function render(pieces) {

    return {
        pieces,
        renderer: <Board />
    }
}