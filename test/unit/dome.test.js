/*
 * @Author: your name
 * @Date: 2020-09-14 15:45:57
 * @LastEditTime: 2020-09-14 17:20:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpackcli\test\unit\test.js
 */
const { assert, expect } = require('chai');
const dome = require('../smoke/template/src/index/dome.js');
describe('Checking generated css js files', () => {
    it('add 2 + 3 to equal 5', (done) => {
        expect(dome.add(2,3)).equal(5);
        done();
    });
})
