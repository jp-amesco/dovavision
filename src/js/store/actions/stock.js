function toggleStockInfo(stock, timeSeries, interval, move, futurePrice) {
    return {
        type: 'TOGGLE_STOCK_INFO',
        stock: stock,
        timeSeries: timeSeries,
        interval: interval,
        futurePrice: futurePrice,
        move: move
    };
}

function setFavourite(isFavourite) {
    return {
        type: 'SET_FAVOURITE',
        isFavourite: isFavourite
    }
}

export {
    toggleStockInfo,
    setFavourite
}