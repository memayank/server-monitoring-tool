const router = require('express').Router();
const serverController = require('../controllers/server-controller');
const metricController = require('../controllers/metric-controller');
router
    .get('/server-list', serverController.getServersList)
    .post('/add-server', serverController.addServer)
    .post('/update-server', serverController.editServerDetails)
    .post('/delete-server', serverController.deleteServer)
    .post('/get-metric-data', metricController.getMetricData)
    .post('/add-metric-data', metricController.addMetricData)

module.exports = router;