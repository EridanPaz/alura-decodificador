
/*export default Texte;
import Teste from 'arquivo.js'*/

//ou

/*export funcion Teste(){}
import {Teste} from 'arquivo.js'*/

export default class Pessoa {

   constructor(nome) {
       if (nome === undefined || nome.length <= 0) {
           throw new Error("O nome é obrigatório para uma Pessoa");
       }
       this.nome = nome;
   }

   apresentar() {
       console.log(`Olá, meu nome é ${this.nome}`);
   }

}
