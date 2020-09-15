/*
 * @Author: your name
 * @Date: 2020-09-09 15:26:34
 * @LastEditTime: 2020-09-14 16:58:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpackcli\tets.js
 */
const path = require('path');
const webpack = require('webpack');
const Mocha = require('mocha');
const rimraf = require('rimraf');
const prodConfig = require('./lib/webpack.prod.js');
const mocha = new Mocha({
    timeout: '10000ms'
});
rimraf('./dist', () => {
    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }));
        console.log('Webpack build success, begin run test.');
    
        mocha.addFile(path.join(__dirname, './test/testHtml.js'));
        mocha.addFile(path.join(__dirname, './test/testCssJs.js'));
        mocha.addFile(path.join(__dirname, './test/unit/dome.test.js'));
        mocha.run();    
    })
})
