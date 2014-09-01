'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');

var BourbonGenerator = module.exports = function BourbonGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  //this.testFramework = 'mocha';
  // resolved to mocha by default
  //this.hookFor('mocha', { as: 'app' });

  // this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BourbonGenerator, yeoman.generators.Base);

BourbonGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log('This generator scaffolds out a basic web project. \n\nIt\'s based on generator-webapp, but simplified and with some other useful stuff added in - Grunticon for all your SVG needs, and Assemble for building static HTML files from modular templates and data.');

  var prompts = [{
    name: 'projectName',
    message: 'Give your project a name:'
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

BourbonGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

BourbonGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

BourbonGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

BourbonGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

BourbonGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

BourbonGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

// BourbonGenerator.prototype.writeIndex = function writeIndex() {};

BourbonGenerator.prototype.scaffolding = function scaffolding() {
  this.mkdir('src');
  this.mkdir('src/images');
  this.mkdir('src/images/svg-src');
  this.mkdir('src/js');
  this.mkdir('src/css');
  this.mkdir('src/css/base');
  this.mkdir('src/css/base/extends');
  this.mkdir('src/css/base/mixins');
  this.mkdir('src/templates');
  this.mkdir('src/templates/layouts');
  this.mkdir('src/templates/pages');
  this.mkdir('src/templates/partials');

  this.copy('src/htaccess', 'src/.htaccess');
  this.copy('src/404.html', 'src/404.html');
  this.copy('src/_!-edit-template-files-not-html', 'src/_!-edit-template-files-not-html');
  this.copy('src/apple-touch-icon-precomposed.png', 'src/apple-touch-icon-precomposed.png');
  this.copy('src/crossdomain.xml', 'src/crossdomain.xml');
  this.copy('src/favicon.ico', 'src/favicon.ico');
  this.copy('src/humans.txt', 'src/humans.txt');
  this.copy('src/robots.txt', 'src/robots.txt');

  this.copy('src/css/site.scss', 'src/css/site.scss');
  this.copy('src/css/base/_base.scss', 'src/css/base/_base.scss');
  this.copy('src/css/base/_buttons.scss', 'src/css/base/_buttons.scss');
  this.copy('src/css/base/_flashes.scss', 'src/css/base/_flashes.scss');
  this.copy('src/css/base/_forms.scss', 'src/css/base/_forms.scss');
  this.copy('src/css/base/_grid-settings.scss', 'src/css/base/_grid-settings.scss');
  this.copy('src/css/base/_lists.scss', 'src/css/base/_lists.scss');
  this.copy('src/css/base/_tables.scss', 'src/css/base/_tables.scss');
  this.copy('src/css/base/_typography.scss', 'src/css/base/_typography.scss');
  this.copy('src/css/base/_variables.scss', 'src/css/base/_variables.scss');
  this.copy('src/css/base/extends/_button.scss', 'src/css/base/extends/_button.scss');
  this.copy('src/css/base/extends/_clearfix.scss', 'src/css/base/extends/_clearfix.scss');
  this.copy('src/css/base/extends/_hide-text.scss', 'src/css/base/extends/_hide-text.scss');
  this.copy('src/css/base/mixins/_flash.scss', 'src/css/base/mixins/_flash.scss');

  this.copy('src/images/svg-src/test.svg', 'src/images/svg-src/test.svg');

  this.copy('src/js/app.js', 'src/js/app.js');
  this.copy('src/js/console.js', 'src/js/console.js');

  this.copy('src/templates/layouts/default.hbs', 'src/templates/layouts/default.hbs');
  this.copy('src/templates/pages/index.hbs', 'src/templates/pages/index.hbs');
  this.copy('src/templates/pages/page.hbs', 'src/templates/pages/page.hbs');
  this.copy('src/templates/partials/footer.hbs', 'src/templates/partials/footer.hbs');
  this.copy('src/templates/partials/header.hbs', 'src/templates/partials/header.hbs');

};
