module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		express: {
			options: {
				port: 8080
			},
			dev: {
				options: {
					script: 'server/app.js',
					node_env: 'dev'
				}
			},
			prod: {
				options: {
					script: 'server/app.js',
					node_env: 'prod'
				}
			}
		},

		watch: {
			express: {
				files: ['server/**.js', 'server/**/**.js'],
				tasks: ['express:dev'],
				options: {
					spawn: false
				}
			},
			scripts: {
				files: ['scripts/**.js', 'scripts/**/**.js'],
				tasks: ['requirejs:compile']
			}
		},

		requirejs: {
			compile: {
				options: {
					baseUrl: 'scripts',
					mainConfigFile: 'scripts/config.js',
					name: '../node_modules/requirejs/require',
					out: 'www/js/app.js',
					optimize: 'none'
				}
			}
		},

		env: {
			dev: {
				NODE_ENV: 'dev',
				SERVER_BASE_PATH: 'http://localhost:8080/',
				DB_PATH: 'mongodb://localhost/protectDB'
			}
		}
	});

	grunt.registerTask('default', ['env:dev', 'express:dev', 'requirejs:compile', 'watch']);
};