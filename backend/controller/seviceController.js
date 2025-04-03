const Service = require('../models/serviceModel');
const fs = require('fs');
const path = require('path');

// Helper function for cleaning up uploaded files
const cleanupFiles = (files) => {
  if (files) {
    files.forEach(file => {
      fs.unlink(file.path, err => {
        if (err) console.error('Error cleaning up file:', err);
      });
    });
  }
};

// Helper function to generate full URLs
const generateFullUrls = (photos, req) => {
  return photos.map(photo => 
    `${req.protocol}://${req.get('host')}${photo}`
  );
};

// =====get services data in admin dashboards

exports.getAdminServices = async (req, res) => {
  try {
    const services = await Service.find({});
    
    // Add full URLs to photos
    const servicesWithUrls = services.map(service => ({
      ...service.toObject(),
      photos: generateFullUrls(service.photos, req)
    }));

    res.status(200).json({
      success: true,
      message: "Services retrieved successfully",
      servicesWithUrls,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};



exports.createService = async (req, res) => {
  try {
    const { name, shortDescription, description, price, status, category, subcategory } = req.body;
    const photos = req.files?.map(file => `/uploads/${file.filename}`) || [];

    // Validate required fields
    if (!name || !shortDescription || !description || !price || !category || !subcategory) {
      cleanupFiles(req.files);
      return res.status(400).json({ 
        success: false,
        message: 'All fields except status are required' 
      });
    }

    const newService = new Service({
      name,
      photos,
      shortDescription,
      description,
      price: Number(price),
      status: status !== undefined ? status : true,
      category,
      subcategory
    });

    await newService.save();

    // Convert stored paths to full URLs for response
    const serviceWithUrls = {
      ...newService.toObject(),
      photos: generateFullUrls(newService.photos, req)
    };

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
       serviceWithUrls,
    });

  } catch (error) {
    cleanupFiles(req.files);
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ status: true });
    
    // Add full URLs to photos
    const servicesWithUrls = services.map(service => ({
      ...service.toObject(),
      photos: generateFullUrls(service.photos, req)
    }));

    res.status(200).json({
      success: true,
      message: "Services retrieved successfully",
      servicesWithUrls,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ 
      success: false,
      message: 'Service not found' 
    });

    // Add full URLs to photos
    const serviceWithUrls = {
      ...service.toObject(),
      photos: generateFullUrls(service.photos, req)
    };

    res.status(200).json({
      success: true,
      data: serviceWithUrls
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      cleanupFiles(req.files);
      return res.status(404).json({ 
        success: false,
        message: 'Service not found' 
      });
    }

    const oldPhotos = service.photos;
    const newPhotos = req.files?.map(file => `/uploads/${file.filename}`) || [];

    const updateData = {
      ...req.body,
      photos: newPhotos.length > 0 ? newPhotos : service.photos
    };

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    // Delete old photos only after successful update
    if (newPhotos.length > 0) {
      oldPhotos.forEach(photo => {
        const filename = path.basename(photo);
        const filePath = path.join(__dirname, '../uploads', filename);
        fs.unlink(filePath, err => {
          if (err) console.error('Error deleting old image:', err);
        });
      });
    }

    // Convert stored paths to full URLs for response
    const updatedWithUrls = {
      ...updatedService.toObject(),
      photos: generateFullUrls(updatedService.photos, req)
    };

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: updatedWithUrls
    });
  } catch (error) {
    cleanupFiles(req.files);
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ 
      success: false,
      message: 'Service not found' 
    });

    // Delete associated photos
    service.photos.forEach(photo => {
      const filename = path.basename(photo);
      const filePath = path.join(__dirname, '../uploads', filename);
      fs.unlink(filePath, err => {
        if (err) console.error('Error deleting image:', err);
      });
    });

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

exports.toggleStatus = async (req, res) => {
  try {
      const service = await Service.findById(req.params.id);
      if(!service) {
          return res.status(404).json({
              success: false,
              message: "Service not found"
          });
      }

      service.status = !service.status;
      await service.save();

      res.status(200).json({
          success: true,
          message: "Status updated successfully",
          service
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: error.message
      });
  }
};