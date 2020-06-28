const INITIAL_STATE = {
    stock: {},
    timeSeries: {},
    isFavourite: false,
    interval: '60min',
    stockPrice: 0,
    futurePrice: 0,
    move: ''
}

export default function stock(state = INITIAL_STATE, action) {
    if (action.type === 'TOGGLE_STOCK_INFO') {
        return {
            ...state,
            stock: action.stock,
            timeSeries: action.timeSeries,
            interval: action.interval,
            stockPrice: action.stockPrice,
            futurePrice: action.futurePrice,
            move: action.move
        }
    }

    if (action.type === 'SET_FAVOURITE') {
        return {
            ...state,
            isFavourite: action.isFavourite
        }
    }

    return state;
}

