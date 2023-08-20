const Client =require('../Models/clientModel');
const { generateAccessToken } = require('../Midllewares/token');
const bcrypt = require('bcrypt');

const saltRounds = 10;

//verification champs
function verification(req){
    const {username,password}=req.body;
}


const login = async (req,res) => {
    try{
        //verification champs
       if(!verification){
        return res.status(400).json({
            succes:"false",
            message:"les champs ne doivent pas etre vide"
        })
       }
       const { username, password } = req.body;

       // Chercher l'utilisateur dans la base 
       const utilisateur = await Client.findOne({ username });

       // Vérifier si l'utilisateur existe
       if (!utilisateur) {
         return res.status(404).json({
           success: false,
           message: "Nom d'utilisateur incorrect.",
         });
       }
       
       
       // Vérifier le mot de passe 
       const isPasswordValid = await bcrypt.compare(password, utilisateur.password);
   
       // Vérifier si le mot de passe est valide
       if (!isPasswordValid) {
         return res.status(401).json({
           success: false,
           message: "Mot de passe incorrect.",
         });
       }
   
       //modif Eleo
       const userID = utilisateur._id; 
       console.log(utilisateur);
       const token = generateAccessToken({utilisateur: utilisateur.username });
      
      // Renvoyer le token et l'ID dans la réponse JSON
      return res.status(200).json({ token, userID });
       
    
    }
    catch(error){
        //error serveur 
        console.error(error);
        res.status(500).send('Erreur serveur');


    }
    
}

module.exports={login};