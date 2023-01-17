
async function main() {
   
   
    const response = await fetch('https://api.twelvedata.com/time_series?symbol=AAPL,EUR/USD,ETH/BTC:Huobi,TRP:TSX&interval=1min&apikey=ee6ce9a81a53493db7b292e136f51241')
    const chart = await response.json()

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    // chart.forEach(renderChart)
    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];

    

    stocks.forEach( stock => stock.values.reverse())

// stock price Time Chart
new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: stocks[0].values.reverse().map(value => value.datetime),
        datasets: stocks.map(stock => ({
            label: stock.meta.symbol,
            data: stock.values.reverse().map(value => parseFloat(value.high)),
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
        }))
    }
});

// highest price chart
new Chart(highestPriceChartCanvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: stocks.map(stock => stock.meta.symbol),
        datasets:[{
            label: 'Highest',
            data: stocks.map(stock => getHighest(stock.values)),
            backgroundColor: stocks.map(stock => ( getColor(stock.meta.symbol) )),
            borderColor: stocks.map(stock =>( getColor(stock.meta.symbol) )),
        }]
    }
});

function getHighest(values){
    let highest =0;
    values.forEach(value => {
        if(parseFloat(value.high)>highest){
            highest = value.high
        }
    })
    return highest
}



// average chart
new Chart(averagePriceChartCanvas.getContext('2d'), {
    type: 'pie',
    data: {
        labels: stocks.map(stock => stock.meta.symbol),
        datasets:[{
            label: 'Average',
            data: stocks.map(stock => getAverage(stock.values)),
            backgroundColor: stocks.map(stock => ( getColor(stock.meta.symbol) )),
            borderColor: stocks.map(stock =>( getColor(stock.meta.symbol) )),
        }]
    }
});

function getAverage(values){
    let total = 0;
    values.forEach(value => {
        total += parseFloat(value.high)
    })
    return total 
}





    
    // root.appendChild()
    // console.log(stocks[0].values)                                                  

}
function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}
main()