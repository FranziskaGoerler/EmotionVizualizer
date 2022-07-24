function histogram(data, n_bins) {
    let min = -1.;
    let max = 1.;

    const size = (max-min)/n_bins;

    const histogram = new Array(n_bins**2).fill(0);

    for (const coords of data) {
        var x = Math.floor((coords[0] - min) / size);
        var y = Math.floor((coords[1] - min) / size);
        histogram[y*n_bins + x]++;
    }

    return histogram;
}

function shape_histogram(hist) {
    var length = hist.length;
    var n_bins = Math.sqrt(length)
    // console.log(length);

    var arr = new Array(length);

    for (var x = 0; x < n_bins; x++) {
        for (var y = 0; y < n_bins; y++) {
            var i = y*n_bins + x
            arr[i] = new Array(3);
            arr[i][0] = x;
            arr[i][1] = y;
            arr[i][2] = hist[i]; 
        }
    }
    return arr;
}

const n_bins = 10;
const bins = [...Array(n_bins).keys()];
// var av_data = data_emotion_arousal_valence.map(x => x.user_emotions[0]);
var av_data = [];
var arr = [];
var hist_max = 0;

var option_heatmap = {
  tooltip: {
    position: 'top'
  },
  grid: {
    height: '80%',
    top: '10%'
  },
  xAxis: {
    type: 'category',
    data: n_bins,
    splitArea: {
      show: false
    },
    show: false
  },
  yAxis: {
    type: 'category',
    data: n_bins,
    splitArea: {
      show: false
    },
    show: false
  },
  visualMap: {
    min: 0,
    max: 0,
    calculable: false,
    orient: 'horizontal',
    show: false,
    left: 'center',
    bottom: '0%',
    inRange : {   
      color: ['#D5D8DC', '#2C3E50' ]
    }
  },
  series: [
    {
      name: 'Punch Card',
      type: 'heatmap',
      data: [],
      label: {
        show: false
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

function initialize_heatmap() {
  var heat_option = chart_heatmap.getOption();
  var hist = histogram(av_data, n_bins);
  arr = shape_histogram(hist);
  hist_max = Math.max(...hist);
  heat_option.series[0].data = arr;
  heat_option.visualMap[0].max = hist_max;
  heat_option.visualMap[0].range = [0, hist_max];
  chart_heatmap.setOption(heat_option);
}

function load_heatmap_data(new_av_data) {
  var heat_option = chart_heatmap.getOption();
  var hist = histogram(new_av_data, n_bins);
  var arr_new = shape_histogram(hist);
  var hist_max_new = Math.max(...hist);
  heat_option.series[0].data = arr_new;
  heat_option.visualMap[0].max = hist_max_new;
  heat_option.visualMap[0].range = [0, hist_max_new];
  chart_heatmap.setOption(heat_option);
}

function restore_heatmap() {
  var heat_option = chart_heatmap.getOption();
  heat_option.series[0].data = arr;
  heat_option.visualMap[0].max = hist_max;
  heat_option.visualMap[0].range = [0, hist_max];
  chart_heatmap.setOption(heat_option);
}