import express from "express"
import {
    getMenu, getMenuItemById, getFlavorsOfferedByCakeType, getCakeTypesOfferedByFlavor,
    assignFlavorToCake, updateMenuItemStatus, getMenuFullJoin,
} from "../controllers/menu.js"

const router = express.Router()

// Get all rows from menu 
router.get("/", async (req, res) => {
    const data = await getMenu();

    res.json(data);
})

// Get Menu Item from Menu by id
router.get("/:id", async (req, res) => {
    const cakesId = req.params.id;
    const data = await getMenuItemById(cakesId);

    res.json(data);
})

// Get all Flavors offered for a specific cake type by typeID
router.get("/cake-type/flavors/:id", async (req, res) => {
    const typeId = req.params.id;
    const data = await getFlavorsOfferedByCakeType(typeId);

    res.json(data);
})

// Get all Cake-Types offered for a specific flavor by flavorID
router.get("/flavor/cake-types/:id", async (req, res) => {
    const flavorId = req.params.id;
    const data = await getCakeTypesOfferedByFlavor(flavorId);

    res.json(data);
})

// Assign a flavor to cake type
router.post("/", async (req, res) => {
    const typeId = req.body.typeID;
    const flavorId = req.body.flavorID;
    
    const data = await assignFlavorToCake(typeId, flavorId);
    res.json(data);
})

// Update a menu item's status
router.put("/status/:id", async (req, res) => {
    const cakesId = req.params.id;
    const statusID = req.body.statusID;

    const result = await updateMenuItemStatus(cakesId, statusID);
    res.json(result);
})

// Get Menu table with type and flavor names --> (joins menu, cake_type, cake_flavor tables)
router.get("/type-flavor/full-join", async (req, res) => {
    const data = await getMenuFullJoin();

    res.json(data);
})

export default router