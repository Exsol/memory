var Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
// if (!Encore.isRuntimeEnvironmentConfigured()) {
//     Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
// }

/**
 * B A C K E N D
 */
Encore
    .enableSingleRuntimeChunk()
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .addStyleEntry('app-styles', './assets/scss/style.scss')
    .addStyleEntry('pdf-styles', './assets/scss/style-pdf.scss')
    // .enableSassLoader()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())


    // uncomment for legacy applications that require $/jQuery as a global variable
    .autoProvidejQuery()
    .autoProvideVariables({
        $: "jquery",
        jQuery: "jquery",
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        "window.Bloodhound": require.resolve('bloodhound-js'),
        "toastr": require.resolve('toastr'),
        Routing: "Routing",
        "bootbox": "bootbox",
        "FormValidation": "FormValidation",
        "jQuery.tagsinput": "bootstrap-tagsinput"
    })
    // enables @babel/preset-env polyfills
    // .configureBabelPresetEnv((config) => {
    //     config.useBuiltIns = 'usage';
    //     config.corejs = 3;
    // })


    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')
    .addEntry('plugins', [
        // './assets/js/app.init.js',
        './assets/js/common.js',
        './assets/js/admin.js',
        // './assets/js/app.init.horizontal.js',
        // './assets/js/app-style-switcher.horizontal.js',
        './assets/js/app.init.light-sidebar.js',
        // './assets/js/app-style-switcher.js',
        './assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js',
        './assets/extra-libs/sparkline/sparkline.js',
        './assets/js/waves.js',
        './assets/js/sidebarmenu.js',
        './assets/js/custom.js'
    ])
    .addEntry('frontend-plugins', [
        // './assets/js/app.init.js',
        './assets/js/common.js',
        './assets/js/admin.js',
        // './assets/js/app.init.horizontal.js',
        // './assets/js/app-style-switcher.horizontal.js',
        './assets/js/app.init.frontend.js',
        //'./assets/js/app-style-switcher.js',
        './assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js',
        './assets/extra-libs/sparkline/sparkline.js',
        './assets/js/waves.js',
        './assets/js/sidebarmenu.js',
        './assets/js/custom.js'
    ])
    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // uncomment if you use Sass/SCSS files
    .enableSassLoader()
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())
    .enableVersioning()

    .enablePostCssLoader()
    //.addEntry('page1', './assets/js/page1.js')
    //.addEntry('page2', './assets/js/page2.js')

    .copyFiles([
        {
            from: './node_modules/ckeditor/',
            to: 'ckeditor/[path][name].[ext]',
            pattern: /\.(js|css)$/,
            includeSubdirectories: false
        },
        {from: './node_modules/ckeditor/adapters', to: 'ckeditor/adapters/[path][name].[ext]'},
        {from: './node_modules/ckeditor/lang', to: 'ckeditor/lang/[path][name].[ext]'},
        {from: './node_modules/ckeditor/plugins', to: 'ckeditor/plugins/[path][name].[ext]'},
        {from: './assets/js/ckeditor/plugins', to: 'ckeditor/plugins/[path][name].[ext]'},
        {from: './node_modules/ckeditor/skins', to: 'ckeditor/skins/[path][name].[ext]'},
        {
            from: './assets/images',

            // optional target path, relative to the output dir
            to: 'images/[path][name].[ext]',

            // if versioning is enabled, add the file hash too
            //to: 'images/[path][name].[hash:8].[ext]',

            // only copy files matching this pattern
            //pattern: /\.(png|jpg|jpeg)$/
        }
    ])

    // Uncomment the following line if you are using Webpack Encore <= 0.24
    .addLoader({
        test: /\.json$/i,
        include: [require('path').resolve(__dirname, 'node_modules/ckeditor')],
        loader: 'raw-loader',
        type: 'javascript/auto'
    })
;

let backendConfig = Encore.getWebpackConfig();
//config.watchOptions = { poll: true, ignored: /node_modules/ };
// config.optimization.runtimeChunk = {
//     name: 'main'
// };

// Set a unique name for the config (needed later!)
backendConfig.name = 'backendConfig';

