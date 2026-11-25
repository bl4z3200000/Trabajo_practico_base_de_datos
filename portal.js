/* ===== 1) CONECTOR ENTRE PÁGINAS (lo esencial) ===== */
const pantallas = document.querySelectorAll(".pantalla");
const enlaces = document.querySelectorAll(".navegacion a");
const navegacion = document.getElementById("navegacion");
const hamburguesa = document.getElementById("hamburguesa");

function irAPantalla() {
  const pedido = location.hash.slice(1) || "bienvenida";
  const destino = document.getElementById(pedido)?.classList.contains("pantalla") ? pedido : "bienvenida";

  pantallas.forEach(p => { p.hidden = p.id !== destino; });
  enlaces.forEach(a => a.classList.toggle("activa", a.getAttribute("href") === "#" + destino));
  document.title = document.getElementById(destino).dataset.titulo + " | Portal";

  navegacion.classList.remove("abierta");
  hamburguesa.setAttribute("aria-expanded", "false");
  window.scrollTo(0, 0);
  actualizarScroll();
}

hamburguesa.addEventListener("click", () => {
  const abierta = navegacion.classList.toggle("abierta");
  hamburguesa.setAttribute("aria-expanded", abierta);
});

window.addEventListener("hashchange", irAPantalla);

/* ===== 2) EXTRAS OPCIONALES (podés borrar este bloque y todo sigue andando) ===== */

// Índice automático con los <h2> de cada tema
document.querySelectorAll(".pantalla").forEach(pantalla => {
  const indice = pantalla.querySelector(".indice");
  if (!indice) return;
  indice.innerHTML = "<strong>En esta página</strong>";
  pantalla.querySelectorAll(".texto h2").forEach(h2 => {
    const b = document.createElement("button");
    b.textContent = h2.textContent;
    b.addEventListener("click", () => h2.scrollIntoView({ behavior: "smooth" }));
    indice.appendChild(b);
  });
});

// Barra de progreso, botón "subir" e índice resaltado
const barra = document.getElementById("progreso");
const subir = document.getElementById("subir");

function actualizarScroll() {
  const alto = document.documentElement.scrollHeight - window.innerHeight;
  barra.style.width = (alto > 0 ? (window.scrollY / alto) * 100 : 0) + "%";
  subir.classList.toggle("visible", window.scrollY > 500);

  const activa = document.querySelector(".pantalla:not([hidden])");
  const titulos = activa.querySelectorAll(".texto h2");
  const botones = activa.querySelectorAll(".indice button");
  let actual = -1;
  titulos.forEach((h, i) => { if (h.getBoundingClientRect().top < 140) actual = i; });
  botones.forEach((b, i) => b.classList.toggle("visto", i === actual));
}

subir.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", actualizarScroll, { passive: true });

irAPantalla();
