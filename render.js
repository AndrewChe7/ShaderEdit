var camera, scene, renderer;
var geometry, material, mesh;
var vertexShader = "uniform float time; uniform vec2 resolution;void main()	{gl_Position = vec4( position, 1.0 );}"
var fragShader = "uniform float time;uniform vec2 resolution;void main()	{float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;gl_FragColor = vec4(vec3(min(x, y)), 1.);}";

uniforms = {
	time: { type: "f", value: 1.0 },
	resolution: { type: "v2", value: new THREE.Vector2() }
};
var geometry = new THREE.BoxGeometry( 0.6, 0.6, 0.6 );
var isAnimated = true;


function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );

	camera.position.z = 1;
	scene = new THREE.Scene();

	material = new THREE.ShaderMaterial({
		uniforms : uniforms,
		vertexShader : vertexShader,
		fragmentShader : fragShader
	});
	
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth/2, window.innerHeight/2);
	if ($("#WebGL-output").children().length) {
		$("#WebGL-output").empty();
	}

	$("#WebGL-output").append( renderer.domElement );
}

function animate() {
	requestAnimationFrame( animate );
	if (isAnimated) {
		mesh.rotation.x += 0.005;
		mesh.rotation.y += 0.003;
	} else {
		mesh.rotation.x = 0;
		mesh.rotation.y = 0;
	}

	renderer.render( scene, camera );

}

$(document).ready(function () {
	init();
	animate();
});

$( window ).resize(function() {
	init();
});

$("#compileButton").click(function () {
	var editorCode = fragEditor.getValue();
	fragShader = editorCode;
	init ();
});

$("#boxButton").click(function () {
	geometry = new THREE.BoxGeometry( 0.6, 0.6, 0.6 );
	isAnimated = true;
	init();
});

$("#planeButton").click(function () {
	geometry = new THREE.PlaneGeometry( 2, 2, 2 );
	isAnimated = false;
	init();
});

$("#sphereButton").click(function () {
	geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
	isAnimated = false;
	init();
});