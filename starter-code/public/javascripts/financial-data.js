axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(res => {
        //console.log(res.data);
        printTheChart(res.data);
        printMaxMin(res.data);
    });

let ctx = document.getElementById('canvas').getContext('2d');

let printMaxMin = ((stockData) => {
    let values = Object.values(stockData.bpi);
    let min = Math.min.apply(null, values);
    let max = Math.max.apply(null, values);
    document.getElementById('min').innerHTML = 'Min: ' + min;
    document.getElementById('max').innerHTML = 'Max: ' + max;
});

let printTheChart = ((stockData)=> {
    //console.log(stockData.bpi);
    let myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(stockData.bpi),
            datasets: [{
                label: 'BPI real-time data',
                backgroundColor: 'rgba(29,99,211,.5)',
                borderColor: 'rgb(29,99,211)',
                data: Object.values(stockData.bpi),
            }],
        },
    });
});


let startDate = document.getElementById('start');
let endDate = document.getElementById('end');
let currency = document.getElementById('currency');

function changeChart() {
    let start = startDate.value;
    let end = endDate.value;
    let curr = currency.options[currency.selectedIndex].value;

    if(start === '') {
        start = new Date().toISOString().slice(0, 10);
    }
    if(end === '') {
        end = new Date().toISOString().slice(0, 10);
    }

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${curr}&start=${start}&end=${end}`)
        .then(res => {
            //console.log(res.data);
            printTheChart(res.data);
            printMaxMin(res.data);
        });
}

startDate.addEventListener("change", changeChart);
endDate.addEventListener("change", changeChart);
currency.addEventListener("change", changeChart);