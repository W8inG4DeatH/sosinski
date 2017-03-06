module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        clean: {

            dev: {
                // src: ["src/css/*"]
            },
            prod: {
                src: ["build/**/*"]
            }

        },

        jshint: {
            dev: {
                src: ["src/js/**/*.js", "!src/js/_scripts/*.js", "!src/js/scripts/*.js"]
            }
        },

        sass: {
            dist: {
                files: {
                    'css/app/styles.css': 'sass/styles.scss'
                }
            }
        },

        autoprefixer: {
            dev: {
                options: {
                    browsers: ["last 30 version"]
                },
                src: "src/css/app/styles.css"
            }
        },

        concat: {
            options: {
                separator: ";\n"
            },
            prod: {
                files: {
                    "build/js/app/scripts.js": "src/js/app/*.js"
                    // "build/js/app/scripts.js": "src/js/**/*.js",
                    // "build/css/app/styles.css": "src/css/app/*.css"
                }
            }
        },

        uglify: {
            options: {
                banner: "/* <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today('yyyy') %> */\n"
            },
            prod: {
                options: {
                    mangle: false
                },
                files: {
                    "build/js/scripts.min.js": "build/js/scripts.js"
                }
            }
        },

        cssmin: {
            prod: {
                files: {
                    "build/css/app/styles.min.css": "build/css/app/styles.css"
                }
            }
        },

        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            prod: {
                files: {
                    "build/index.html": "build/index.html"
                }
            }
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            source: {
                files: [{
                    src: [
                        'build/js/*.js',
                        'build/css/*.css'
                    ]
                }]
            }
        },        

        // imagemin: {
        //     options: {
        //         optimizationLevel: 3
        //     },
        //     prod: {
        //         files: [
        //             {
        //                 expand: true,
        //                 cwd: "src/img/",
        //                 src: "*",
        //                 dest: "build/img/"
        //             }
        //         ]
        //     }
        // },

        watch: {
            options: {
                //livereload: true
            },
            dev: {
                files: ["src/**/*"],
                tasks: ["dev"]
            }
        },

        copy: {
            cssscripts: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/css/scripts/',
                        src: ['**'],
                        dest: 'build/css/scripts/'
                    }
                ]
            },
            cssapp: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/css/app/',
                        src: ['**'],
                        dest: 'build/css/app/'
                    }
                ]
            },
            jsscripts: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/scripts/',
                        src: ['**'],
                        dest: 'build/js/scripts/'
                    }
                ]
            },
            jsapp: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/app/',
                        src: ['**'],
                        dest: 'build/js/app/'
                    }
                ]
            },
            assets: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/fonts/',
                        src: ['**'],
                        dest: 'build/fonts/'
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/',
                        src: ['**'],
                        dest: 'build/assets/'
                    },
                    {
                        expand: true,
                        cwd: 'src/img/',
                        src: ['**'],
                        dest: 'build/img/'
                    },
                    {
                        expand: true,
                        cwd: 'src/json/',
                        src: ['**'],
                        dest: 'build/json/'
                    },
                    {
                        expand: true,
                        cwd: 'src/php/',
                        src: ['**'],
                        dest: 'build/php/'
                    },           
                    {
                        expand: true,
                        cwd: 'src/views/',
                        src: ['**'],
                        dest: 'build/views/'
                    },
                    {
                        src: 'src/.htaccess',
                        dest: 'build/.htaccess'
                    },
                    {
                        src: 'src/favicon.ico',
                        dest: 'build/favicon.ico'
                    },
                    {
                        src: 'src/index.html',
                        dest: 'build/index.html'
                    }
                ]
            }
        },

        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'build'
            }
        },
        usemin: {
            html: 'build/index.html',
            options: {
                assetsDirs: ['build', 'build/css', 'build/js', 'build/json', 'build/php', 'build/views']
            }
        }        

    });

    grunt.loadNpmTasks("grunt-contrib-clean");  // czyści katalogi [build] i [src/css] przed kompilacją
    grunt.loadNpmTasks("grunt-contrib-jshint"); // wykrywa błędy w javascript
    // grunt.loadNpmTasks("grunt-contrib-sass"); // przetwarza .scss do .css
    grunt.loadNpmTasks("grunt-autoprefixer"); // rozszerza css o wersje przeglądarek w [src]
    grunt.loadNpmTasks("grunt-contrib-concat"); // łączy pliki .js w jeden do [build]
    grunt.loadNpmTasks("grunt-contrib-uglify"); // minifikuje plik .js w [build]
    grunt.loadNpmTasks("grunt-contrib-cssmin"); // minifikuje plik .css do [build]
    grunt.loadNpmTasks("grunt-contrib-htmlmin"); // minifikuje plik.html do [build]
    // grunt.loadNpmTasks("grunt-contrib-imagemin"); // minifikuje plik.html do [build]
    grunt.loadNpmTasks("grunt-contrib-copy");   // kopiuje pliki i katalogi
    grunt.loadNpmTasks("grunt-filerev");    // koduje nazwy .js i .css
    grunt.loadNpmTasks("grunt-usemin");     // targetuje index.html ?
    grunt.loadNpmTasks("grunt-contrib-watch"); // auto rebuild, który wykonuje "dev"

    // grunt.registerTask("dev", ["jshint", "autoprefixer"]);
    // // grunt.registerTask("prod", ["clean", "copy:cssscripts", "copy:jsscripts", "copy:jsapp", "copy:assets", "useminPrepare", "concat", "cssmin", "usemin"]);    // concat tylko dla .css
    // grunt.registerTask("prod", ["clean", "copy:cssapp", "copy:cssscripts", "copy:jsscripts", "copy:assets", "useminPrepare", "concat", "cssmin", "usemin"]);     // concat dla .css i .js (index.html <!-- build:js js/app/scripts.js -->)
    // grunt.registerTask("build", ["dev", "prod"]);
    // grunt.registerTask("build", "dev");

    grunt.registerTask("dev", ["jshint", "autoprefixer", "clean", "copy:cssapp", "copy:cssscripts", "copy:jsscripts", "copy:assets", "useminPrepare", "concat", "cssmin", "usemin"]);
    grunt.registerTask("default", "dev");

};