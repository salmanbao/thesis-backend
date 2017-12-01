const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const company = require('../controllers/company');
const user = require('../controllers/user');
const authenticate = require('./auth/authenticate');
const wallet = require('../controllers/wallet');
const getInfo = require('../controllers/common');
const jwt = require('./auth/jwt');

// POST requests
router.post('/company', company.add);
router.post('/user', user.add);
router.post('/signup-user', user.signup); //It has to be a put request, has to be reviewed
router.post('/catalog', company.addItem);

// GET requests
router.get('/info', getInfo.getInfo); //This is meant for testing, ignore it
router.get('/login', async (next) => {
  await authenticate(next);
});
router.get('/catalog', company.getItems);
router.get('/company', company.getCompanyInfo);
router.get('/settings', company.getSettings);

// PUT requests
router.put('/admin-settings', company.updateSettings);
router.put('/user', user.edit);
router.put('/admin-tip', wallet.tipUser);
router.put('/transfer', wallet.transferFunds);
router.put('/admin-fund', wallet.addFunds);
router.put('/catalog', company.editItem);

// DEL requests
router.delete('/catalog', company.delItem);

module.exports = router;
