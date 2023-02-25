export default {
  name: 'Artifact',
  slug: 'artifact',

  version: 1,

  /*
   * type
   *
   * which scene type to load.
   * -1 loads src/CustomScene.js
   */
  type: -1,

  /*
   * sky
   *
   * will load src/skybox.jpg as skybox image.
   * the leading slash is important
   */
  sky: '/skybox',

  glb: true,
 
  file: 'artifact',

  audio: '/artifact.mp3',

}
