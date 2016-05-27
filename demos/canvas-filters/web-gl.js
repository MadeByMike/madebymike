function loadShader(gl, shaderSource, shaderType) {
	// Create the shader object
	var shader = gl.createShader(shaderType);

	// Load the shader source
	gl.shaderSource(shader, shaderSource);

	// Compile the shader
	gl.compileShader(shader);

	// Check the compile status
	var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (!compiled) {
	  // Something went wrong during compilation; get the error
	  throw ("Error compiling shader '" + shader + "':" + gl.getShaderInfoLog(shader));
	  gl.deleteShader(shader);
	  return null;
	}

	return shader;
}

function createShaderFromScript(gl, scriptId) {
	var shaderSource = "";
	var shaderType;
	var shaderScript = document.getElementById(scriptId);
	if (!shaderScript) {
	  throw ("*** Error: unknown script element" + scriptId);
	}
	shaderSource = shaderScript.text;

	if (shaderScript.type === "x-shader/x-vertex") {
		shaderType = gl.VERTEX_SHADER;
	} else if (shaderScript.type === "x-shader/x-fragment") {
		shaderType = gl.FRAGMENT_SHADER;
	} else {
		throw ("*** Error: unknown shader type");
	}

	return loadShader(gl, shaderSource, shaderType);
}

function createProgramFromScripts(gl, shaderScripts) {
	var shaders = [];
	for (var ii = 0; ii < shaderScripts.length; ++ii) {
	  shaders.push(createShaderFromScript(gl, shaderScripts[ii][0], gl[shaderScripts[ii][1]]));
	}
	return createProgram(gl, shaders);
}

function createProgram(gl, shaders) {

	var program = gl.createProgram();
	shaders.forEach(function(shader) {
	  gl.attachShader(program, shader);
	});
	
	gl.linkProgram(program);

	// Check the link status
	var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (!linked) {
		// something went wrong with the link
		var lastError = gl.getProgramInfoLog(program);
		throw("Error in program linking:" + lastError);
		gl.deleteProgram(program);
		return null;
	}
	return program;
}
