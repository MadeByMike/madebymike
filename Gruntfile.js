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
			},
			fluidType: {
				options: {
					style: 'extended'
				},
				files: {
					'css/fluid-type-examples.css': 'scss/fluid-type-examples.scss'
				}
			}
		},
		cqdemo: {
			
		},
		watch: {
			scripts: {
				files: ['scss/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
				},
			},
		}
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    grunt.registerTask('default', ['sass']);

};
