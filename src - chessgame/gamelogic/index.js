import { calculatePieceId, getNewPosition, getSelectedPieceId, toggleSelectPiece, getPieceMovements } from "../chest/utils"

export default function chessLogic(entities, {touches, events}) {

    touches.filter(t=> t.type == "press").forEach(t=> {
        const { event } = t;
        // pieceId es la última pieza a la que se hizo click
        const pieceId = calculatePieceId(event.pageX, event.pageY);

        const selectedPieceId = getSelectedPieceId(entities); // Si no hay nada seleccionado retorna undefined

        if (selectedPieceId) { // En caso de que algo este seleccionado
            // se debe mover a la nueva posición seleccionada.
            //const newPostion = getNewPosition(pieceId, {x: 0, y: 0}); ***
            if (entities[selectedPieceId].piece != "" && (entities[selectedPieceId]?.piece != undefined)) { /* 
                Evitar mover celdas vacias que hace que se eliminen las pieces y 
                asegurarse de no salirse del tablero
                */ 

                const { movements, captures } = getPieceMovements(entities[selectedPieceId].piece);

                // HAY QUE VERIFICAR QUE LA CASILLA DE DESTINO CONCUERDE CON LOS MOVIMIENTOS DE LA PIEZA
                // Y ADEMÁS QUE LA CASILLA DE DESTINO NO TENGA PIEZA
                const itCanMove = movements
                .map(movement => getNewPosition(selectedPieceId, movement))
                .includes(pieceId) && entities[pieceId].piece === "";

                // HAY QUE VERIFICAR SI SE PUEDE COMER A OTRA PIEZA
                let itCanEat = false;
                captures.map(capture => {
                    let capturePos = getNewPosition(selectedPieceId, capture);
                    let edible = entities[capturePos];
                    if (edible?.piece !== "" && capturePos == pieceId) {
                        itCanEat = true;
                    }
                    return capturePos;
                })

                if (!itCanEat) { // Si no puede comer
                    toggleSelectPiece(entities, pieceId);
                }

                if (itCanMove || itCanEat) { // Movemos la pieza si se puede mover o comer
                    entities[pieceId].piece = entities[selectedPieceId].piece;
                    if(selectedPieceId !== pieceId) {
                        entities[selectedPieceId].piece = "";
                        toggleSelectPiece(entities, pieceId);
                    };
                }
            }
        }else {
            // Si la posición contiene una pieza y además no hay otra pieza seleccionada entonces 
            // darle el valor de seleccionado.
            toggleSelectPiece(entities, pieceId);
        }
    })
    "♙"
    return entities
}

/* 

{
    "event": {
        "changedTouches": [[Circular]], 
        "identifier": 0, 
        "locationX": 6.539861679077148, 
        "locationY": 33.792301177978516, 
        "pageX": 22.90349769592285,
        "pageY": 188.33775329589844, 
        "target": 43, 
        "targetSurface": -1, 
        "timestamp": 1636336022514, 
        "touches": []}, 
    "id": 0, 
    "type": "press"}
*/