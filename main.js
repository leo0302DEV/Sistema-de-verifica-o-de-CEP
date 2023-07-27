const cepInput = document.getElementById('container__cep');
const botao = document.getElementById('container__button');

botao.addEventListener('click', (event) => {

    event.preventDefault();

    var cep = cepInput.value;

    if(cep.length == 8) {
        fazRequisição(cep);
    } else {
        alert('Digite um CEP válido!');
        intrucoesDeUtilizacao();
    }
});

function intrucoesDeUtilizacao() {
    alert('O código de CEP deve conter 8 caracteres e não apresentar espaços entre os mesmos! \n EX: 90010370');
}

function fazRequisição(cep) {

    const url = 'https://viacep.com.br/ws/' + cep + '/json/';
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.addEventListener('load', () => {
        var resposta = JSON.parse(xhr.responseText);
        extraiInformacoes(resposta);
    });

    xhr.send();
}

function extraiInformacoes(resposta) {

    var informacoes = {
        'bairro': resposta.bairro,
        'cep': resposta.cep,
        'localidade': resposta.localidade,
        'logradouro': resposta.logradouro,
        'uf': resposta.uf
    }

    reatribuiValor(informacoes);
}

function reatribuiValor(informacoes) {

    document.getElementById('container__logradouro').value = informacoes.logradouro;
    document.getElementById('container__bairro').value = informacoes.bairro;
    document.getElementById('container__localidade').value = informacoes.localidade;
    document.getElementById('container__uf').value = informacoes.uf;
}
