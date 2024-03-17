// import p from './functon.mjs'
// pp = new p('Eridan');

const letraProibida = ['á','à','ã','â','ä','é','è','ê','ë','í','ì','î','ï','ó','ò','õ','ô','ö','ú','ù','û','ü','ç',
                        'Á','À','Ã','Â','Ä','É','È','Ê','Ë','Í','Ì','Î','Ï','Ó','Ò','Õ','Ö','Ô','Ú','Ù','Û','Ü','Ç',
                        'A','B','C','D','E','F','J','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function inserirSubstring(str, subStr, indiceInicio, indiceFim){
  /**
   * Insere uma substring dentro uma string.
   * 1. É copiada uma parte da string (idxInicio, idxFim)
   * 2. A essa parte é concatenada a substring passa no parâmetro SUBSTR.
   * 3. Ao resultado dessa junção é concatenada a segunda parte da string original (onde é passado só o índice inicial).
   */
  novaStr = str.substring(indiceInicio, indiceFim)  + 
            subStr                                  + 
            str.substring(indiceFim);

  return novaStr;
}

function intEntreDoisInts(min, max){ 
  /** Retorna um inteiro criado randomicamente limitado por min e max **/ 
  num = Math.random() * (max - min) + min;

  return parseInt(num.toFixed(0));
}

function inserirEspacosNoTexto(numMin, numMax, texto){
  /**
   * Criada para inserir espaços "aleatórios" no texto, de acordo com o tamanho passado randomicamente entre numMin e numMax.
   */  
  let indice         = 0;   
  let textoComEspaco = texto;

  for (i = 1; i <= textoComEspaco.length; i++){    
    indice = indice + intEntreDoisInts(numMin, numMax);

    if(indice >= textoComEspaco.length){
      break;
    }

    textoComEspaco = inserirSubstring(textoComEspaco, ' ', 0, indice);
  }  

  return textoComEspaco
}

