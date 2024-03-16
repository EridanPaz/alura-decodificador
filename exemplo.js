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


function inserirSubstring(str, subStr, indiceInicio, indiceFim){
  novaStr = str.substring(indiceInicio, indiceFim)  + 
            subStr                                  + 
            str.substring(indiceFim);

  return novaStr;
}


function divideReverteTexto(texto){
  const tamanho     = texto.length / 2;
  const inicioTexto = texto.substring(0, tamanho);
  const fimTexto    = texto.substring(tamanho);
  const resultado   = inicioTexto.split('').reverse().join('') + fimTexto.split('').reverse().join('');
  
  return resultado;
}

const texto  = 'minha linda10'
const texto2 = divideReverteTexto(texto);
console.log(texto2);

console.log(divideReverteTexto(texto2));
