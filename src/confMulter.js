import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const stokage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/videos'); // Définir le dossier de destination
  },
  filename: (req, file, callback) => {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    callback(null, `${uuidv4()}.${extension}`); // Utiliser uuidv4 pour générer un nom de fichier unique
  },
});

//export const configurationStorage = multer({ stokage }); // Exporter l'instance de multer

 const configurationStorage = multer({ storage: stokage });
 export default configurationStorage;
