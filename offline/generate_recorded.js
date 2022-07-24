var timestamp_data_raw = JSON.stringify(x_ticks);
var av_emotion_data_raw = JSON.stringify(av_data);
var vector_emotion_data_raw = JSON.stringify(emo_data_raw);

var blob = new Blob([timestamp_data_raw], {type: "text/plain;charset=utf-8"});
saveAs(blob, 'timestamps.txt');

var blob2 = new Blob([av_emotion_data_raw], {type: "text/plain;charset=utf-8"});
saveAs(blob2, 'av_emotion_data.txt');

var blob3 = new Blob([vector_emotion_data_raw], {type: "text/plain;charset=utf-8"});
saveAs(blob3, 'vector_emotion_data.txt');


// ======================================================================
// this is with node.js package filestream
// ======================================================================
// var file_timestamps = fs.createWriteStream('timestamps.txt');
// file_timestamps.on('error', function(err) { /* error handling */ });
// x_ticks.forEach(function(v) { file_timestamps.write(v + '\n'); });
// file_timestamps.end();

// var file_av = fs.createWriteStream('user_emotions_av.txt');
// file_av.on('error', function(err) { /* error handling */ });
// data_emotion_arousal_valence.user_emotions.forEach(function(v) { file_av.write(v.join(',') + '\n'); });
// file_av.end();

// var file_vectors = fs.createWriteStream('user_emotions_vectors.txt');
// file_vectors.on('error', function(err) { /* error handling */ });
// data_emotion_vectors.user_emotions.forEach(function(v) { file_vectors.write(v.join(',') + '\n'); });
// file_vectors.end();

// ======================================================================
// this is zipping with fflate, but something is bugged
// ======================================================================
// const zipped = fflate.zipSync({
//     'video.mp4': [video_data_raw],
//     'timestamps.txt': [timestamp_data_raw],
//     'av_emotion_data.txt': [av_emotion_data_raw],
//     'vector_emotion_data.txt': [vector_emotion_data_raw]
//   }
//   ,{level: 0}
//   );

// ======================================================================
// this is zipping with JSZIP and downloading with FileSaver, but the Zip file is corrupted
// ======================================================================
// var zipped = new JSZip();

// zipped.file("video.mp4", video_data_raw);
// zipped.file("timestamps.txt", timestamp_data_raw);
// zipped.file("av_emotion_data.txt", av_emotion_data_raw);
// zipped.file("vector_emotion_data.txt", vector_emotion_data_raw);

// var promise = null;
// promise = zipped.generateAsync({type : "string"}).then(function(zip) {
//     var blob = new Blob([zip], {type: "text/plain;charset=utf-8"});
//     console.log(zip);
//     console.log(blob);
//     saveAs(blob, 'recorded.zip');
// });