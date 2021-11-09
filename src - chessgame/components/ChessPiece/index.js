import React, { useState } from 'react';
import { getBoardSize, calculatePiecePosition, calculatePieceId } from "../../chest/utils";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get("window").width;

export function ChessPiece({ piece, side, id, selected }) {


    const {x, y} = calculatePiecePosition(id);

    return (
        <View 
            key={id} 
            style={[
                styles.chessPiece, 
                (side==="white"? styles.whiteSide : styles.blackSide),
                (selected && styles.selectedPiece),
                {top: y, left: x}
            ]}
        >
            <Text style={styles.piece}>{piece}</Text>
        </View>
    )
}

export default function Render(piece, side, id) {


    return {
        piece,
        side,
        id,
        renderer: <ChessPiece /> 
    }

}


const styles = StyleSheet.create({
    chessPiece: {
        width: getBoardSize() / 8,
        height: getBoardSize() / 8,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",

    },
    piece: {
        fontSize: 30
    },
    blackSide: {
        backgroundColor: "#CAB6DE"
    },
    whiteSide: {
        backgroundColor: "white"
    },
    selectedPiece: {
        backgroundColor: "#9FFF79",
    }
});