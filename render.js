var camera, scene, renderer;
var geometry, material, mesh;
var vertexShader = $('#defaultVertex').text();
var fragShader = $('#defaultFragmental').text();
var clock;


uniforms = {
	time: { type: 'f', value: 1.0 },
	resolution: { type: 'v2', value: new THREE.Vector2( window.innerWidth/2, window.innerHeight/2) },
	texture: { value: new THREE.TextureLoader().load( 'textures/disturb.jpg' ) }
};



var geometry = new THREE.BoxGeometry( 0.6, 0.6, 0.6 );
var isAnimated = true;


function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );

	camera.position.z = 1;
	scene = new THREE.Scene();
	clock = new THREE.Clock();
	material = new THREE.ShaderMaterial({
		uniforms : uniforms,
		vertexShader : vertexShader,
		fragmentShader : fragShader
	});
	
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth/2, window.innerHeight/2);
	if ($('#WebGL-output').children().length) {
		$('#WebGL-output').empty();
	}

	$('#WebGL-output').append( renderer.domElement );
}

function animate() {
	requestAnimationFrame( animate );

	var delta = clock.getDelta ();
	
	uniforms.time.value += delta * 5;
	
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

	vertexEditor.setValue($('#defaultVertex').text(), 1);
	fragEditor.setValue($('#defaultFragmental').text(), 1);

	init();
	animate();
});

$( window ).resize(function() {
	init();
});

$('#compileButton').click(function () {
	var editorCode = fragEditor.getValue();
	fragShader = editorCode;

	editorCode = vertexEditor.getValue();
	vertexShader = editorCode;
	init ();
});



function boxButtonClick () {
	geometry = new THREE.BoxGeometry( 0.6, 0.6, 0.6 );
	isAnimated = true;
	init();
}

function planeButtonClick () {
	geometry = new THREE.PlaneGeometry( 2, 2, 2 );
	isAnimated = false;
	init();
}

function sphereButtonClick () {
	geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
	isAnimated = false;
	init();
}

/*
$('#boxButton').click(boxButtonClick);
$('#planeButton').click(planeButtonClick);
$('#sphereButton').click(sphereButtonClick);*/