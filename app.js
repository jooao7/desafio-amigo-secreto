let amigos = [];

function adicionarAmigo() {
  const input = document.getElementById("amigo");
  const nome = input.value.trim();

  if (nome === "") {
    Swal.fire({
      icon: "error",
      title: "Campo vazio!",
      text: "Por favor, insira um nome antes de adicionar.",
      confirmButtonColor: "#fe652b",
    });
    return;
  }

  if (amigos.includes(nome)) {
    Swal.fire({
      icon: "warning",
      title: "Nome duplicado",
      text: "Esse nome já foi adicionado à lista.",
      confirmButtonColor: "#fe652b",
    });
    input.value = "";
    return;
  }

  amigos.push(nome);

  input.value = "";

  atualizarLista();

  Swal.fire({
    icon: "success",
    title: "Amigo adicionado!",
    text: `${nome} foi adicionado à lista com sucesso.`,
    timer: 1500,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
  });
}

function atualizarLista() {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";
  amigos.forEach((amigo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${amigo}</span>
            <button onclick="removerAmigo(${index})" 
                    style="margin-left: 10px; padding: 5px 10px; background-color: #ff4757; 
                           color: white; border: none; border-radius: 15px; cursor: pointer; font-size: 12px;">
                ✕
            </button>
        `;
    li.style.cssText =
      "display: flex; justify-content: space-between; align-items: center; margin: 5px 0; padding: 10px; background-color: #f8f9fa; border-radius: 10px;";
    lista.appendChild(li);
  });
}

function removerAmigo(index) {
  const nomeRemovido = amigos[index];

  Swal.fire({
    title: "Remover amigo?",
    text: `Tem certeza que deseja remover "${nomeRemovido}" da lista?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#fe652b",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sim, remover",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      amigos.splice(index, 1);
      atualizarLista();

      Swal.fire({
        icon: "success",
        title: "Removido!",
        text: `${nomeRemovido} foi removido da lista.`,
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }
  });
}

function sortearAmigo() {
  const resultado = document.getElementById("resultado");

  if (amigos.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Lista vazia!",
      text: "Adicione pelo menos um amigo antes de sortear.",
      confirmButtonColor: "#fe652b",
    });
    return;
  }

  if (amigos.length < 2) {
    Swal.fire({
      icon: "warning",
      title: "Poucos participantes!",
      text: "Adicione pelo menos 2 amigos para um sorteio mais interessante.",
      showCancelButton: true,
      confirmButtonColor: "#fe652b",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sortear mesmo assim",
      cancelButtonText: "Adicionar mais amigos",
    }).then((result) => {
      if (result.isConfirmed) {
        realizarSorteio();
      }
    });
    return;
  }

  realizarSorteio();
}

function realizarSorteio() {
  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos[indiceAleatorio];

  Swal.fire({
    icon: "success",
    title: "🎉 Resultado do Sorteio! 🎉",
    html: `
            <div style="font-size: 24px; margin: 20px 0;">
                <strong>${amigoSorteado}</strong>
            </div>
            <p style="font-size: 16px; color: #666;">
                foi o amigo secreto sorteado!
            </p>
        `,
    confirmButtonColor: "#fe652b",
    confirmButtonText: "Novo Sorteio",
    showCancelButton: true,
    cancelButtonText: "Fechar",
    cancelButtonColor: "#6c757d",
  }).then((result) => {
    if (result.isConfirmed) {
      // Limpa o resultado anterior e permite novo sorteio
      document.getElementById("resultado").innerHTML = "";
    }
  });

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `<li>🎉 O amigo secreto sorteado é: <strong>${amigoSorteado}</strong>! 🎉</li>`;
}

document.getElementById("amigo").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    adicionarAmigo();
  }
});

function limparLista() {
  if (amigos.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Lista já está vazia!",
      confirmButtonColor: "#fe652b",
    });
    return;
  }

  Swal.fire({
    title: "Limpar lista?",
    text: "Tem certeza que deseja remover todos os amigos da lista?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#fe652b",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sim, limpar tudo",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      amigos = [];
      atualizarLista();
      document.getElementById("resultado").innerHTML = "";

      Swal.fire({
        icon: "success",
        title: "Lista limpa!",
        text: "Todos os amigos foram removidos.",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }
  });
}
