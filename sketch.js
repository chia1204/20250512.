let facemesh;
let video;
let predictions = [];
const points = [
  409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
  133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155,
  263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249
];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("FaceMesh model loaded!");
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();

    beginShape();
    for (let i = 0; i < points.length; i++) {
      const index = points[i];
      if (index < keypoints.length) { // 確保索引有效
        const [x, y] = keypoints[index];
        vertex(x, y);
      } else {
        console.log(`Index ${index} is out of bounds`);
      }
    }
    endShape(CLOSE);
  }
}