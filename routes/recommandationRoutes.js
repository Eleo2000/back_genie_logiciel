const express = require('express');
const recommandationController = require('../Controllers/recommandationController');

const router = express.Router();

// Récupérer tous les clients
router.post('/recommander', recommandationController.recommanderLivre);

// si le type de livre n'existe pas encore, on utilise cette route pour l'inserer
router.post('/inserer-recommandation', recommandationController.incrementOrAddRecommandation);





module.exports = router;
