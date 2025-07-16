// Extraído del PDF
const ramos = [
  {
    nombre: "Taller de Nivelación Matemáticas",
    codigo: "RAMO001",
    semestre: "Año 1 - Sem 1",
    prerequisitos: []
  },
  {
    nombre: "Taller de Habilidades Comunicacionales",
    codigo: "RAMO002",
    semestre: "Año 1 - Sem 1",
    prerequisitos: []
  },
  {
    nombre: "Fundamentos del Trabajo Social",
    codigo: "RAMO003",
    semestre: "Año 1 - Sem 1",
    prerequisitos: []
  },
  {
    nombre: "Psicología General",
    codigo: "RAMO004",
    semestre: "Año 1 - Sem 1",
    prerequisitos: []
  },
  {
    nombre: "Trabajo Social, Cultura y Sociedad",
    codigo: "RAMO005",
    semestre: "Año 1 - Sem 1",
    prerequisitos: []
  },
  {
    nombre: "Teorías Sociales y Contemporáneas",
    codigo: "RAMO006",
    semestre: "Año 1 - Sem 1",
    prerequisitos: []
  },
  {
    nombre: "Epistemología del Trabajo Social",
    codigo: "RAMO007",
    semestre: "Año 1 - Sem 2",
    prerequisitos: ["RAMO003"]
  },
  {
    nombre: "Psicología Evolutiva y Social",
    codigo: "RAMO008",
    semestre: "Año 1 - Sem 2",
    prerequisitos: ["RAMO004"]
  },
  {
    nombre: "Paradigmas Sociológicos y Fenómenos Sociales",
    codigo: "RAMO009",
    semestre: "Año 1 - Sem 2",
    prerequisitos: ["RAMO006"]
  },
  {
    nombre: "Taller de Acercamiento a la Realidad",
    codigo: "RAMO010",
    semestre: "Año 1 - Sem 2",
    prerequisitos: []
  },
  {
    nombre: "Bases Teóricas para la Diversidad y la Inclusión",
    codigo: "RAMO011",
    semestre: "Año 1 - Sem 2",
    prerequisitos: []
  },
  {
    nombre: "Herramientas de la Información y la Comunicación",
    codigo: "RAMO012",
    semestre: "Año 1 - Sem 2",
    prerequisitos: []
  },
  {
    nombre: "Políticas Públicas y Sociales",
    codigo: "RAMO013",
    semestre: "Año 1 - Sem 2",
    prerequisitos: []
  }
  // Puedes seguir añadiendo el resto aquí
];

const estado = JSON.parse(localStorage.getItem("estadoAprobado")) || {};

function guardarEstado() {
  localStorage.setItem("estadoAprobado", JSON.stringify(estado));
}

function crearMalla() {
  const container = document.getElementById("malla-container");
  container.innerHTML = "";

  const semestres = [...new Set(ramos.map(r => r.semestre))];

  semestres.forEach(sem => {
    const divSem = document.createElement("div");
    divSem.className = "semestre";
    divSem.innerHTML = `<h2>${sem}</h2>`;

    ramos.filter(r => r.semestre === sem).forEach(ramo => {
      const divRamo = document.createElement("div");
      divRamo.className = "ramo";
      divRamo.textContent = ramo.nombre;

      const aprobado = estado[ramo.codigo];
      const habilitado = ramo.prerequisitos.every(cod => estado[cod]);

      if (!habilitado && ramo.prerequisitos.length > 0) {
        divRamo.classList.add("bloqueado");
      } else if (aprobado) {
        divRamo.classList.add("aprobado");
      }

      divRamo.addEventListener("click", () => {
        if (divRamo.classList.contains("bloqueado")) return;

        estado[ramo.codigo] = !estado[ramo.codigo];
        guardarEstado();
        crearMalla();
      });

      divSem.appendChild(divRamo);
    });

    container.appendChild(divSem);
  });
}

crearMalla();

