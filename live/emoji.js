const emotion_names = ['Neutral',
                       'Surprise',
                       'Happy',
                       'Sad',
                       'Disgust',
                       'Contempt',
                       'Angry',
                       'Fear'];
var option_index = 0;
var emo_vector_data = [];

function index_of_max(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}

const options_emoji = {
    'neutral':
    {    
    animationDuration: 100,
    animationDurationUpdate:100,
      grid: {
        show: false,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      xAxis: {
        show: false,
        type: 'category',
        data: [0]
      },
      yAxis: {
        show: false,
        type: 'category',
        data: [0]
      },
      series: [
        {
          type: 'scatter',
          data: [0,0,1],
          // neutral
          symbol:
            'path://M 444.67,409.85            C 444.67,419.90 436.53,428.04 426.48,428.04              416.43,428.04 408.28,419.90 408.28,409.85              408.28,399.80 416.43,391.66 426.48,391.66              436.53,391.66 444.67,399.80 444.67,409.85 Z            M 293.63,409.85            C 293.63,419.90 285.48,428.04 275.43,428.04              265.38,428.04 257.24,419.90 257.24,409.85              257.24,399.80 265.38,391.66 275.43,391.66              285.48,391.66 293.63,399.80 293.63,409.85 Z M 218.32,637.04            C 218.32,637.04 483.59,637.04 483.59,637.04           M 598.95,514.58            C 598.95,651.52 487.92,762.53 350.95,762.53              213.99,762.53 102.95,651.52 102.95,514.58              102.95,377.64 213.99,266.63 350.95,266.63              487.92,266.63 598.95,377.64 598.95,514.58 Z',
          itemStyle: {
            color: 'grey',
            borderColor: '#000000',
            borderWidth: 3
            },
          symbolKeepAspect: true,
          universalTransition: true,
          symbolSize: 200
        }
      ]
    },
    'happy':
    {
      // happy
      series: [
        {
          symbol:
            'path://M 367.45,456.16            C 367.45,456.16 432.83,355.00 432.83,355.00              432.83,355.00 490.32,455.05 490.32,455.05M 211.33,457.43            C 211.33,457.43 276.71,356.27 276.71,356.27              276.71,356.27 334.20,456.32 334.20,456.32M 502.10,545.67            C 502.10,611.75 435.58,665.42 353.08,666.35              352.38,666.36 351.65,666.36 350.92,666.36              268.87,666.36 202.09,614.18 199.80,549.12M 598.95,514.58            C 598.95,651.52 487.92,762.53 350.95,762.53              213.99,762.53 102.95,651.52 102.95,514.58              102.95,377.64 213.99,266.63 350.95,266.63              487.92,266.63 598.95,377.64 598.95,514.58 Z',
          'itemStyle': {
            color: 'yellow',
            }
        }
      ]
    },
    'sad':
    {
        // sad
        series: [
          {
            symbol:
              'path://M 393.62 392.76 L 492.34 491.74 M 308.29 392.76 L 209.57 491.74 M 271.62 686.53 L 430.28 686.53 M 598.95 514.58 C 598.95 651.52 487.92 762.53 350.95 762.53 C 213.99 762.53 102.95 651.52 102.95 514.58 C 102.95 377.64 213.99 266.63 350.95 266.63 C 487.92 266.63 598.95 377.64 598.95 514.58 Z',
            'itemStyle': {
              color: 'blue',
              }
          }
        ]
      },
      'surprise':
      {
        // surprise
        series: [
          {
            symbol:
              'path://M 537.07,400.91              C 537.07,450.06 497.22,489.91 448.05,489.91                398.89,489.91 359.04,450.06 359.04,400.91                359.04,351.76 398.89,311.91 448.05,311.91                497.22,311.91 537.07,351.76 537.07,400.91 Z              M 342.87,400.91              C 342.87,450.06 303.02,489.91 253.85,489.91                204.69,489.91 164.84,450.06 164.84,400.91                164.84,351.76 204.69,311.91 253.85,311.91                303.02,311.91 342.87,351.76 342.87,400.91 Z   M 417.62,621.81              C 417.62,670.18 387.77,709.40 350.95,709.40                314.14,709.40 284.29,670.18 284.29,621.81                284.29,573.44 314.14,534.22 350.95,534.22                387.77,534.22 417.62,573.44 417.62,621.81 Z                           M 598.95,514.58              C 598.95,651.52 487.92,762.53 350.95,762.53                213.99,762.53 102.95,651.52 102.95,514.58                102.95,377.64 213.99,266.63 350.95,266.63                487.92,266.63 598.95,377.64 598.95,514.58 Z M 262.54,407.59              C 262.54,410.63 260.07,413.10 257.03,413.10                253.98,413.10 251.51,410.63 251.51,407.59                251.51,404.54 253.98,402.07 257.03,402.07                260.07,402.07 262.54,404.54 262.54,407.59 Z              M 450.40,407.59              C 450.40,410.63 447.93,413.10 444.88,413.10                441.83,413.10 439.37,410.63 439.37,407.59                439.37,404.54 441.83,402.07 444.88,402.07                447.93,402.07 450.40,404.54 450.40,407.59 Z                 ',
            'itemStyle': {
              color: 'orange',
              }
          }
        ]
      },
      'fear':
      {
        // fear
        series: [
          {
            symbol:
              'path://M 537.07 456.75 C 537.07 505.9 497.22 545.74 448.05 545.74 C 398.89 545.74 359.04 505.9 359.04 456.75 C 359.04 407.59 398.89 367.75 448.05 367.75 C 497.22 367.75 537.07 407.59 537.07 456.75 Z M 342.87 456.75 C 342.87 505.9 303.02 545.74 253.85 545.74 C 204.69 545.74 164.84 505.9 164.84 456.75 C 164.84 407.59 204.69 367.75 253.85 367.75 C 303.02 367.75 342.87 407.59 342.87 456.75 Z M 431.08 591.38 C 481.33 607.91 512.35 638.7 511.69 672.67 C 486.02 650.48 420.17 635.55 347.47 636.22 C 274.77 636.89 211.49 653.01 190.23 674.87 C 189.27 640.13 219.47 609.07 269.27 592.1 C 319.07 575.13 380.83 574.85 431.08 591.38 Z M 598.95 514.58 C 598.95 651.52 487.92 762.53 350.95 762.53 C 213.99 762.53 102.95 651.52 102.95 514.58 C 102.95 377.64 213.99 266.63 350.95 266.63 C 487.92 266.63 598.95 377.64 598.95 514.58 Z M 523.31 371.82 L 431.18 318.63 M 178.59 371.82 L 270.73 318.63 M 262.54 456.75 C 262.54 459.79 260.07 462.26 257.03 462.26 C 253.98 462.26 251.51 459.79 251.51 456.75 C 251.51 453.7 253.98 451.23 257.03 451.23 C 260.07 451.23 262.54 453.7 262.54 456.75 Z M 450.4 456.75 C 450.4 459.79 447.93 462.26 444.88 462.26 C 441.83 462.26 439.37 459.79 439.37 456.75 C 439.37 453.7 441.83 451.23 444.88 451.23 C 447.93 451.23 450.4 453.7 450.4 456.75 Z',
            'itemStyle': {
              color: 'purple',
              }
          }
        ]
      },
      'disgust':
      {
        // disgust
        series: [
          {
            symbol:
              'path://M 468.62 487.93 L 381.44 437.97 L 467.66 394.05 M 234.25 394.05 L 320.47 437.97 L 233.29 487.93 M 254.09 628.86 C 255.55 576.66 298.35 534.79 352.32 534.8 C 405.19 535.54 447.81 578.61 447.81 631.63 M 598.95 514.58 C 598.95 651.52 487.92 762.53 350.95 762.53 C 213.99 762.53 102.95 651.52 102.95 514.58 C 102.95 377.64 213.99 266.63 350.95 266.63 C 487.92 266.63 598.95 377.64 598.95 514.58 Z',
            'itemStyle': {
              color: '#3a4525',  //brown green
              }
          }
        ]
      },
      'contempt':
      {
        // contempt
        series: [
          {
            symbol:
              'path:// M 494.88 441.31 C 494.88 472.07 469.94 497.01 439.17 497.01 C 408.4 497.01 383.46 472.07 383.46 441.31 C 383.46 410.55 408.4 385.62 439.17 385.62 C 469.94 385.62 494.88 410.55 494.88 441.31 Z  M 318.45 441.31 C 318.45 472.07 293.51 497.01 262.74 497.01 C 231.97 497.01 207.03 472.07 207.03 441.31 C 207.03 410.55 231.97 385.62 262.74 385.62 C 293.51 385.62 318.45 410.55 318.45 441.31 Z               M 261.66 635.03 C 257.43 632.9 255.12 630.58 255.12 628.15 C 255.12 623.16 264.91 618.6 281.03 615.14 C 299.98 611.06 327.69 608.48 358.57 608.48 C 366.8 608.48 374.8 608.67 382.48 609.01 C 419.59 610.68 448.96 616.15 458.62 623.14 L 358.57 628.15 L 261.66 635.03 Z M 598.95 514.58 C 598.95 651.52 487.92 762.53 350.95 762.53 C 213.99 762.53 102.95 651.52 102.95 514.58 C 102.95 377.64 213.99 266.63 350.95 266.63 C 487.92 266.63 598.95 377.64 598.95 514.58 Z M 468.47 423.42 C 468.47 431.26 462.11 437.61 454.27 437.61 C 446.43 437.61 440.08 431.26 440.08 423.42 C 440.08 415.58 446.43 409.23 454.27 409.23 C 462.11 409.23 468.47 415.58 468.47 423.42 Z              M 292.04 423.42 C 292.04 431.26 285.69 437.61 277.85 437.61 C 270 437.61 263.65 431.26 263.65 423.42 C 263.65 415.58 270 409.23 277.85 409.23 C 285.69 409.23 292.04 415.58 292.04 423.42 Z',
            'itemStyle': {
              color: 'brown',
              }
          }
        ]
      },
      'angry':
      {
        // angry
        series: [
          {
            symbol:
              'path://M 393.62 491.74 C 492.34 392.76 492.34 392.76 492.34 392.76 M 308.29 491.74 C 209.57 392.76 209.57 392.76 209.57 392.76              M 199.8 676.06 C 202.09 611 268.87 558.81 353.08 558.82 C 435.58 559.75 502.1 613.42 502.1 679.5 M 598.95 514.58 C 598.95 651.52 487.92 762.53 350.95 762.53 C 213.99 762.53 102.95 651.52 102.95 514.58 C 102.95 377.64 213.99 266.63 350.95 266.63 C 487.92 266.63 598.95 377.64 598.95 514.58 Z',
            'itemStyle': {
              color: 'red',
              }
          }
        ]
      }
};

const n_emo = Object.keys(options_emoji).length
console.log(option_index);
console.log(emotion_names[option_index]);
const option_emoji = options_emoji[emotion_names[option_index].toLowerCase()];

function emoji_update() {
    // var new_vector = current_emotion_vector.user_emotions[0];
    var new_vector = current_emotion_vector;
    emo_vector_data.push(new_vector);
    option_index = index_of_max(new_vector);
    console.log(option_index);
    console.log(emotion_names[option_index]);
    chart_emoji.setOption(options_emoji[emotion_names[option_index].toLowerCase()]);
}

function emoji_reset() {
  option_index = 0;
  emo_vector_data = [];
  chart_emoji.setOption(option_emoji);
}