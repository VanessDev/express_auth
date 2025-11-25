const app = require('./app');
const { env } = require('./config/env.js');

//recupère le PORT
const PORT = env.port;

//Vérifie que le port existe
if(!PORT){
    console.log('PORT absent veuillez completer le fichier .env');
    //stop le programme de lancement de node
    process.exit(1);
}

app.listen(PORT, ()=>{
    console.log(`server lancé sur le port ${PORT}`);
});