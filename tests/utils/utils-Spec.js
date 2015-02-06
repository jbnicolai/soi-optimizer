'use strict';

// system
var path = require('path');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var rimraf = require('rimraf');

var base = require('../base');
var soi = require('soi');
var utils;

describe('utils test', function() {

  before(function() {
    soi.config.extend({
      optimizer: {
        base_dir : __dirname + '/',
        debug:  true,
        sha1_length: 8
      }
    });
    utils = require('../../lib/utils');
  });

  after(function() {
    soi().reset();
  });

  it('#deep clone', function() {
    var target = {
      name: 123,
      value: 456,
      rf: {
        a: 3,
        c: {
          name: 'c'
        },
        d: [1,2,3]
      }
    };
    var obj = utils.deepClone(target);

    expect(obj).to.be.an('object');
    expect(obj).to.have.property('name')
      .that.is.a('number')
      .that.deep.equals(123);
    expect(obj).to.have.property('value')
      .that.is.a('number')
      .that.deep.equals(456);

    expect(obj).to.have.property('rf').that.is.an('object');
    expect(obj.rf).to.have.property('a').that.deep.equals(3);
    expect(obj.rf).to.have.property('c').that.is.an('object').that
      .to.have.property('name').that.deep.equals('c');
    expect(obj.rf).to.have.property('d').that.is.an('array').that
      .to.have.length(3);

    expect(Object.keys(obj)).to.have.length(3);
    expect(Object.keys(obj.rf)).to.have.length(3);
  });

  it('#simple extend', function() {
    var obj = Object.create(null);
    var target = {
      name: 123,
      value: 456
    };
    utils.extend(obj, target);

    expect(obj).to.be.an('object');
    expect(obj).to.have.property('name')
      .that.is.a('number')
      .that.deep.equals(123);
    expect(obj).to.have.property('value')
      .that.is.a('number')
      .that.deep.equals(456);
    expect(Object.keys(obj)).to.have.length(2);
  });

  it('#deep extend', function() {
    var obj = {
      rf: {
        a: 1,
        b: 2
      }
    };
    var target = {
      name: 123,
      value: 456,
      rf: {
        a: 3,
        c: {
          name: 'c'
        },
        d: [1,2,3]
      }
    };
    utils.extend(obj, target, true);

    expect(obj).to.be.an('object');
    expect(obj).to.have.property('name')
      .that.is.a('number')
      .that.deep.equals(123);
    expect(obj).to.have.property('value')
      .that.is.a('number')
      .that.deep.equals(456);

    expect(obj).to.have.property('rf').that.is.an('object');
    expect(obj.rf).to.have.property('a').that.deep.equals(3);
    expect(obj.rf).to.have.property('b').that.deep.equals(2);
    expect(obj.rf).to.have.property('c').that.is.an('object').that
      .to.have.property('name').that.deep.equals('c');
    expect(obj.rf).to.have.property('d').that.is.an('array').that
      .to.have.length(3);

    expect(Object.keys(obj)).to.have.length(3);
    expect(Object.keys(obj.rf)).to.have.length(4);
  });

  it('#unique', function() {
    var arr = [1, 2, 3, 3, false, true, 0, {key:1}, {key:1}];
    utils.unique(arr);

    expect(arr).to.be.an('array');
    expect(arr).to.have.length(7);
    expect(arr).to.include(1);
    expect(arr).to.include(2);
    expect(arr).to.include(3);
    expect(arr).to.include(false);
    expect(arr).to.include(true);
    expect(arr).to.include(0);
    expect(arr).to.include({key:1});
  });

  it('#isAbsUrl', function() {
    var yes = [
      'http://www.baidu.com',
      'https://www.baidu.com/',
      'ftp://mobile/e/files/'
    ];
    var no = [
      'a/b/c',
      './a/b',
      '.././a/'
    ];
    yes.forEach(function(url) {
      expect(utils.isAbsUrl(url)).to.be.true();
    });
    no.forEach(function(url) {
      expect(utils.isAbsUrl(url)).to.be.false();
    });
  });

  it('#compose', function() {

  });

});

