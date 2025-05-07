const express = require('express');
const { updateOwnerDetails, getAllOwners, deleteOwner } = require('../Services/Owner.service');
const { getOwnerDetails } = require('../Controllers/Owner.controller');
const ownerrouter = express.Router();

ownerrouter.post('/update/:id',updateOwnerDetails);
ownertoutes.get('/get/:id',getOwnerDetails);
ownerrouter.get('/getall',getAllOwners);
ownerrouter.delete('/delete/:id',deleteOwner);

module.exports = ownerrouter;