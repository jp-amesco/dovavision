export function toggleStockInfo(activeStock, timeSeries, interval) {
    return {
        type: 'TOGGLE_STOCK_INFO',
        activeStock: activeStock,
        timeSeries: timeSeries,
        interval: interval
    };
}