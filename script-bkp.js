// import p from './functon.mjs'
// pp = new p('Eridan');

function inserirSubstring(str, subStr, indiceInicio, indiceFim){
  
  novaStr = str.substring(indiceInicio, indiceFim)  + subStr + str.substring(indiceFim);

  return novaStr;
}

function intEntreDoisInts(min, max){  
  num = Math.random() * (max - min) + min;

  return parseInt(num.toFixed(0));
}

function inserirEspacosNoTexto(numMin, numMax, texto){  
  let indice         = 0;   
  let textoComEspaco = texto;
  let tamanhoTexto   = textoComEspaco.length;

  for (i = 1; i <= tamanhoTexto; i++){    
    indice = indice + intEntreDoisInts(numMin, numMax);

    if(indice > tamanhoTexto + 1){
      break;
    }

    textoComEspaco = inserirSubstring(textoComEspaco, ' ', 0, indice);
  }  

  return textoComEspaco
}

const gerarStringRandomica = (qtdString) => {
   const caractere = 'abcdefghijklmnopqrstuvwxyz';
   
   let result = ''; 
   let indice;
   
   for (let i = 1; i <= qtdString; i++){     
     indice = intEntreDoisInts(1, caractere.length - 1);
 
     result = result + caractere.substring(indice, indice + 1)
   }

   return result;
 };

function embaralhar(texto1, texto2){
   let indiceChar = 0;
 
   for(let i = 0; i < texto2.length; i++){
     if(i % 2 == 0){
       texto2 = inserirSubstring(texto2, texto1[indiceChar], 0, (i + 1));
       indiceChar++;
 
       if(indiceChar == texto1.length){
         break;
       }    
     }
   }
 
   return texto2;
 }

function criptografarPadrao(texto){
  let textoCriptografado = texto.replaceAll("a", "ai")
                                .replaceAll("e", "enter")
                                .replaceAll("i", "imes")
                                .replaceAll("o", "ober")
                                .replaceAll("u", "ufat"); 
       
  return textoCriptografado;       
}

function CamuflarTexto(texto, strASerTrocada, strATrocar){
  let novoTexto;

  novoTexto = texto.replaceAll(strASerTrocada, strATrocar);

  return novoTexto;
}

function descriptografarPadrao(texto){
  let novoTexto = texto.replaceAll("ufat","u")
                       .replaceAll("ober","o")
                       .replaceAll("imes","i")
                       .replaceAll("enter","e")
                       .replaceAll("ai","a"); 

  return novoTexto;
}


let palavraChave      = 'banana';
palavraChave          = palavraChave.split('').reverse().join('');
const textoRandomico  = gerarStringRandomica(palavraChave.length + 1);
textoParaCamuflar     = embaralhar(palavraChave, textoRandomico);

let textoCriptografar = 'minha linda eu te amo muito';

textoCriptografar = criptografarPadrao(textoCriptografar);
textoCriptografar = CamuflarTexto(textoCriptografar, ' ',textoParaCamuflar);
textoCriptografar = inserirEspacosNoTexto(3,8, textoCriptografar);

console.log(textoCriptografar);

let textoDescriptografar = CamuflarTexto(textoCriptografar, ' ', '')
textoDescriptografar     = CamuflarTexto(textoDescriptografar, textoParaCamuflar, ' ');
textoDescriptografar     = descriptografarPadrao(textoDescriptografar);
console.log(textoDescriptografar);
