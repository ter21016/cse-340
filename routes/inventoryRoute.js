// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation")   


// Apply authorization middleware globally
router.use(utilities.checkAuthorizationManager)

// Misc. routes
router.get("/", utilities.handleErrors(invController.buildManagementView))
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId))

// Classification management routes
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))
router.post("/add-classification", invValidate.classificationRules(), invValidate.checkClassificationData, utilities.handleErrors(invController.addClassification))   


// Inventory management routes
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))
router.post("/add-inventory", invValidate.inventoryRules(), invValidate.checkInventoryData, utilities.handleErrors(invController.addInventory))

// Build edit/update inventory views
router.get("/edit/:inventoryId", utilities.handleErrors(invController.buildEditInventory))
router.post("/update/:inventoryId", invValidate.inventoryRules(), invValidate.checkUpdateData, utilities.handleErrors(invController.updateInventory))

// Delete inventory information route
router.get("/delete/:inventoryId", utilities.handleErrors(invController.buildDeleteInventory))
router.post("/delete/:inventoryId", utilities.handleErrors(invController.deleteInventory))

// AJAX inventory api call route
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

module.exports = router;