const gerarStringRandomica = (qtdString) => {
  /** Criada originalmente para criar uma string randômica com os caracteres abaixo **/
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
  /**
   * Criada originalmente para embaralhar a palavra-chave com a string randômica.
   * A string randômica tem o tamanho da palavra-chave + 1. Assim a segunda fica totalmente dentro da primeira.
   **/
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

function CamuflarTexto(texto, strASerTrocada, strATrocar){
  /** Criada originalmente para trocar os espaços por outra string **/
  let novoTexto;

  novoTexto = texto.replaceAll(strASerTrocada, strATrocar);

  return novoTexto;
}

function criptografiaPadrao(texto){
  let textoCriptografado = texto.replaceAll("a", "ai")
                                .replaceAll("e", "enter")
                                .replaceAll("i", "imes")
                                .replaceAll("o", "ober")
                                .replaceAll("u", "ufat"); 
       
  return textoCriptografado;       
}

function descriptografiaPadrao(texto){
  let novoTexto = texto.replaceAll("ufat","u")
                       .replaceAll("ober","o")
                       .replaceAll("imes","i")
                       .replaceAll("enter","e")
                       .replaceAll("ai","a"); 

  return novoTexto;
}

function copiarParaAreaTransferencia(){
  taResultado.select();
  document.execCommand('copy');
  textInput.value  = taResultado.value;
}

function textoValido(texto){
  /** Verifica se o texto está de acordo com as regras par criptografia **/
  for(i = 0; i < letraProibida.length; i++){
      if(texto.indexOf(letraProibida[i]) > -1){
        return false;      
      }      
  }
    
  return true;    
}

function validarTexto(texto){
  /** Se o texto não seguir as regas de criptografia, o componente recebe a mensagem de correção **/
  if(!textoValido(textInput.value)){
    textInput.value = document.querySelector('label[for="input-texto"]').outerText;
    return false;
  }

  return true;
}

function divideReverteTexto(texto){
  const tamanho     = texto.length / 2;
  const inicioTexto = texto.substring(0, tamanho);
  const fimTexto    = texto.substring(tamanho);
  const resultado   = inicioTexto.split('').reverse().join('') + 
                      fimTexto.split('').reverse().join('');

  return resultado;
}

function criptografar(){
  /** Se o texto for válido, inicia a criptografia **/
  if(validarTexto(textInput)){
    textoCriptografar = textInput.value;

      /** 1. Aplica a criptografia padrão do desafio.  **/
    textoCriptografar = criptografiaPadrao(textoCriptografar);
      /** 2. Aplica outra camada de criptografia. Camufla o texto, trocando os espaços pelo texto formado pela 
       *  palavra-chave com o texto criado randomicamente). **/
    textoCriptografar = CamuflarTexto(textoCriptografar, ' ',textoParaCamuflar);

      /** 3. Após a segunda camada de criptografia, distribui espaços dentro do texto.  **/
    textoCriptografar = inserirEspacosNoTexto(3,8, textoCriptografar);

    textoCriptografar = divideReverteTexto(textoCriptografar);

    taResultado.value = textoCriptografar;
    avisoDisparado    = false;

    mudarImagem(3);
  }else{
    /** Se não passar na validação, "dispara" o aviso ao usuário  **/
    avisoDisparado = true;
  }
}

function descriptografar(){
  textoCriptografar     = divideReverteTexto(textInput.value);
  textoDescriptografar  = CamuflarTexto(textoCriptografar, ' ', '');
  textoDescriptografar  = CamuflarTexto(textoDescriptografar, textoParaCamuflar, ' ');
  textoDescriptografar  = descriptografiaPadrao(textoDescriptografar);  
  taResultado.value     = textoDescriptografar;
  avisoDisparado        = false;
  mudarImagem(2)
}

function bloquearBtnCriptografar(){
  if(textInput.value == ''){
    btnCriptografar.disabled = true;
    mudarImagem(1)
  }else{
    btnCriptografar.disabled = false;
    mudarImagem(2)
  }
}

function bloquearBtnCopiar(){
  btnCopiar.disabled = (btnCopiar.disabled == true ? false : true);
}

function bloquearBtnDescriptografar(){
  btnDescriptografar.disabled = 
    (textInput.value == '' || (textInput.value != '' && taResultado.value != ''));  
}

function mudarImagem(numImagem){
  if(numImagem == 1){
    imgCadeado.src = './assets/images/alura-carimbo.jpg' 
  }else{
    if(numImagem == 2){
      imgCadeado.src = './assets/images/cadeado-aberto.jpg'
    }else{
      imgCadeado.src = './assets/images/cadeado-fechado.jpg'
    }
  }
}

function limparCampos(){
  textInput.value   = '';
  taResultado.value = '';
  mudarImagem(1);
}

function mudarCorFundoInput(cor){
  textInput.style.backgroundColor = cor == 'azul' ? 'rgb(155, 155, 240)' : 'rgb(114, 207, 114';
}

/******************************************************* Declarações principais *********************************************************/
let palavraChave        = 'alura';
palavraChave            = palavraChave.split('').reverse().join('');
const textoRandomico    = gerarStringRandomica(palavraChave.length + 1);
const textoParaCamuflar = embaralhar(palavraChave, textoRandomico);

let avisoDisparado;
let textoCriptografar;
let textoDescriptografar;

const textInput           = document.getElementById('text-input');
let taResultado           = document.querySelector('.div-mensagem');
let imgCadeado            = document.getElementById('imgCadeado');
const btnCriptografar     = document.getElementById('btn-criptografar');
const btnCopiar           = document.getElementById('btn-copiar');
const btnDescriptografar  = document.getElementById('btn-descriptografar');
const btnLimparCampos     = document.getElementById('btn-limpar-campos');
/******************************************************* Declarações principais *********************************************************/

bloquearBtnCriptografar();

textInput.addEventListener('focus', ()=>{
  mudarCorFundoInput('verde');
  if(avisoDisparado){
    textInput.value = '';
  }  
})

textInput.addEventListener('focusout', ()=>{
  mudarCorFundoInput('azul');
})

textInput.addEventListener('keyup', ()=>{
  mudarImagem(textInput.value === '' ? 1 : 2);
  bloquearBtnCriptografar();
})

btnCriptografar.addEventListener('click', ()=>{
  criptografar(); 
  bloquearBtnCopiar();
})

btnCopiar.addEventListener('click', ()=>{
  copiarParaAreaTransferencia()
  taResultado.value = '';
  bloquearBtnDescriptografar();  
})

btnDescriptografar.addEventListener('click', ()=>{
  descriptografar();
  bloquearBtnDescriptografar();
})

btnLimparCampos.addEventListener('click', ()=>{
  limparCampos();
  bloquearBtnCriptografar();
  bloquearBtnDescriptografar();
  bloquearBtnCopiar();
})