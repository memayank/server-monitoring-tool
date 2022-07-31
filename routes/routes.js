const router = require('express').Router();
const serverController = require('../controllers/server-controller');
const metricController = require('../controllers/metric-controller');
router
    .get('/server-list', serverController.getServersList)
    .post('/add-server', serverController.addServer)
    .get('/update-server', serverController.editServerDetails)
    .get('/get-metric-data', metricController.getMetricData)
    .post('/add-metric-data', metricController.addMetricData)

module.exports = router;