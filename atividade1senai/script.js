
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

 
  if (!form) return;

  form.addEventListener("submit", (event) => {
   
    event.preventDefault();

    
    const nome = document.getElementById("nome")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const idade = document.getElementById("idade")?.value;

  
    const turnoSelecionado = document.querySelector('input[name="turno"]:checked');
    const turno = turnoSelecionado ? turnoSelecionado.value : "Não informado";


    const curso = document.getElementById("curso")?.value; 
    const setor = document.getElementById("setor")?.value;
    const obs =
      document.getElementById("obs")?.value.trim() ||
      document.getElementById("observacoes")?.value.trim() ||
      "Nenhuma";

  
    if (!nome || nome.length < 3) {
      alert("Por favor, digite um nome com pelo menos 3 caracteres.");
      return;
    }

   
    const dadosCadastro = {
      nome,
      email,
      idade: idade || "Não informada",
      turno,
      ...(curso !== undefined && { curso }),
      ...(setor !== undefined && { setor }),
      observacoes: obs
    };

    
    console.log("Dados capturados:", dadosCadastro);

    
    alert(`Cadastro de ${nome} realizado com sucesso!`);
    form.reset();

  });
});

function limparCampos() {
  document.getElementById('logradouro').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('uf').value = '';
}

async function buscarCep() {
  const cepInput = document.getElementById('cep').value;
  const msgErro = document.getElementById('mensagem-erro');
  const cepLimpo = cepInput.replace(/\D/g, '');

  msgErro.textContent = '';
  limparCampos();

  // Erro 1: CEP incompleto
  if (cepLimpo.length !== 8) {
    msgErro.textContent = 'CEP incompleto. Digite exatamente 8 números.';
    return;
  }

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    
    if (!resposta.ok) {
      throw new Error('Erro na requisição');
    }

    const dados = await resposta.json();

    // Erro 2: CEP inexistente
    if (dados.erro) {
      msgErro.textContent = 'CEP não encontrado ou inexistente.';
      return;
    }

    document.getElementById('logradouro').value = dados.logradouro;
    document.getElementById('bairro').value = dados.bairro;
    document.getElementById('cidade').value = dados.localidade;
    document.getElementById('uf').value = dados.uf;

  } catch (erro) {
    // Erro 3: Sem conexão
    msgErro.textContent = 'Erro de conexão. Verifique sua internet e tente novamente.';
  }
}