const threshold_input = document.getElementById("threshold_input");
const recalc = true;
// const sync_to_video_button = document.getElementById("sync_to_video");

threshold_input.addEventListener('input',  set_y_lower_limit)

function moving_avg(array, count){

    // calculate average for subarray
    var avg = function(array){

        var sum = 0, count = 0, val;
        for (var i in array)
                sum += array[i];

        return sum / array.length;
    };

    var result = [], val;

    // pad beginning of result with null values
    for (var i=0; i < count-1; i++)
    result.push(null);

    // calculate average for each subarray and add to result
    for (var i=0, len=array.length - count; i <= len; i++){

        val = avg(array.slice(i, i + count));
        result.push(val);
    }

    return result;
}

const min_points = 50;
const emotion_colors = ['grey',
                        'orange',
                        'yellow',
                        'blue',
                        '#3a4525ff', // brown green
                        'brown', 
                        'red',
                        'purple'];
const default_colors = ['#5470c6',   // mid blue
                        '#91cc75',   // grass green
                        '#fac858',   // dark yellow
                        '#ee6666',   // pale red
                        '#73c0de',   // sky blue
                        '#3ba272',   // mid green
                        '#fc8452',   // light orange
                        '#9a60b4',   // purple
                        '#ea7ccc'    // pink
                      ];
const emotion_names = ['Neutral',
                       'Surprise',
                       'Happy',
                       'Sad',
                       'Disgust',
                       'Contempt',
                       'Angry',
                       'Fear'];
// var emo_data_raw = data_emotion_vectors.map(x => x.user_emotions[0]);
var emo_data_raw = [];
var emo_data = [];
var n_emo = 0;
var x_ticks = [];
var x_width = 0;
var series_list = [];
// //for video of given length
// for (var i=0; i<n_frames; i++) {
//     raw_seconds = i*0.623;
//     minutes = Math.floor(raw_seconds / 60);
//     seconds = Math.round((raw_seconds % 60) * 100) / 100;
//     x_ticks[i] = minutes.toString() + ':' + seconds.toString();
// }
// console.log(x_ticks);

function re_calc_data(emo_data, min, max) {
    var n_datapoints = max - min + 1;
    var window_size = n_datapoints / min_points;
    if (window_size < 2)
        return emo_data;
    else {
        var emo_cal = emo_data.map(x => moving_avg(x, window_size));
        return emo_cal;
    }
}

var option_lineplot = {
    grid: {
        height: '80%',
        top: '10%',
        left: '5%',
        right: '15%'
      },
    legend: {
      left: 'right',
      top: 'center',
      orient: 'vertical'
    },
    color: emotion_colors,
    toolbox: {
        orient: 'horizontal',
        left: 'center',
        itemSize: 25,
        top: 'top',
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {}
        }
      },
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1
    },
    dataZoom: [
        {
        type: 'inside',
        throttle: 50
        }
    ],
    series: [
    ]
  };

function initialize_lineplot() {
  chart_lineplot.clear();
  if (emo_data_raw.length) {
    console.log(emo_data_raw.length)
    n_emo = emo_data_raw[0].length;
    // const n_emo = 1;
    var n_frames = emo_data_raw.length;
    emo_data = [];
    for (var e=0; e<n_emo; e++)
        emo_data.push(emo_data_raw.map(x => x[e]));

    if (recalc) {
      var emo_calc = re_calc_data(emo_data, 0, n_frames);
    }
    else 
      var emo_calc = emo_data;

    x_width = n_frames;

    // console.log(emo_calc);

    series_list = [];
    for (var s=0; s<n_emo; s++){
      series_list.push({
          name: emotion_names[s],
          data: emo_calc[s],
          // data: emo_data[s],
          type: 'line'
        })
      }
    }
  option_lineplot.xAxis.data = x_ticks;
  option_lineplot.series = series_list;
  chart_lineplot.setOption(option_lineplot);
  threshold_input.value = '0.0';
}

function set_y_lower_limit(e) {
  var val = e.target.value;
  console.log('new threshold: '+ val);
  if (~isNaN(val)) {  // check if convertible to number
    var numb = +val   // convert to number
  }
  if ((numb < 1) && (0 <= numb)) {
    console.log('...valid');
    var line_option = chart_lineplot.getOption();
    line_option.yAxis[0].min = numb;
    chart_lineplot.setOption(line_option);
    console.log('threshold set to y axis');
  }
}