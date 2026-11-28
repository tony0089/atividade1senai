
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

function limparEndereco() {
  document.getElementById('logradouro').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('uf').value = '';
}

async function buscarCep() {
  const cep = document.getElementById('cep').value.replace(/\D/g, '');
  limparEndereco();

  const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const dados = await resposta.json();

  document.getElementById('logradouro').value = dados.logradouro;
  document.getElementById('bairro').value = dados.bairro;
  document.getElementById('cidade').value = dados.localidade;
  document.getElementById('uf').value = dados.uf;
}
