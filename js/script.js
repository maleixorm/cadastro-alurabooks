async function buscaEndereco(cep) {
    var mensagemErro = document.querySelector('#erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCepConvertida = await consultaCep.json();
        if (consultaCepConvertida.erro) {
            throw Error('CEP inexistente!');
        }

        var logradouro = document.querySelector('#endereco');
        var bairro = document.querySelector('#bairro');
        var cidade = document.querySelector('#cidade');
        var estado = document.querySelector('#estado');
        
        logradouro.value = consultaCepConvertida.logradouro;
        bairro.value = consultaCepConvertida.bairro;
        cidade.value = consultaCepConvertida.localidade;
        estado.value = consultaCepConvertida.uf;
        
        console.log(consultaCepConvertida);
        return consultaCepConvertida;
    } catch (error) {
        mensagemErro.innerHTML = "<p>CEP inválido. Tente novamente!</p>"
        console.log(error);
    }
    
}

var cep = document.querySelector('#cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));