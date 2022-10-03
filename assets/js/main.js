
function ValidaCpf(cpfEnviado) {
  Object.defineProperty(this, 'cpfLimpo', {
    enumerable: true,
    get: function () {
      return cpfEnviado.replace(/\D+/g, '')
    }
  })
}

ValidaCpf.prototype.valida = function () {
  if (typeof this.cpfLimpo === 'undefined') return false;
  if (this.cpfLimpo.length !== 11) return false;
  if (this.isSequence()) return false;

  const cpfParcial = this.cpfLimpo.slice(0, -2);
  const digito1 = this.criaDigito(cpfParcial);
  const digito2 = this.criaDigito(cpfParcial + digito1);
  
  const novoCpf = cpfParcial + digito1 + digito2;
  console.log(novoCpf);

  return novoCpf === this.cpfLimpo;
}

ValidaCpf.prototype.criaDigito = function (cpf) {
  const cpfArray = Array.from(cpf)
  let contRegressivo = cpfArray.length + 1
  const total = cpfArray.reduce((ac, val) => {
    ac += (Number(val) * contRegressivo)
    contRegressivo--
    return ac
  }, 0)
  const digito = 11 - (total % 11)
  if (digito > 9) return String(0)
  return String(digito)
}

ValidaCpf.prototype.isSequence = function () {
  const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
  return sequencia === this.cpfLimpo;
    
  
}

const input = document.querySelector('#input');
const button = document.querySelector('#validar');
const texto = document.querySelector('.texto h3')




button.addEventListener('click', function (){
  console.log(input.value)
  let cpf = new ValidaCpf(input.value);
  if(cpf.valida()){
    texto.classList.remove('invalido')
    texto.innerHTML = `O Seu Cpf é Válido`
  }else{
    texto.classList.add('invalido')
    texto.innerHTML = `O Seu Cpf é Inválido`
  }
})