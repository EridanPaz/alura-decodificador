// import p from './functon.mjs'
// pp = new p('Eridan');

const letraProibida = ['á','à','ã','â','ä','é','è','ê','ë','í','ì','î','ï','ó','ò','õ','ô','ö','ú','ù','û','ü','ç',
                        'Á','À','Ã','Â','Ä','É','È','Ê','Ë','Í','Ì','Î','Ï','Ó','Ò','Õ','Ö','Ô','Ú','Ù','Û','Ü','Ç',
                        'A','B','C','D','E','F','J','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const orientacao = ['1. Digite o texto a ser criptografado no primeiro campo.', 
                    '2. Clique em "Criptografar". A criptografia aparecerá no segundo campo.', 
                    '3. Clique em "Copiar". A criptografia será copiada para o primeiro campo.', 
                    '4. Clique em "Descriptografar. O texto será descriptografado e apresentado no segundo campo."', 
                    '5. Clique em "Limpar" para limpar os campos e reiniciar a aplicação.'];


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

function divideReverteTexto(texto){
              /** Divide o texto em duas partes e os concatena após revertê-los. **/
  const tamanho     = texto.length / 2;
  const inicioTexto = texto.substring(0, tamanho);
  const fimTexto    = texto.substring(tamanho);
  const resultado   = inicioTexto.split('').reverse().join('') + 
                      fimTexto.split('').reverse().join('');

  return resultado;
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

function criptografar(){
            /** Se o texto for válido, inicia a criptografia **/
    if(textoValido(textInput.value)){    
    textInput.id = 'text-input';

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
    textInput.id ='mensagem-alerta';

    textInput.value = document.querySelector('label[for="text-input"]').outerText;   
    avisoDisparado  = true;
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
  btnCopiar.disabled = (taResultado.innerText == '' ? false : true);
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
  textInput.setAttribute('id', 'text-input');

  pTextoOrientacao.innerText      = 'Clique no botão abaixo para orientação do passo a passo de como executar a aplicação.'
  textInput.value                 = '';
  taResultado.value               = '';
  textInput.style.border          = 'none';
  taResultado.style.border        = 'none';
  btnCriptografar.style.border    = 'none';
  btnCopiar.style.border          = 'none';
  btnDescriptografar.style.border = 'none';
  btnLimparCampos.style.border    = 'none';
  indiceOrientacao                = 0;
  mudarImagem(1);
  elementoTransiction(0);
}

function mudarCorFundoInput(cor){
  textInput.style.backgroundColor = cor == 'azul' ? 'rgb(155, 155, 240)' : 'rgb(114, 207, 114';
}

function elementoTransiction(tempo){
  textInput.style.transition          = tempo + 's';
  taResultado.style.transition        = tempo + 's';
  btnCriptografar.style.transition    = tempo + 's';
  btnCopiar.style.transition          = tempo + 's';
  btnDescriptografar.style.transition = tempo + 's';
  btnLimparCampos.style.transition    = tempo + 's';
}

function textoOrientacao(indice){
  elementoTransiction(1)  ;

  pTextoOrientacao.innerText = indice < 5 ? orientacao[indice] : '';
  btnOrientacao.innerText    = indice < 5 ? `Passo ${indice + 1}`: 'Passos';

  switch (indice){
    case 0:
      textInput.style.border     = 'solid 6px red';
    break
    case 1:                
      textInput.style.border           = 'none';
      taResultado.style.border         = 'solid 6px red';
      btnCriptografar.style.border     = 'solid 4px red';
    break
    case 2:
      textInput.style.border           = 'solid 6px red';                   
      taResultado.style.border         = 'none';  
      btnCriptografar.style.border     = 'none';
      btnCopiar.style.border           = 'solid 4px red'; 
    break    
    case 3:
      textInput.style.border          = 'none';  
      taResultado.style.border        = 'solid 6px red'; 
      btnCopiar.style.border          = 'none';    
      btnDescriptografar.style.border = 'solid 4px red';
    break 
    case 4:
      btnDescriptografar.style.border  = 'none';        
      textInput.style.border           = 'solid 6px red'; 
      btnLimparCampos.style.border     = 'solid 4px red';
    break 
    default:
      limparCampos();    
  }
     
  
  return (indice < 5 ?  ++indice : 0);
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
let btnOrientacao         = document.getElementById('btn-orientacao');
let pTextoOrientacao      = document.getElementById('how-todo-orientacao-texto');
let indiceOrientacao      = 0;
const btnCriptografar     = document.getElementById('btn-criptografar');
const btnCopiar           = document.getElementById('btn-copiar');
const btnDescriptografar  = document.getElementById('btn-descriptografar');
const btnLimparCampos     = document.getElementById('btn-limpar-campos');
const generalSection      = document.getElementById('general-section');
/******************************************************* Declarações principais *********************************************************/

limparCampos();

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

btnOrientacao.addEventListener('click', ()=>{
  indiceOrientacao = textoOrientacao(indiceOrientacao);  
})