'use strict';
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
    var sys = require('sys')
    var exec = require('child_process').exec;

    // Hook cmd-line outpu
    function puts(error, stdout, stderr) {
        sys.puts(stdout)
    }

    exec("git submodule init", puts);
    exec("git submodule update", puts);

    this.mkdir('app');
    this.mkdir('app/templates');

  // this.copy('_package.json', 'package.json');
  // this.copy('_bower.json', 'bower.json');
};

TheScratchGenerator.prototype.projectfiles = function projectfiles() {
  // this.copy('editorconfig', '.editorconfig');
  // this.copy('jshintrc', '.jshintrc');
};
