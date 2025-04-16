const express = require("express");
const cors = require('cors');
const server = express(); 
server.use(express.json());
server.use(cors());

server.get('/teste', (req, res)=> {
  res.send('<marquee><center><h1> tudo certo com a api!!!!</h1></center></marquee>');
});  

const PessoaRoutes = require('./routes/PessoaRoutes');
const CidadesRoutes = require('./routes/CidadeRouter');
server.use('/pessoa', PessoaRoutes);
server.use('/cidade', CidadesRoutes);

server.listen(3000, () => {
    console.log('API online');
});