// reset Encore to build the second config
//Encore.reset();

/**
 * F R O N T E N D
 */
// Encore
//     // will require an extra script tag for runtime.js
//     // but, you probably want this, unless you're building a single-page app
//     .enableSingleRuntimeChunk()
//
//     // the project directory where compiled assets will be stored
//     .setOutputPath('public/build/')
//     // the public path used by the web server to access the previous directory
//     .setPublicPath('/build')
//     /*
//      * FEATURE CONFIG
//      *
//      * Enable & configure other features below. For a full
//      * list of features, see:
//      * https://symfony.com/doc/current/frontend.html#adding-more-features
//      */
//     .cleanupOutputBeforeBuild()
//     .addStyleEntry('frontend-styles', './assets/frontend/scss/style.scss')
//     // .enableSassLoader()
//     .enableBuildNotifications()
//     .enableSourceMaps(!Encore.isProduction())
//     // enables hashed filenames (e.g. app.abc123.css)
//     .enableVersioning(Encore.isProduction())
//
//     // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
//     .splitEntryChunks()
//
//     // uncomment for legacy applications that require $/jQuery as a global variable
//     .autoProvidejQuery()
//     .autoProvideVariables({
//         $: "jquery",
//         jQuery: "jquery",
//         'window.jQuery': 'jquery',
//         Popper: ['popper.js', 'default']//,
//         // "window.Bloodhound": require.resolve('bloodhound-js'),
//         // "toastr": require.resolve('toastr'),
//         // "Routing": "Routing",
//         // "bootbox": "bootbox",
//         // "FormValidation": "FormValidation",
//         // "jQuery.tagsinput": "bootstrap-tagsinput"
//     })
//     // enables @babel/preset-env polyfills
//     // .configureBabelPresetEnv((config) => {
//     //     config.useBuiltIns = 'usage';
//     //     config.corejs = 3;
//     // })
//
//     // enables Sass/SCSS support
//     //.enableSassLoader()
//
//     .addEntry('frontend', './assets/frontend/js/app.js')
//     .addEntry('frontend-plugins', [
//         './assets/frontend/js/jquery.appear.js',
//         './assets/frontend/js/jquery.easing.min.js',
//         './assets/frontend/js/menu/jquery.smartmenus.js',
//         './assets/frontend/js/owl-carousel/owl.carousel.min.js',
//         './assets/frontend/js/magnific-popup/jquery.magnific-popup.min.js',
//         './assets/frontend/js/counter/counter.js',
//         './assets/frontend/js/countdown/jquery.countdown.min.js',
//         './assets/frontend/js/canvas.js',
//         './assets/frontend/js/snap.svg.js',
//         './assets/frontend/js/step.js',
//         './assets/frontend/js/wow.min.js',
//         // './node_modules/sweetalert2/dist/sweetalert2.js',
//         './assets/frontend/js/theme-script.js'
//         // './assets/js/custom.js'
//     ])
//     // uncomment if you use TypeScript
//     //.enableTypeScriptLoader()
//
//     // uncomment if you use Sass/SCSS files
//     .enableSassLoader()
//     // uncomment to create hashed filenames (e.g. app.abc123.css)
//     // .enableVersioning(Encore.isProduction())
//     .enableVersioning();
//
//
// let frontendConfig = Encore.getWebpackConfig();
//config.watchOptions = { poll: true, ignored: /node_modules/ };
// config.optimization.runtimeChunk = {
//     name: 'main'
// };
// uncomment to get integrity="..." attributes on your script & link tags
// requires WebpackEncoreBundle 1.4 or higher
//.enableIntegrityHashes(Encore.isProduction())

// Set a unique name for the config (needed later!)
// frontendConfig.name = 'frontendConfig';
// uncomment if you're having problems with a jQuery plugin
//.autoProvidejQuery()

// export the final configuration as an array of multiple configurations
// module.exports = [backendConfig, frontendConfig];
module.exports = [backendConfig];
// uncomment if you use API Platform Admin (composer req api-admin)
//.enableReactPreset()
//.addEntry('admin', './assets/js/admin.js')


module.exports = Encore.getWebpackConfig();
