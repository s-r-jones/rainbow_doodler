/**
 * this is the fugginscript
 */

// How to load in modules
const Scene = require("Scene");
const D = require("Diagnostics");
const DeviceMotion = require("DeviceMotion");
const R = require("Reactive");
const P = require("Patches");

const screenCenter3d = Scene.unprojectWithDepth(
  R.point2d(R.val(0.5), R.val(0.6)),
  0.01
);

const deviceWorldTransform = DeviceMotion.worldTransform;

const emitterBase = Scene.root
  .child("Device")
  .child("Camera")
  .child("Focal Distance")
  .child("emitter_base");

const eyeBase = Scene.root
  .child("Device")
  .child("Camera")
  .child("Focal Distance")
  .child("eye_base");

const leftInnerEye = eyeBase.child("eye_base3");
const rightInnerEye = eyeBase.child("eye_base4");

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require("Diagnostics");
const longPressSignal = P.getBooleanValue("longPress");

const leftEyeBase = Scene.root.child("eye_base1");
const leftEye = leftEyeBase.child("eye1");
const rightEyeBase = Scene.root.child("eye_base2");
const rightEye = rightEyeBase.child("eye2");

const mouthBase = Scene.root.child("mouth_base");

const emitBaseTransform = emitterBase.worldTransform;

// eyePivot.transform.x = emitBaseTransform.x;
// eyePivot.transform.y = emitBaseTransform.y;
// eyePivot.transform.z = emitBaseTransform.z;

// eyePivot.transform.rotationX = emitBaseTransform.rotationX;
// eyePivot.transform.rotationY = emitBaseTransform.rotationY;
// eyePivot.transform.rotationZ = emitBaseTransform.rotationZ;

// TODO: Addd eyeball offset signal const
const leftXPos = emitBaseTransform.x.sub(0.06);
const rightXPos = emitBaseTransform.x.add(0.06);
const yPos = emitBaseTransform.y.add(0.06);
const zPos = emitBaseTransform.z.add(0.08);

mouthBase.transform.x = emitBaseTransform.x;
mouthBase.transform.y = emitBaseTransform.y.sub(0.02);
mouthBase.transform.z = rightInnerEye.worldTransform.z.add(0.01);

mouthBase.transform.rotationX = emitBaseTransform.rotationX;
mouthBase.transform.rotationY = emitBaseTransform.rotationY;
//mouthBase.transform.rotationZ = emitBaseTransform.rotationZ;

// leftEyeBase.transform.x = leftXPos;
// leftEyeBase.transform.y = yPos;
// leftEyeBase.transform.z = zPos;
// rightEyeBase.transform.x = rightXPos;
// rightEyeBase.transform.y = yPos;
// rightEyeBase.transform.z = zPos;

leftEyeBase.transform.x = leftInnerEye.worldTransform.x;
leftEyeBase.transform.y = leftInnerEye.worldTransform.y;
leftEyeBase.transform.z = leftInnerEye.worldTransform.z;
rightEyeBase.transform.x = rightInnerEye.worldTransform.x;
rightEyeBase.transform.y = rightInnerEye.worldTransform.y;
rightEyeBase.transform.z = rightInnerEye.worldTransform.z;

// planeTransform.rotationX = deviceWorldTransform.rotationX;
// planeTransform.rotationY = deviceWorldTransform.rotationY;
// planeTransform.rotationZ = deviceWorldTransform.rotationZ;

longPressSignal.monitor({ fireOnInitialValue: false }).subscribe(val => {
  if (val.newValue === true) {
    // leftEyeBase.transform.x = leftXPos;
    // leftEyeBase.transform.y = yPos;
    // leftEyeBase.transform.z = zPos;
    // rightEyeBase.transform.x = rightXPos;
    // rightEyeBase.transform.y = yPos;
    // rightEyeBase.transform.z = zPos;

    leftEyeBase.transform.x = leftInnerEye.worldTransform.x;
    leftEyeBase.transform.y = leftInnerEye.worldTransform.y;
    leftEyeBase.transform.z = leftInnerEye.worldTransform.z;
    rightEyeBase.transform.x = rightInnerEye.worldTransform.x;
    rightEyeBase.transform.y = rightInnerEye.worldTransform.y;
    rightEyeBase.transform.z = rightInnerEye.worldTransform.z;

    mouthBase.transform.x = emitBaseTransform.x;
    mouthBase.transform.y = emitBaseTransform.y.sub(0.02);
    mouthBase.transform.z = rightInnerEye.worldTransform.z.add(0.01);

    mouthBase.transform.rotationX = emitBaseTransform.rotationX;
    mouthBase.transform.rotationY = emitBaseTransform.rotationY;
    //mouthBase.transform.rotationZ = emitBaseTransform.rotationZ;
  } else {
    leftEyeBase.transform.x = leftEyeBase.transform.x.pinLastValue();
    leftEyeBase.transform.y = leftEyeBase.transform.y.pinLastValue();
    leftEyeBase.transform.z = leftEyeBase.transform.z.pinLastValue();
    rightEyeBase.transform.x = rightEyeBase.transform.x.pinLastValue();
    rightEyeBase.transform.y = rightEyeBase.transform.y.pinLastValue();
    rightEyeBase.transform.z = rightEyeBase.transform.z.pinLastValue();

    mouthBase.transform.x = mouthBase.transform.x.pinLastValue();
    mouthBase.transform.y = mouthBase.transform.x.pinLastValue();
    mouthBase.transform.z = mouthBase.transform.z.pinLastValue();
  }
});

// Look at utility function.
// Because of reactive stupidness, we can't actually apply the lookat directly to the looker itself
// We get around this by nesting the looker object inside a null with no values applied to it's transform
//

const transform1 = leftEyeBase.transform.lookAt(screenCenter3d);

const leftVector = R.vector(
  transform1.rotationX,
  transform1.rotationY,
  transform1.rotationZ
);

const DELAY_AMT = 400;

leftEye.transform.rotationX = leftVector.x.delayBy({ milliseconds: DELAY_AMT });
leftEye.transform.rotationY = leftVector.y.delayBy({ milliseconds: DELAY_AMT });
leftEye.transform.rotationZ = leftVector.z.delayBy({ milliseconds: DELAY_AMT });

const transform2 = rightEyeBase.transform.lookAt(screenCenter3d);

const rightVector = R.vector(
  transform2.rotationX,
  transform2.rotationY,
  transform2.rotationZ
);
rightEye.transform.rotationX = rightVector.x.delayBy({
  milliseconds: DELAY_AMT
});
rightEye.transform.rotationY = rightVector.y.delayBy({
  milliseconds: DELAY_AMT
});
rightEye.transform.rotationZ = rightVector.z.delayBy({
  milliseconds: DELAY_AMT
});
