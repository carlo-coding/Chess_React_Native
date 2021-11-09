import { Dimensions } from "react-native";

export function getChessPiece(id) {
    const chessArray = [
        {icon: "\u265C", name: "black chess rook", id: "00"},
        {icon: "\u265E", name: "black chess knight", id: "01"},
        {icon: "\u265D", name: "black chess bishop", id: "02"},
        {icon: "\u265B", name: "black chess queen", id: "03"},
        {icon: "\u265A", name: "black chess king", id: "04"},
        {icon: "\u265D", name: "black chess bishop", id: "05"},
        {icon: "\u265E", name: "black chess knight", id: "06"},
        {icon: "\u265C", name: "black chess rook", id: "07"},

        {icon: "\u265F", name: "black chess pawn", id: "10"},
        {icon: "\u265F", name: "black chess pawn", id: "11"},
        {icon: "\u265F", name: "black chess pawn", id: "12"},
        {icon: "\u265F", name: "black chess pawn", id: "13"},
        {icon: "\u265F", name: "black chess pawn", id: "14"},
        {icon: "\u265F", name: "black chess pawn", id: "15"},
        {icon: "\u265F", name: "black chess pawn", id: "16"},
        {icon: "\u265F", name: "black chess pawn", id: "17"},


        {icon: "\u2656", name: "white chess rook", id: "60"},
        {icon: "\u2658", name: "white chess knight", id: "61"},
        {icon: "\u2657", name: "white chess bishop", id: "62"},
        {icon: "\u2655", name: "white chess queen", id: "63"},
        {icon: "\u2654", name: "white chess king", id: "64"},
        {icon: "\u2657", name: "white chess bishop", id: "65"},
        {icon: "\u2658", name: "white chess knight", id: "66"},
        {icon: "\u2656", name: "white chess rook", id: "67"},

        {icon: "\u2659", name: "white chess pawn", id: "70"},
        {icon: "\u2659", name: "white chess pawn", id: "71"},
        {icon: "\u2659", name: "white chess pawn", id: "72"},
        {icon: "\u2659", name: "white chess pawn", id: "73"},
        {icon: "\u2659", name: "white chess pawn", id: "74"},
        {icon: "\u2659", name: "white chess pawn", id: "75"},
        {icon: "\u2659", name: "white chess pawn", id: "76"},
        {icon: "\u2659", name: "white chess pawn", id: "77"},
    ];

    return chessArray.find(piece=> piece.id === id);
}

export const createId = ()=> Math.random().toString(16).slice(2);

export const getArray = (size=0, fill="")=> new Array(size).fill(fill);

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const getBoardSize = ()=> Math.min(screenWidth, screenHeight);

export const calculatePiecePosition = (id)=> {
    const top = parseFloat(id[1]) * (getBoardSize() / 8);
    const left = parseFloat(id[0]) * (getBoardSize() / 8);
    return {x: left, y: top};
}

export const calculatePieceId = (x, y) => {
    let xIndex = -1;
    let yIndex = -1;
    const measure = getBoardSize() / 8;
    for (let i=0; i<8; i++) {
        if (x >= (measure * i) && x <= (measure * (i+1))) {
            xIndex = i;
        }
        if (y >= (measure * i) && y <= (measure * (i+1))) {
            yIndex = i;
        }
    }
    return `${xIndex}${yIndex}`;
}

export const getNewPosition = (id, newPosition) => {
    const x = parseInt(id[0]);
    const y = parseInt(id[1]);
    return `${x + newPosition.x}${y + newPosition.y}`;
}

export const getSelectedPieceId = (entities) => {
    return Object.entries(entities).map(arrPiece => arrPiece[1]).find(piece => piece.selected == true)?.id
}

export const toggleSelectPiece = (entities, id) => {
    let selected = entities[id].selected;

    if (entities[id]?.piece !== "") { // Verificar que tenga una pieza
        // establecer todas las piezas seleccionadas a false
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                entities[`${j}${i}`].selected = false;
            }
        }
        entities[id].selected = selected? false : true; // si ya está seleccionado ponerlo en false
    }
}

export const getPieceMovements = (piece) => {

    const towerMovements = []
    .concat(getArray(8).map((_, index)=> ({x: 0, y: index})))
    .concat(getArray(8).map((_, index)=> ({x: 0, y: -index})))
    .concat(getArray(8).map((_, index)=> ({x: index, y: 0})))
    .concat(getArray(8).map((_, index)=> ({x: -index, y: 0})));

    switch (piece) {
        case "♙":
            return {movements: [{x: 0, y: -1}], captures: [{x: -1, y: -1}, {x: 1, y: -1}]};
        case "♟":
            return {movements: [{x: 0, y: 1}], captures: [{x: -1, y: 1}, {x: 1, y: 1}]};
        case "♖":
            return {movements: towerMovements, captures: towerMovements};
        case "♜":
            return {movements: towerMovements, captures: towerMovements};
        default:
            return {movements: [{x: 0, y: 0}], captures: []};
    }
}