/*
 * @Author: your name
 * @Date: 2020-09-14 13:57:06
 * @LastEditTime: 2020-09-14 16:53:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpackcli\test\teseHtml.js
 */
const glob = require('glob-all');

describe('Checking generated html files', () => {
    it('should generate html files', (done) => {
        const files = glob.sync([
            '../dist/index.html',
            '../dist/search.html'
        ]);
        if (files.length > 0) {
            done();
        } else {
            throw new Error('no html files generated');
        }
    });
});