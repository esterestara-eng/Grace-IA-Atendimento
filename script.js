const chat = document.getElementById("chat");
const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");

function addMessage(text, type) {
  const box = document.createElement("div");
  box.className = `message ${type}`;

  const name = document.createElement("strong");
  name.textContent = type === "grace" ? "Grace" : "Você";

  const p = document.createElement("p");
  p.textContent = text;

  box.appendChild(name);
  box.appendChild(p);
  chat.appendChild(box);
  chat.scrollTop = chat.scrollHeight;
}

function getResponse(message) {
  const text = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (text.includes("oi") || text.includes("ola") || text.includes("bom dia") || text.includes("boa tarde")) {
    return "Olá! 😊 Sou a Grace. Posso ajudar com informações sobre produtos, serviços, horários e atendimento.";
  }

  if (text.includes("horario") || text.includes("atendimento") && text.includes("horario")) {
    return "Nosso horário de atendimento é de segunda a sexta, das 8h às 18h. Se precisar de atendimento fora desse horário, posso registrar sua solicitação.";
  }

  if (text.includes("produto") || text.includes("produtos")) {
    return "Posso ajudar com informações sobre produtos. Para uma resposta específica, informe o nome do produto que você procura.";
  }

  if (text.includes("pagamento") || text.includes("pagar")) {
    return "As formas de pagamento devem ser confirmadas de acordo com o produto ou serviço. Posso encaminhar você para um atendente para confirmar as condições atuais.";
  }

  if (text.includes("preco") || text.includes("valor") || text.includes("quanto custa")) {
    return "Para evitar informações incorretas, preciso consultar os dados atualizados do produto. Informe qual produto você deseja consultar ou fale com um atendente.";
  }

  if (text.includes("atendente") || text.includes("humano") || text.includes("pessoa")) {
    return "Claro! 😊 Posso encaminhar sua solicitação para um atendente humano. Aguarde um momento ou procure o canal de atendimento da empresa.";
  }

  if (text.includes("obrigado") || text.includes("obrigada")) {
    return "Por nada! 😊 Sempre que precisar, pode chamar a Grace.";
  }

  return "Entendi! 😊 Ainda não tenho informações suficientes para responder com segurança. Você pode explicar um pouco mais ou pedir para falar com um atendente.";
}

function sendMessage(text) {
  if (!text.trim()) return;
  addMessage(text.trim(), "user");

  setTimeout(() => {
    addMessage(getResponse(text), "grace");
  }, 400);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value;
  input.value = "";
  sendMessage(text);
});

document.querySelectorAll(".quick-actions button").forEach(button => {
  button.addEventListener("click", () => sendMessage(button.dataset.question));
});
