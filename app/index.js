(function() {
    'use strict';
    var fs = require('fs');
    var util = require('util');
    var path = require('path');
    var yeoman = require('yeoman-generator');

    var TheScratchGenerator = module.exports = function TheScratchGenerator(args, options, config) {
        yeoman.generators.Base.apply(this, arguments);

        this.on('end', function () {
            this.installDependencies({ skipInstall: options['skip-install'] });
        });

        this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    };

    util.inherits(TheScratchGenerator, yeoman.generators.Base);

    TheScratchGenerator.prototype.askFor = function askFor() {
        var cb = this.async();

        // have Yeoman greet the user.
        console.log(this.yeoman);

        var prompts = [{
            type: 'confirm',
            name: 'someOption',
            message: 'Would you like to enable this option?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.someOption = props.someOption;

            cb();
        }.bind(this));
    };

    TheScratchGenerator.prototype.app = function app() {
        var self = this;

        var templatesDir = path.join(__dirname, "templates");
        var dirs = (function addDir(dir) {
            var res = [];

            fs.readdirSync(dir).forEach(function(fPath) {
                var fullPath = path.join(dir, fPath);
                var stat = fs.lstatSync(fullPath);
                if(!stat.isFile()) {
                    res.push(fullPath);
                    res = res.concat(addDir(fullPath));
                }
            });

            return res;
        })(templatesDir);
        // console.log(dirs);

        var files = (function(dirs) {
            var res = [];
            dirs.forEach(function(dir) {
                fs.readdirSync(dir).forEach(function(fPath) {
                    var fullPath = path.join(dir, fPath);
                    var stat = fs.lstatSync(fullPath);
                    if(stat.isFile()) {
                        res.push(fullPath);

                        var sanitizedPath = fullPath.replace(templatesDir, "");
                        self.copy(sanitizedPath, sanitizedPath);
                    }
                });
            });

            return res;
        })(dirs);
        // console.log(files);
    };

    TheScratchGenerator.prototype.projectfiles = function projectfiles() {
        // this.copy('editorconfig', '.editorconfig');
        // this.copy('jshintrc', '.jshintrc');
    };
})();