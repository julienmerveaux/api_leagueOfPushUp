const controllerCallback = (res, data, error, statusCode = 200) => {
    if (error) {
        const status = error.status || 400;
        res.status(status).json({
            success: false,
            error: error.toString(),
        });
    } else {
        res.status(statusCode).json({
            success: true,
            data: data,
        });
    }
};

module.exports =  controllerCallback;