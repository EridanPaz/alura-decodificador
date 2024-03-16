/*const gerarStringRandomica = (num) => {
  const caractere = 'abcdefghijklmnopqrstuvwxyz';
  //let result = Math.random().toString(36).substring(0, num);
  
  let result = '';
  let indice; 
  
  for (let i = 1; i <= num; i++){
    indice = Math.random().toFixed(1) * 25;

    result = result + caractere.substring(indice, indice + 1)
  }
  return result;
};

for (let i = 1; i <= 10; i++){
  console.log(gerarStringRandomica(10));  
}*/

/*//RANDOM e TOFIXED
let indice = Math.random();
indice = indice.toFixed(0);*/

/*//SUBSTRING
var anyString = "Mozilla";

// // Mostra "Moz"
// console.log(anyString.substring(0, 3));
// console.log(anyString.substring(3, 0));

// // Mostra "lla"
// console.log(anyString.substring(4, 7));
// console.log(anyString.substring(7, 4));

// // Mostra "Mozill"
// console.log(anyString.substring(0, 6));

// // Mostra "Mozilla"
// console.log(anyString.substring(0, 7));
// console.log(anyString.substring(0, 10));

//RETIRAR ESPAÇOS EM BRANCO
//console.log(`Texto criptografado sem espaços: ${textoCriptografado.replace(/\s+/g)}`);*/

let texto = 'minha linda eu te amo'

function inserirSubstring(str, subStr, indiceInicial, indiceFinal){
  
    novaStr = str.substring(indiceInicial, indiceFinal)  + subStr + str.substring(indiceFinal);

    return novaStr;
}

let palavraChave = 'banana';
let outraPC      = '!@#$%¨';

function embaralhar(texto1, texto2){
  let indiceChar = 0;

  for(let i = 0; i < texto2.length; i++){
    if(i % 2 == 0){
      texto2 = inserirSubstring(texto2, texto1[indiceChar], 0, i + 1);
      indiceChar++;

      if(indiceChar == texto1.length){
        break;
      }    
    }
  }

  return texto2;
}

function indiceEspaco(texto){
  let array = [];

  for (i = 0; i < texto.length; i++){
    if(texto[i] == ' '){
      array.push(i);
    }  
  }

  return array;
}

let posicaoEspaco = indiceEspaco(texto);
console.log(posicaoEspaco);

 function intEntreDoisInts(min, max){  
   const num = Math.random() * (max - min) + min;

   return parseInt(num.toFixed(0));
 }

// let v =[];
// for(i=1; i <= 50; i++){
//   v.push(intEntreDoisInts(1, 8));
// }

// console.log(v);

function inserirEspacosNoTexto(numMin, numMax, texto){
  let indice   = 0; 
  let i = 1;
  
for (i = 1; i < texto.length; i++){    
    indice = indice + intEntreDoisInts(numMin, numMax);

    if(indice >= texto.length){
      console.log('PASSOU DO LIMITE ' + indice)
      break;
    }

    texto = inserirSubstring(texto, ' ', 0, indice);
  }  

  return texto
}

let novoTexto = 'mimesnhaimesvabniaqnxarbhlimesndaimesvabniaqnxarbhenterufatvabniaqnxarbhtentervabniaqnxarbhaimesmobervabniaqnxarbhmufatimestober'
for(i = 1; i <= 10; i++){
  let nt = inserirEspacosNoTexto(3, 8, novoTexto)
  console.log(nt);
}

//console.log(`Texto criptografado sem espaços: ${novoTexto}`);
/* Criptografia usada anteriormente.
function criptografar(string){
  let stringCriptografada = string
                              .replaceAll("a", "ai")
                              .replaceAll("e", "enter")
                              .replaceAll("i", "imes")
                              .replaceAll("o", "ober")
                              .replaceAll("u", "ufat")
                              .replaceAll(" ", textoParaCamuflar);

  stringCriptografada = inserirEspaco(8, stringCriptografada);

  return stringCriptografada
}*/

/* function indiceEspaco(texto){
  let array = [];

  for (i = 0; i < texto.length; i++){
    if(texto[i] == ' '){
      array.push(i);
    }  
  }

  return array;
}*/

/*const vezesCinco = num => num * 5;

console.log(vezesCinco(5))

const eNumeroPar = function(num){return num % 2 == 0}

console.log(eNumeroPar(16));

function cumprimenta(){console.log('Olá')};

cumprimenta();*/

//Abaixo, uma tentativa de pegar um evento quando há alteração na TEXTAREA
// textInput.addEventListener('focus', ()=>{
//   if(avisoDisparado){
//     textInput.value = '';
//   }
// })

// let btnCriptografar = document.getElementById('btn-criptografar');

// let onTextInput = function (event){
//   btnCriptografar.disable = !event.target.value;
// }

// textInput.addEventListener('input', onTextInput);
// textInput.dispatchEvent(new Event('input'));

resize: none


