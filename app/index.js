(function() {
    'use strict';
    var fs = require('fs');
    var util = require('util');
    var path = require('path');
    var yeoman = require('yeoman-generator');
    var waitpid = require('waitpid');

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
        /*
        var exec = require('child_process').exec, child;

        child = exec('which git', [], {
            cwd: __dirname
        });

        child.stdout.on('data', function (data) {
            console.log(data);
        });

        waitpid(child.pid);

        child = exec('git', ['submodule', 'update'], {
            cwd: __dirname
        });
        waitpid(child.pid);
        //*/

        var self = this;
        var templatesDir = path.join(__dirname, "templates");
        fs.readdirSync(templatesDir).forEach(function(fPath) {
            console.log(fPath);
            var stat = fs.lstatSync(path.join(templatesDir, fPath));
            if(stat.isFile()) {
                var sanitizedPath = fPath.replace(templatesDir, "");
                self.copy(sanitizedPath, sanitizedPath)
            };
        });

        // this.copy('_package.json', 'package.json');
        // this.copy('_bower.json', 'bower.json');
    };

    TheScratchGenerator.prototype.projectfiles = function projectfiles() {
        // this.copy('editorconfig', '.editorconfig');
        // this.copy('jshintrc', '.jshintrc');
    };
})();