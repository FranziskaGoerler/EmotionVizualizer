const video_source = document.getElementById("video_source");
const video_player = document.getElementById("video_player");
const file_selector = document.getElementById("file_selector");
// const sync_to_video_button = document.getElementById("sync_to_video");

file_selector.addEventListener('change',  read_files)
// video_player.addEventListener('loadedmetadata', function() {
//     this.currentTime = 50;
//   }, false);
//   sync_to_video_button.addEventListener('click', sync_to_video);

function read_files(event) {
  console.log(event.target.files)
  if (event.target.files && event.target.files[0]) {
    for (f of event.target.files) {
      console.log(f);
      var filename = f.name.toLowerCase();
      if (filename.startsWith('recorded') || filename.includes('video')) {
        var reader = new FileReader();
        reader.onload = function(e) {
          console.log('video loaded')
          video_source.src = e.target.result
          video_player.load()
        }.bind(this)

        reader.readAsDataURL(f);
      }
      else if (filename.includes('timestamp')) {
        var reader = new FileReader();
        reader.onload = function(e) {
          console.log('timestamp data loaded')
          json_str = atob(e.target.result.split('base64,')[1]);
          // console.log(json_str);
          x_ticks = JSON.parse(json_str);
          initialize_lineplot(); 
        }.bind(this)

        reader.readAsDataURL(f);
      }
      else if (filename.includes('vector')) {
        var reader = new FileReader();
        reader.onload = function(e) {
          console.log('vector data loaded')
          json_str = atob(e.target.result.split('base64,')[1]);
          // console.log(json_str);
          emo_data_raw = JSON.parse(json_str);
          av_data = vectors_to_avs(emo_data_raw);
          x_ticks = generate_timestamp(emo_data_raw.length, 3)
          console.log(x_ticks)
          initialize_lineplot(); 
          initialize_heatmap();
        }.bind(this)

        reader.readAsDataURL(f);
      }
      // else if (filename.includes('av')) {
      //   var reader = new FileReader();
      //   reader.onload = function(e) {
      //     console.log('AV data loaded')
      //     json_str = atob(e.target.result.split('base64,')[1]);
      //     // console.log(json_str);
      //     av_data = JSON.parse(json_str);
      //     initialize_heatmap();
      //   }.bind(this)

      //   reader.readAsDataURL(f);
      // }
    }
  }
}

function read_video_zip(event) {
  console.log(event.target.files)
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      console.log('loaded')
      // console.log(e.target.result);
      var content = e.target.result;
      console.log(content);
      // fflate: this is bugged
      // var decompressed = fflate.decompressSync(content);
      // console.log(decompressed);
      // but using JSZip does not work either
      var new_zip = new JSZip();
      // more files !
      new_zip.loadAsync(content)
      .then(function(zip) {
          // you now have every files contained in the loaded zip
          zip.file("recorded.mp4").async("string").then(function(vid_src) {
            video_source.src = vid_src
            video_player.load()
          });
          zip.file("timestamps.txt").async("string").then(function(ts) {
            x_ticks = JSON.parse(ts);
          });
          zip.file("av_emotion_data.txt").async("string").then(function(av) {
            av_data = JSON.parse(av);
          });
          zip.file("vector_emotion_data.txt").async("string").then(function(vec) {
            emo_data_raw = JSON.parse(vec);
          });
        await;
        load_heatmap_data(av_data);
        load_lineplot_data(); 
      });
    }.bind(this)

    reader.readAsDataURL(event.target.files[0]);
  }
}

function on_zoom() {
    var line_option = chart_lineplot.getOption();
    var start = line_option.dataZoom[0].startValue;
    var end = line_option.dataZoom[0].endValue;
    var mid = Math.floor((start+end)/2);
    var mid_timestamp = x_ticks[mid].split(':')
    var mid_seconds = Number(mid_timestamp[0])*60 + Number(mid_timestamp[1])
    console.log('Setting video position to ' + mid_seconds.toString() + ' s.');
    video_player.currentTime = mid_seconds;
    var new_x_width = end-start;
    // to prevent recalculation when scrolling we check whether zoom level changed by more than 2%
    if (Math.abs((new_x_width - x_width) / x_width) > 0.02) {
        x_width = new_x_width;

        if (recalc) {
          var emo_cal = re_calc_data(emo_data, start, end);
        }
        else {
          var emo_cal = emo_data;
        }
        for (var s=0; s<n_emo; s++){
            line_option.series[s].data = emo_cal[s];
        }
        chart_lineplot.setOption(line_option);
    }
    var av_data_selected = av_data.slice(start, end);
    load_heatmap_data(av_data_selected);
}

function on_restore() {
    console.log('Restore: Setting video position to 0.');
    video_player.currentTime = 0;
    restore_heatmap();
    initialize_lineplot();
}