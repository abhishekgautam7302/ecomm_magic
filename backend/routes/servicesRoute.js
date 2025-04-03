const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadImages');
const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  toggleStatus,
  getAdminServices
} = require('../controller/seviceController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

router.post('/create-service', upload.array('photos'),createService);
router.get('/get-services', getServices);
router.get('/get-admin-services', getAdminServices);
router.get('/get-single/:id', getServiceById);
router.put('/update-services/:id', upload.array('photos'), requireSignIn, isAdmin, updateService);
router.delete('/delete-services/:id', requireSignIn, isAdmin, deleteService);
router.put('/toggle-status/:id',  requireSignIn, isAdmin, toggleStatus);

module.exports = router;