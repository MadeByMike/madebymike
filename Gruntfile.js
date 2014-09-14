module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
		sass: {
			min: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/styles.min.css': 'scss/styles.scss'
				}
			},
			extended: {
				options: {
					style: 'extended'
				},
				files: {
					'css/styles.css': 'scss/styles.scss'
				}
			},
			inline: {
				options: {
					style: 'compressed'
				},
				files: {
					'_includes/inline.css': 'scss/inline.scss'
				}
			}
		},
		jekyll: {
			site: {}
		}
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-jekyll');
	
    // Default task
    grunt.registerTask('default', ['sass','jekyll']);
	
};

