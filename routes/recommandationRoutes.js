const express = require('express');
const recommandationController = require('../Controllers/recommandationController');

const router = express.Router();

// Récupérer tous types de livre
router.get('/recommandations/:typeLivre/:livreChoisiId', recommandationController.recommanderLivre);

// Route pour incrémenter le nombre de vues d'un livre
router.post('/incrementer-vues/:idLivre', recommandationController.incrementerNombreDeVues);

router.get('/recommandations/:idLivre', recommandationController.obtenirLivresPopulaires);





module.exports = router;
