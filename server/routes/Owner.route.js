const express = require('express');
const { updateOwnerDetails, getAllOwners, deleteOwner, findOwnerDetails } = require('../Services/Owner.service');
const ownerrouter = express.Router();

ownerrouter.post('/update/:id',updateOwnerDetails);
ownerrouter.get('/get/:id',findOwnerDetails);
ownerrouter.get('/getall',getAllOwners);
ownerrouter.delete('/delete/:id',deleteOwner);

module.exports = ownerrouter;