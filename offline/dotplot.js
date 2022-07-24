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

var option_dotplot = {
    animationDuration: 200,
    animationDurationUpdate:200,
    grid: {
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