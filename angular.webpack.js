module.exports = {
    target: ['electron-renderer', 'es2015'],
    externals: {
        '@electron/remote': 'commonjs @electron/remote',
        electron: 'commonjs electron',
        child_process: 'commonjs child_process',
        fs: 'commonjs fs',
        'fs-extra': 'commonjs fs-extra',
        os: 'commonjs os',
        path: 'commonjs path',
        stream: 'commonjs stream',
        url: 'commonjs url',
    },
};