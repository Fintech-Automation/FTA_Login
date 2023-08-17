import esbuild from 'rollup-plugin-esbuild';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import styles from 'rollup-plugin-styles';
import replace from '@rollup/plugin-replace'
import image from '@rollup/plugin-image';
import alias from '@rollup/plugin-alias';
import less from 'less';
import json from '@rollup/plugin-json'
import svg from 'rollup-plugin-svg'
import svgr from '@svgr/rollup'
import url from '@rollup/plugin-url'
import { readPackage } from 'read-pkg';
import fs from 'fs'

import path from 'path'

const { dependencies, devDependencies } = await readPackage()

const DepNames = Object.keys(Object.assign({}, dependencies, devDependencies))

const DefaultExternal = [/node_modules/, 'redux-thunk', 'redux-saga', 'redux', 'react', 'react-dom', 'antd', '@ant-design/icons', 'echarts-for-react', 'echarts', 'axios']

const getProcessInfo = (obj) => Object.entries(obj).reduce((acc, [key, value]) => {
    acc[`process.env.${key}`] = JSON.stringify(value)

    return acc
}, {})

export default {
    input: './src/root.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
        },
        {
            file: 'dist/index.es.js',
            format: 'es',
            sourcemap: true,
            exports: 'named',
        }
    ],

    external: DefaultExternal.concat(DepNames),
    plugins: [
        alias({
            entries: [
                {
                    find: '@',
                    replacement: path.resolve('./', 'src')
                },
                {
                    find: '@components',
                    replacement: path.resolve('./', 'src/components')
                },
                {
                    find: '@assets',
                    replacement: path.resolve('./', 'src/assets')
                },
                {
                    find: '@containers',
                    replacement: path.resolve('./', 'src/containers')
                },
                {
                    find: '@redux',
                    replacement: path.resolve('./', 'src/redux')
                },
                {
                    find: '@config',
                    replacement: path.resolve('./', 'src/config')
                },
                {
                    find: '@lib',
                    replacement: path.resolve('./', 'src/lib')
                },
            ]
        }),
        url(),
        svgr({
            svgo: false
        }),
        json(),
        replace({
            include: ['src/**/*.js', 'src/**/*.jsx'],
            extensions: ['.js', '.jsx'],
            exclude: /node_modules/,
            preventAssignment: true,
            values: process.env === 'develope' ? getProcessInfo({
                NODE_ENV: 'production',
                FAST_REFRESH: true,
                GENERATE_SOURCEMAP: true,
                INLINE_RUNTIME_CHUNK: false,
                REACT_APP_TOKEN: '00D5e000004gYBD!AREAQEPXfzJ3KMa3bv6qUp.sH6qeY24cBMYW_ieG_ZkETq4lqoYAmxOo1xD597mtN5JmyFFPPQhdzzUvVZz4p8PhJUTLZpoi',
                REACT_APP_INSTANCE: 'https://accloud-payment-dev-ed.my.salesforce.com',
                REACT_APP_HEROKU_INSTANCE: 'https://react-oem-proxy.herokuapp.com',
                REACT_APP_PROXY_INSTANCE: 'https://jsforceajax-proxy.herokuapp.com/proxy/',
                REACT_APP_MONEYMOVEMENT_URL: 'https://ac-cloud-gateway.herokuapp.com',
                REACT_APP_MONEYMOVEMENT_AUTH_URL: 'https://ac-cloud-gateway.herokuapp.com/api/v1/auth/tenant/oauth2/token',
                REACT_APP_UPLOAD_URL: 'https://ac-cloud-gateway.herokuapp.com/api/v1/services/tenant/money-movement/request/file/upload/',
                REACT_APP_Module: 'Deposit',
                REACT_APP_DEPLOYMENT_ENVIRONMENT: 'Workspace',
                REACT_APP_BACKEND_URL: 'https://api-dev.fintechautomation.com',

            }) : getProcessInfo({
                NODE_ENV: 'production',
                REACT_APP_TOKEN: '',
                REACT_APP_INSTANCE: '',
                REACT_APP_HEROKU_INSTANCE: '',
                REACT_APP_PROXY_INSTANCE: '',
                REACT_APP_MONEYMOVEMENT_URL: '',
                REACT_APP_MONEYMOVEMENT_AUTH_URL: '',
                REACT_APP_UPLOAD_URL: '',
                REACT_APP_Module: '',
            }),
            // values: {
            //     'process.env.REACT_APP_DEPLOYMENT_ENVIRONMENT': JSON.stringify('Workspace'),
            //     'process': JSON.stringify({
            //         env: {
            //             NODE_ENV: 'production',
            //             FAST_REFRESH: true,
            //             GENERATE_SOURCEMAP: true,
            //             INLINE_RUNTIME_CHUNK: false,
            //             REACT_APP_TOKEN: '00D5e000004gYBD!AREAQEPXfzJ3KMa3bv6qUp.sH6qeY24cBMYW_ieG_ZkETq4lqoYAmxOo1xD597mtN5JmyFFPPQhdzzUvVZz4p8PhJUTLZpoi',
            //             REACT_APP_INSTANCE: 'https://accloud-payment-dev-ed.my.salesforce.com',
            //             REACT_APP_HEROKU_INSTANCE: 'https://react-oem-proxy.herokuapp.com',
            //             REACT_APP_PROXY_INSTANCE: 'https://jsforceajax-proxy.herokuapp.com/proxy/',
            //             REACT_APP_MONEYMOVEMENT_URL: 'https://ac-cloud-gateway.herokuapp.com',
            //             REACT_APP_MONEYMOVEMENT_AUTH_URL: 'https://ac-cloud-gateway.herokuapp.com/api/v1/auth/tenant/oauth2/token',
            //             REACT_APP_UPLOAD_URL: 'https://ac-cloud-gateway.herokuapp.com/api/v1/services/tenant/money-movement/request/file/upload/',
            //             REACT_APP_Module: 'Deposit',
            //             REACT_APP_DEPLOYMENT_ENVIRONMENT: 'Workspace',
            //             REACT_APP_BACKEND_URL: 'https://api-dev.fintechautomation.com',

            //         }
            //     })
            // }
            // 'process.env.NODE_ENV': JSON.stringify('production'),

        }),
        resolve({
            extensions: ['.js', '.jsx', '.svg'],
            external: DefaultExternal.concat(DepNames),
            exclude: ['./node_modules/**/*'],
        }),
        image(),
        esbuild({
            // All options are optional
            include: /\.[jt]sx?$/, // default, inferred from `loaders` option
            exclude: /node_modules/, // default
            sourceMap: true, // default
            minify: process.env.NODE_ENV === 'production',
            target: 'es2015', // default, or 'es20XX', 'esnext'
            jsx: 'transform',
            jsxFactory: 'React.createElement',
            jsxFragment: 'React.Fragment',
            // Like @rollup/plugin-replace
            define: {
                __VERSION__: '"x.y.z"',
            },
            tsconfig: 'tsconfig.json', // default
            // Add extra loaders
            loaders: {
                // Add .json files support
                // require @rollup/plugin-commonjs
                '.json': 'json',
                // Enable JSX in .js files too
                '.js': 'jsx',
            },
        }),
        commonjs({
        }),
        styles({
            // 使用 LESS 编译器来处理样式文件
            mode: ['inject', 'extract'],
            minimize: true,
            less: {
                // 配置 LESS 编译器
                plugins: [],
            },
            extensions: ['.less', '.css'],
            url: {
                // 将 LESS 中引用的图片等资源拷贝到输出目录
                inline: true,
                copyFiles: true,
                useHash: true,
            },
            // 为 LESS 编译器提供自定义的渲染器
            async transform(code, id) {
                if (id.endsWith('.less')) {
                    const { css } = await less.render(code);
                    return {
                        code: css,
                    };
                }
            },
        }),
    ]
};


