module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.url %> v.<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:mm") %> */\n',
                compress: {
                    drop_console: true,
                    dead_code: true
//                    screw_ie8: true
                },
//                beautify: true,
//                mangle: false,
                report: 'gzip'
            },
            build: {
                src: 'dev/el-scroll.js',
                dest: 'dist/el-scroll-min.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
};