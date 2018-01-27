var camera, scene, renderer;
var geometry, material, mesh;


function init(shader) {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;
	scene = new THREE.Scene();
	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	
	material = new THREE.ShaderMaterial({
		fragmentShader : shader
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

	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.003;

	renderer.render( scene, camera );

}

$(document).ready(function () {
	init();
	animate();
});

$( window ).resize(function() {
	init();
});