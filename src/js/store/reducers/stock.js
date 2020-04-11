const INITIAL_STATE = {
    activeStock: 'MGLU3.SA',
    timeSeries: {},
    interval: '60min',
    stockPrice: 0
}

export default function stock(state = INITIAL_STATE, action) {
    if (action.type === 'TOGGLE_STOCK_INFO') {
        return {
            activeStock: action.activeStock,
            timeSeries: action.timeSeries,
            interval: action.interval,
            stockPrice: action.stockPrice
        }
    }

    return state;
}

