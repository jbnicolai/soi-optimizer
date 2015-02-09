var chai = require('chai');
var expect = chai.expect;
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');

var base = require('../base');
var soi = require('soi');
var utils, ResourceTable, optimizer;

describe('js process cases', function() {

  before(function() {
    soi.config.extend({
      optimizer: {
        base_dir : __dirname + '/',
        module_loader:  base.optimizer_dir + 'kernel.js',
        bundles: {
          js: [
            {
              input     : './js/main.js',
              files     : null,
              exclude   : {},
              defer     : false,
              dist_file : 'main.js',
              dist_dir  : './dist/'
            }
          ]
        }
      }
    });
    utils = require(base.optimizer_dir + '/utils');
    ResourceTable = require(base.optimizer_dir + '/resource/table');
    optimizer = require(base.optimizer_dir + '/index');
    soi().use(optimizer).go();
  });

  after(function() {
    optimizer.reset();
    soi().reset();
    rimraf.sync(path.join(__dirname, 'dist/'), function(err) {});
  });

  it('#main.js resources', function() {
    var id = utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir + './js/main.js'));
    var css_a = ResourceTable.getResource('js', id);

    expect(css_a).to.not.be.undefined();
    expect(css_a.path).to.equal(utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir + './js/main.js')
    ));
    expect(css_a.type).to.equal('js');
    expect(css_a.origin).to.equal(null);
  });

  it('#a.js resources', function() {
    var id = utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir + './js/a.js'));
    var css_a = ResourceTable.getResource('js', id);

    expect(css_a).to.not.be.undefined();
    expect(css_a.path).to.equal(utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir + './js/a.js')
    ));
    expect(css_a.type).to.equal('js');
    expect(css_a.origin).to.equal(null);
  });

  it('#b.js resources', function() {
    var id = utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir + './js/b.js'));
    var css_a = ResourceTable.getResource('js', id);

    expect(css_a).to.not.be.undefined();
    expect(css_a.path).to.equal(utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir + './js/b.js')
    ));
    expect(css_a.type).to.equal('js');
    expect(css_a.origin).to.equal(null);
  });

  it('#c.js resources', function() {
    var id = utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir + './js/c.js'));
    var css_a = ResourceTable.getResource('js', id);

    expect(css_a).to.not.be.undefined();
    expect(css_a.path).to.equal(utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir + './js/c.js')
    ));
    expect(css_a.type).to.equal('js');
    expect(css_a.origin).to.equal(null);
  });

  it('#main.js content', function() {
    var id = utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir + './js/main.js'));
    var rsc = ResourceTable.getPackageByPath('js', id);

    expect(rsc).to.not.be.undefined();
    expect(rsc).to.have.property('files').with.length(5);
    expect(fs.existsSync(rsc.dist_file)).to.equal(true);

    var content = utils.readFile(rsc.dist_file, {
      encoding: 'utf8'
    });

    content = content.split('\n');
    content.shift();
    content = content.join('');

    expect(content).to.equal(';define("_3",[],{key:"c"});' +
      ';define("_2",["_3"],function(){return{key:"b"}});' +
      ';define("_1",["_2"],function(){return{key:"a"}});' +
      ';require(["_1"],function(){});');
  });

});