
const Livre = require('../Models/livreModel');
const Client = require('../Models/clientModel');
const Recommandation = require('../Models/recommandationModel');
const mongoose = require('mongoose');

// Fonction pour incrémenter le countClick si la recommandation existe déjà, sinon créer une nouvelle recommandation
const incrementOrAddRecommandation = async (req, res) => {
  try {   
    const {id_client , id_livre , type_livre}= req.body;

    // Vérifier la validité de l'id_client et id_livre 
    const isValidClientId = mongoose.Types.ObjectId.isValid(id_client);
    const isValidLivreId = mongoose.Types.ObjectId.isValid(id_livre);
    if (!isValidClientId) {
      return res.status(400).json({ message: `ID client invalide ou introuvable` });
    }
    if (!isValidLivreId) {
      return res.status(400).json({ message: `ID livre invalide ou introuvable` });
    }


    // On teste si le type de livre est deja recommandé
    const recommandationExist= await Recommandation.findOne({id_client , type_livre });
    if(!recommandationExist){
       // si client existe et type de livre n'est pas encore recommandé, on insere
        const recommandation = new Recommandation({
          id_client,
          id_livre,
          type_livre,
          countClick:1
        });
        await recommandation.save();
        return res.status(200).json({ message: `Insertion recommandation ` });  
    }else{
      //si client existe et type de livre deja recommandé ; on incremente 
      recommandationExist.countClick += 1 ;
      await recommandationExist.save();
      return res.status(400).json({ message: `Incrementation recommandation` });
    }
    
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'insertion de recommandation' });
  }
};


// Fonction pour récupérer le livre avec le plus de countClick pour un client spécifique par idClient
const recommanderLivre = async (req, res) => {
  try {
    const {id_client} = req.body ;

    // Vérifier la validité de l'id_client et id_livre 
    const isValidClientId = mongoose.Types.ObjectId.isValid(id_client);
    if (!isValidClientId) {
      return res.status(400).json({ message: `ID client invalide ou introuvable` });
    }

    // Utiliser la méthode findOne() avec un tri décroissant sur countClick et en filtrant par idClient pour obtenir le livre avec le plus de clics pour ce client
    const livreAvecPlusDeClicks = await Recommandation.findOne({ id_client: id_client })
      .sort({ countClick: -1 }) // Tri décroissant sur countClick
      .exec();
      // Si aucun livre n'est trouvé pour le client, retourner null
      if (!livreAvecPlusDeClicks) {
        return res.status(400).json({ message: `Afficher les types d'origine choisi par le client` });
      }else{
        return res.status(200).json({message : ` Le client ${id_client} a plus visité le livre de type ${livreAvecPlusDeClicks.type_livre} . Nombre de visite ${livreAvecPlusDeClicks.countClick} fois`}) ; // Retourner le livre avec le plus de clics pour ce client
      }
    } catch (error) {
    console.error('Une erreur est survenue lors de la récupération du livre avec le plus de clics pour le client :', error.message);
    return null;
  }
};
 

module.exports = { incrementOrAddRecommandation, recommanderLivre };
