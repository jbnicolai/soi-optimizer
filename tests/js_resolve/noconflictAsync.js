'use strict';

// system
var chai = require('chai');
var expect = chai.expect;
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');

var base = require('../base');
var soi = require('soi');
var utils, ResourceTable, ModuleManager, optimizer;

describe('non conflict async cases', function() {

  before(function() {
    soi.config.extend({
      optimizer: {
        base_dir : __dirname + '/',
        module_loader:  base.optimizer_dir +  + 'kernel.js',
        dist_dir : './dist/',
        bundles: {
          js: [
            {
              input     : './noconflictAsync/main.js',
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
    ModuleManager = require(base.optimizer_dir + '/module/manager');
    optimizer = require(base.optimizer_dir + '/index');
    soi().use('soi-optimizer').go();
  });

  after(function() {
    optimizer.reset();
    soi().reset();
    rimraf.sync(path.join(__dirname, 'dist/'), function(err) {});
  });

  // 主模块
  it('#main entry resource', function() {
    var id = utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir +
        './noconflictAsync/main.js'));

    var css_a = ResourceTable.getResource('js', id);
    expect(css_a).to.be.an('object');
    expect(css_a.path).to.equal(utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir +
        './noconflictAsync/main.js')
    ));
    expect(css_a.type).to.equal('js');
    expect(css_a.origin).to.equal(null);
  });

  // 主模块
  it('#main entry package', function() {
    var id = utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir +
        './noconflictAsync/main.js'));

    var pkg = ResourceTable.getPackageByPath('js', id);
    expect(pkg).to.not.equal(undefined);
    expect(pkg).to.have.property('files').with.length(2);
    expect(fs.existsSync(pkg.dist_file)).to.equal(true);
  });

  // 异步模块
  it('#async module resource', function() {
    var id = utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir +
        './noconflictAsync/j.js'));

    var mod_j = ModuleManager.getModuleByPath(id);
    expect(mod_j).to.be.an('object');
    expect(mod_j.path).to.equal(utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir +
        './noconflictAsync/j.js')
    ));
    expect(mod_j.deps).to.have.length(1);
  });

  // 异步模块
  it('#async module package', function() {
    var id = utils.normalizeSysPath(
      path.join(soi().ENV.config.optimizer.base_dir +
        './noconflictAsync/j.js'));

    var pkg = ResourceTable.getPackageByPath('js', id);
    expect(pkg).to.not.be.undefined();
    expect(pkg).to.have.property('files').with.length(2);
    expect(fs.existsSync(pkg.dist_file)).to.equal(true);
  });

});