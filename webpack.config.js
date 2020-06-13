const path = require('path');

const commonConfig = {
    mode: 'development',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'out')
    },
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.jsx'
        ]
    }
};

module.exports = [
    /**
     * Client builds.
     */
    // Object.assign({}, commonConfig, {
    //     devServer: {
    //         contentBase: [
    //             path.join(__dirname, 'run')
    //         ]
    //     },
    //     entry: {
    //         party: path.resolve(__dirname, 'src', 'client', 'Party.ts'),
    //         player: path.resolve(__dirname, 'src', 'client', 'Player.ts')
    //     },
    //     externals: {
    //         worker_threads: 'commonjs2 worker_threads'
    //     },
    //     name: 'client'
    // }),
    /**
     * Server build.
     */
    Object.assign({}, commonConfig, {
        entry: {
            server: path.resolve(__dirname, 'src', 'examples', 'server.ts'),
        },
        name: 'server',
        target: 'node'
    })
];