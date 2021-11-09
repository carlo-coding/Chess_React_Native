import RenderChessPiece, { ChessPiece } from "../components/ChessPiece";
import ChessBoard from "../components/ChessBoard";
import { Dimensions } from "react-native";
import React from "react"
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const reducer=(acc, curr)=> ({...acc, ...curr});

const getArray = (size=0, fill="")=> new Array(size).fill(fill);

const initialChessObject = ()=> getArray(8).map((_,index1)=> {

    return getArray(8).map((_,index2)=>{
        let side;
        if (index1 % 2 === 0) { // Index2 par
            side = (index2 % 2 === 0)? "white" : "black"; // Index1 par o impar
        }else { // Index2 impar
            side = (index2 % 2 !== 0)? "white" : "black"; // Index1 par o impar
        }
        const pieceId = `${index2}${index1}`;
        const piece = getChessPiece(pieceId)?.icon || "";
        return {[pieceId]: RenderChessPiece(piece, side,pieceId)};
    })
}).flat();

export default function restart() {
    return initialChessObject().reduce(reducer);
}





function getChessPiece(id) {
    const chessArray = [
        {icon: "\u265C", name: "black chess rook", id: "00"},
        {icon: "\u265E", name: "black chess knight", id: "10"},
        {icon: "\u265D", name: "black chess bishop", id: "20"},
        {icon: "\u265B", name: "black chess queen", id: "30"},
        {icon: "\u265A", name: "black chess king", id: "40"},
        {icon: "\u265D", name: "black chess bishop", id: "50"},
        {icon: "\u265E", name: "black chess knight", id: "60"},
        {icon: "\u265C", name: "black chess rook", id: "70"},

        {icon: "\u265F", name: "black chess pawn", id: "01"},
        {icon: "\u265F", name: "black chess pawn", id: "11"},
        {icon: "\u265F", name: "black chess pawn", id: "21"},
        {icon: "\u265F", name: "black chess pawn", id: "31"},
        {icon: "\u265F", name: "black chess pawn", id: "41"},
        {icon: "\u265F", name: "black chess pawn", id: "51"},
        {icon: "\u265F", name: "black chess pawn", id: "61"},
        {icon: "\u265F", name: "black chess pawn", id: "71"},


        {icon: "\u2656", name: "white chess rook", id: "07",},
        {icon: "\u2658", name: "white chess knight", id: "17"},
        {icon: "\u2657", name: "white chess bishop", id: "27"},
        {icon: "\u2655", name: "white chess queen", id: "37"},
        {icon: "\u2654", name: "white chess king", id: "47"},
        {icon: "\u2657", name: "white chess bishop", id: "57"},
        {icon: "\u2658", name: "white chess knight", id: "67"},
        {icon: "\u2656", name: "white chess rook", id: "77"},

        {icon: "\u2659", name: "white chess pawn", id: "06"},
        {icon: "\u2659", name: "white chess pawn", id: "16"},
        {icon: "\u2659", name: "white chess pawn", id: "26"},
        {icon: "\u2659", name: "white chess pawn", id: "36"},
        {icon: "\u2659", name: "white chess pawn", id: "46"},
        {icon: "\u2659", name: "white chess pawn", id: "56"},
        {icon: "\u2659", name: "white chess pawn", id: "66"},
        {icon: "\u2659", name: "white chess pawn", id: "76"},
    ];

    return chessArray.find(piece=> piece.id === id);
}
const createId = ()=> Math.random().toString(16).slice(2);
