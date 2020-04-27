/*
 * Connect all of your endpoints together here.
 */

 const taskRoutes = require('./tasks');

module.exports = function (app, router) {
    // app.use('/api', require('./home.js')(router));

    app.use('/api/tasks', taskRoutes);

    app.use((req, res, next) => {
        const error = new Error('Invalid operation');
        error.status = 500;
        next(error);
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            message: error.message,
            data: error
        })
    });
};
