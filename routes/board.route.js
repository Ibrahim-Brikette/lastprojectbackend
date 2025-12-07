const express =  require('express');
const router = express.Router();
const  {byId, deleteB, updateB} = require('../controlers/board.controler');

router.get('/byid/:id',byId),
// Tu définis ta route comme /byid, sans paramètre dynamique,
// mais tu appelles /byid/:id depuis ton client.

// Donc Express ne reconnaît pas cette route, et retourne :

router.delete('/deleteboard/:id',deleteB);

router.put('/updateboard/:id',updateB);

module.exports = router;