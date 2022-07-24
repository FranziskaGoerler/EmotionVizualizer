// var pointer = 0, buffer = [];
// const ring_buffer = {
//     get : function(key){
//         if (key === false)
//             return buffer[(pointer - 1) % length];
//         else
//             return buffer[(pointer - 1 + key) % length];
//         },
//     push : function(item){
//       buffer[pointer] = item;
//       pointer = (pointer + 1) % length;
//         }
//     };

const n_dots = 10;
const dot_size = 20;
var dot_data = [];
const dot_color = '#ff00ff'
const biggest_historic_dot = 0.66
const smallest_historic_dot = 0.25

var default_series = {
    type: 'scatter',
    markPoint: {
        symbolSize: 0,
        label: {
            color: 'green',
            fontSize: 16,
            textBorderColor: 'white',
            textBorderWidth: 1,
            formatter: '{b}',
            position: 'bottom'
        },
        data: [
            {
                name: 'Neutral',
                coord: [0, 0],
                label: {show: true}
            },
            {
                name: 'Happy',
                coord: [0.8, 0.2],
                label: {show: true}
            },
            {
                name: 'Surprise',
                coord: [0.22, 0.98],
                label: {show: true}
            },
            {
                name: 'Excited',
                coord: [0.62, 0.65],
                label: {show: true}
            },
            {
                name: 'Sad',
                coord: [-0.8, -0.3],
                label: {show: true}
            },
            {
                name: 'Disgust',
                coord: [-0.9, 0.25],
                label: {show: true}
            },
            {
                name: 'Contempt',
                coord: [-0.8, 0.5],
                label: {show: true}
            },
            {
                name: 'Angry',
                coord: [-0.5, 0.75],
                label: {show: true}
            },
            {
                name: 'Fear',
                coord: [-0.12, 0.98],
                label: {show: true}
            },
            {
                name: 'Negative',
                coord: [-1, 0.08],
                label: {show: true, color: 'red'}
            },
            {
                name: 'Positive',
                coord: [1, 0.08],
                label: {show: true, color: 'lime'}
            },
            {
                name: 'Exciting',
                coord: [0, 1],
                label: {show: true, color: 'orange', position: 'top'}
            },
            {
                name: 'Calming',
                coord: [0, -1],
                label: {show: true, color: 'blue'}
            },
            {
                name: 'Pleased',
                coord: [0.85, -0.1],
                label: {show: true}
            },
            {
                name: 'Relaxed',
                coord: [0.75, -0.5],
                label: {show: true}
            },
            {
                name: 'Sleepy',
                coord: [0.2, -0.8],
                label: {show: true}
            },
            {
                name: 'Tired',
                coord: [-0.2, -0.8],
                label: {show: true}
            },
            {
                name: 'Bored',
                coord: [-0.5, -0.6],
                label: {show: true}
            },
            {
                name: 'Depressed',
                coord: [-0.55, -0.45],
                label: {show: true}
            },
            {
                name: 'Miserable',
                coord: [-0.7, -0.1],
                label: {show: true}
            }
        ]
    }
};

var factors = [];
for (var j=0; j<n_dots-1; j++){
    factors.push(biggest_historic_dot * ((smallest_historic_dot / biggest_historic_dot)**(1-(j/(n_dots-2)))))
}
factors.push(1);
console.log(factors);

var option_dotplot = {
    animationDuration: 200,
    animationDurationUpdate:200,
    grid: {
        show: false,
        height: '80%',
        top: '10%',
        width: '80%',
        left: '10%'
      },
    xAxis: {
        type: 'value',
        name: '',  //valence
        min: -1,
        max: 1,
        show: true,
        axisLabel: {show: false},
        axisLine: {lineStyle: {color: 'green', width:1}},
        nameTextStyle: {fontSize: 16},
        splitLine: {show: false}  // grid lines
      },
    yAxis: {
        type: 'value',
        name: '',  //arousal
        min: -1,
        max: 1,
        show: true,
        axisLabel: {show: false},
        axisLine: {lineStyle: {color: 'green', width:1}},
        nameTextStyle: {fontSize: 16},
        splitLine: {show: false}  // grid lines
      },
    series: default_series
    };

function dotplot_update() {
    var series_list = [default_series];
    var offset_i = Math.max(n_dots - av_data.length, 0);
    if (offset_i == 0)
        dot_data = av_data.slice(av_data.length - n_dots, av_data.length);
    else
        dot_data = av_data;
    for (var i=dot_data.length-1; i>=0; i--) {
        series_list.push({
            symbolSize: dot_size*factors[i + offset_i],
            data: [dot_data[i]],
            type: 'scatter',
            itemStyle: {
                color: dot_color,
                borderColor: '#00ff00',
                borderWidth: Math.floor((i + offset_i +1) / n_dots),
                opacity: factors[i + offset_i]
            }
        });
    }
    var dot_option = chart_dotplot.getOption();
    dot_option.series = series_list;
    chart_dotplot.setOption(dot_option);
}

function dotplot_reset() {
    chart_dotplot.clear();
    dot_data = [];
    chart_dotplot.setOption(option_dotplot);
}