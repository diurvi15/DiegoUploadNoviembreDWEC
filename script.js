// Información de los sujetos
const sujetos = [
  {
    nombre: "David Choak",
    tipo: "descargado",
    vive: "Desconocido",
    desde: "2023-11-17",
    culpabilidad: "Delincuente",
    url: "./img/DavidChoak.png",
    comentarios: "Sin comentarios",
  }
  // Agrega más sujetos según sea necesario
];
let viewHandler;
let sujetoHandler;
let isInfoVisible = true;
let isFormVisible = false;

class ViewHandler {
  constructor() {
    this.initialize();
  }

  initialize() {
    const toggleButton = document.getElementById("toggleButton");
    if (toggleButton) {
      toggleButton.addEventListener("click", () => this.toggleView());
    }

    const formToggleButton = document.getElementById("formToggleButton");
    if (formToggleButton) {
      formToggleButton.addEventListener("click", () => this.toggleForm());
    }

    const returnToListButton = document.getElementById("returnToListButton");
    if (returnToListButton) {
      returnToListButton.addEventListener("click", () => this.returnToList());
    }

    // Agregamos un listener al campo de tipo para detectar cambios y manejar la edición del campo "Desde"
    const tipoInput = document.getElementById("tipoInput");
    if (tipoInput) {
      tipoInput.addEventListener("change", () => this.handleTipoChange());
    }
    const agregarSujetoButton = document.getElementById("agregarSujetoButton");
    if (agregarSujetoButton) {
      agregarSujetoButton.addEventListener("click", () =>
        sujetoHandler.agregarSujeto()
      );
    }

    const modificarSujetoButton = document.getElementById("modificarSujetoButton");
    if (modificarSujetoButton) {
        modificarSujetoButton.addEventListener("click", () => this.modificarSujeto());
    }

    this.toggleFormButton();
    this.toggleReturnToListButton();
  }

  handleTipoChange() {
    const tipoInput = document.getElementById("tipoInput");
    const desdeInput = document.getElementById("desdeInput");

    if (tipoInput && desdeInput) {
      // Habilitar o deshabilitar el campo "Desde" según el valor seleccionado en el campo "Tipo"
      desdeInput.disabled = tipoInput.value !== "descargado";
      desdeInput.value ="";
    }
  }

  toggleView() {
    isInfoVisible = !isInfoVisible;
    isFormVisible = false;
    this.updateView();
    this.toggleFormButton();
    this.toggleReturnToListButton();
  }

  toggleFormButton() {
    const formToggleButton = document.getElementById("formToggleButton");
    if (formToggleButton) {
      formToggleButton.style.display = isInfoVisible ? "block" : "none";
    }
  }

  toggleForm() {
    isFormVisible = !isFormVisible;
    this.updateView();
    this.toggleReturnToListButton();
    if (isFormVisible) {
        this.resetFormFields();
      }
  }

  toggleReturnToListButton() {
    const returnToListButton = document.getElementById("returnToListButton");

    if (returnToListButton) {
      returnToListButton.style.display = isFormVisible ? "block" : "none";
      if (!isFormVisible) {
        // Si se sale de la pantalla del formulario, resetea los campos del formulario
        this.resetFormFields();
      }
    }
  }
  returnToList() {
    isFormVisible = false;
    this.updateView();
    this.resetFormFields();
  }
  

  resetFormFields() {
    // Establecer los valores de los campos del formulario a su estado inicial
    document.getElementById("nombreInput").value = "";
    document.getElementById("viveInput").value = "";
    document.getElementById("desdeInput").value = "";
    document.getElementById("desdeInput").disabled = false;
    document.getElementById("urlInput").value = "";
    document.getElementById("comentariosInput").value = "";
  }

  modificarSujeto() {
    // Obtener los valores del formulario
    const nombre = document.getElementById("nombreInput").value;
    const tipo = document.getElementById("tipoInput").value;
    const vive = document.getElementById("viveInput").value;
    const desde = document.getElementById("desdeInput").value;
    const culpabilidad = document.getElementById("culpabilidadInput").value;
    const url = document.getElementById("urlInput").value;
    const comentarios = document.getElementById("comentariosInput").value;

    const selectedIndex = this.getSelectedSubjectIndex();

    if (!nombre) {
        alert("Por favor, ingrese el nombre del sujeto.");
        return;
      }
  
      if (!vive) {
        alert("Por favor, ingrese la ubicación actual del sujeto.");
        return;
      }
  
  
      if (!comentarios) {
        alert("Por favor, ingrese comentarios sobre el sujeto.");
        return;
      }
  
      

    if (selectedIndex !== -1) {
        sujetos[selectedIndex] = {
            nombre,
            tipo,
            vive,
            desde,
            culpabilidad,
            url,
            comentarios,
        };

        sujetoHandler.actualizarLocalStorage();

        this.renderSubjectList();

        isFormVisible = false;
        this.toggleView();

        alert("Sujeto modificado exitosamente.");
    } else {
        alert("Error al modificar el sujeto. No se ha seleccionado un sujeto.");
    }
}

getSelectedSubjectIndex() {
    const selectedNombre = document.getElementById("nombreInput").value;
    return sujetos.findIndex((sujeto) => sujeto.nombre === selectedNombre);
}

  updateView() {
    const infoElement = document.getElementById("info");
    const lakeviewElement = document.getElementById("lakeview");
    const subjectListElement = document.getElementById("subjectList");
    const formElement = document.getElementById("subjectForm");
    const formToggleButton = document.getElementById("formToggleButton");

    if (infoElement && lakeviewElement && subjectListElement && formElement) {
      if (isInfoVisible) {
        infoElement.style.display = "block";
        lakeviewElement.style.display = "none";

        if (!isFormVisible && subjectListElement && formToggleButton) {
          subjectListElement.style.display = "flex";
          formElement.style.display = "none";
          formToggleButton.style.display = "block";
          this.renderSubjectList();
        } else if (isFormVisible && formToggleButton) {
          subjectListElement.style.display = "none";
          formElement.style.display = "block";
          formToggleButton.style.display = "none";
        }
        this.toggleReturnToListButton();
      } else if (formToggleButton) {
        infoElement.style.display = "none";
        lakeviewElement.style.display = "block";
        subjectListElement.style.display = "none";
        formElement.style.display = "none";
        formToggleButton.style.display = "none";
      }
    }
  }

  renderSubjectList() {
    const subjectListElement = document.getElementById("subjectList");
    if (subjectListElement) {
      subjectListElement.innerHTML = "";

      sujetos.forEach((sujeto, index) => {
        const sujetoElement = document.createElement("div");
        sujetoElement.classList.add("subject");

        sujetoElement.style.border =
          sujeto.tipo === "descargado" ? "2px solid green" : "2px solid red";

        sujetoElement.style.color =
          sujeto.culpabilidad === "Posible Cooperador"
            ? "green"
            : sujeto.culpabilidad === "Colaborador"
            ? "orange"
            : sujeto.culpabilidad === "Delincuente"
            ? "red"
            : "black";

        const imgElement = document.createElement("img");
        imgElement.src = sujeto.url;
        imgElement.alt = sujeto.nombre;
        imgElement.addEventListener("error", () => imgElement.src= "./img/noImagen.png");

        const nombreElement = document.createElement("p");
        nombreElement.textContent = sujeto.nombre;


        sujetoElement.appendChild(imgElement);
        sujetoElement.appendChild(nombreElement);

        // Agrega un event listener para manejar el clic en el sujeto
        sujetoElement.addEventListener("click", () =>
          this.showSubjectDetails(index)
        );

        subjectListElement.appendChild(sujetoElement);
      });
    }
  }

  showSubjectDetails(index) {
    const formElement = document.getElementById("subjectForm");
    const formToggleButton = document.getElementById("formToggleButton");

    if (formElement && formToggleButton) {
      // Rellena el formulario con los datos del sujeto seleccionado
      document.getElementById("nombreInput").value = sujetos[index].nombre;
      document.getElementById("tipoInput").value = sujetos[index].tipo;
      document.getElementById("viveInput").value = sujetos[index].vive;

      // Cargar la fecha desde el listado al campo desde del formulario
      const desdeInput = document.getElementById("desdeInput");
      desdeInput.value = sujetos[index].desde;
      
      // Deshabilitar el campo "desde" si el tipo es "vivo"
      desdeInput.disabled = sujetos[index].tipo === "vivo";

      const culpabilidadSelect = document.getElementById("culpabilidadInput");
      for (let i = 0; i < culpabilidadSelect.options.length; i++) {
        if (
          culpabilidadSelect.options[i].value === sujetos[index].culpabilidad
        ) {
          culpabilidadSelect.selectedIndex = i;
          if (
            culpabilidadSelect.options[i].value === sujetos[index].culpabilidad
          ) {
            culpabilidadSelect.selectedIndex = i;
          }
          break;
        }
      }
      document.getElementById("urlInput").value = sujetos[index].url;
      document.getElementById("comentariosInput").value =
        sujetos[index].comentarios;

      document.getElementById("culpabilidadInput").style.color =
        sujetos[index].culpabilidad === "Posible Cooperador"
          ? "green"
          : sujetos[index].culpabilidad === "Colaborador"
          ? "orange"
          : sujetos[index].culpabilidad === "Delincuente"
          ? "red"
          : "black";

      isFormVisible = true;
      this.updateView();
      this.toggleReturnToListButton();
    }
  }
}

class SujetoHandler {
  agregarSujeto() {
    const nombre = document.getElementById("nombreInput").value;
    const tipo = document.getElementById("tipoInput").value;
    const vive = document.getElementById("viveInput").value;
    const desde = document.getElementById("desdeInput").value;
    const culpabilidad = document.getElementById("culpabilidadInput").value;
    const url = document.getElementById("urlInput").value;
    const comentarios = document.getElementById("comentariosInput").value;

    if (!nombre) {
      alert("Por favor, ingrese el nombre del sujeto.");
      return;
    }

    if (!vive) {
      alert("Por favor, ingrese la ubicación actual del sujeto.");
      return;
    }

    if (tipo === "descargado" && !desde) {
      alert(
        "Por favor, ingrese la fecha desde la cual el sujeto fue descargado."
      );
      return;
    }

    if (!comentarios) {
      alert("Por favor, ingrese comentarios sobre el sujeto.");
      return;
    }

    const sujetoExistente = sujetos.find((sujeto) => sujeto.nombre === nombre);

    if (sujetoExistente) {
      alert("El sujeto ya existe en la lista.");
      return;
    }

    // Agregar el nuevo sujeto a la matriz
    sujetos.push({
      nombre,
      tipo,
      vive,
      desde,
      culpabilidad,
      url,
      comentarios,
    });

    this.actualizarLocalStorage();
    console.log("Datos guardados en localStorage:", sujetos);

    // Renderizar la lista de sujetos
    viewHandler.renderSubjectList();

    alert("Sujeto agregado correctamente");
    isFormVisible = false;
    viewHandler.toggleView();
  }

  actualizarLocalStorage() {
    localStorage.setItem("sujetos", JSON.stringify(sujetos));
    console.log("Datos actualizados en localStorage:", sujetos);
  }
}

function showImage() {
  const infoElement = document.getElementById("info");
  const lakeviewElement = document.getElementById("lakeview");
  const subjectListElement = document.getElementById("subjectList");
  const formElement = document.getElementById("subjectForm");

  if (infoElement && lakeviewElement && subjectListElement && formElement) {
    infoElement.style.display = "block";
    lakeviewElement.style.display = "none";
    subjectListElement.style.display = "flex";
    formElement.style.display = "none";
  }
}

function toggleForm() {
  const infoElement = document.getElementById("info");
  const lakeviewElement = document.getElementById("lakeview");
  const subjectListElement = document.getElementById("subjectList");
  const formElement = document.getElementById("subjectForm");
  const formToggleButton = document.getElementById("formToggleButton");

  if (
    infoElement &&
    lakeviewElement &&
    subjectListElement &&
    formElement &&
    formToggleButton
  ) {
    infoElement.style.display = "none";
    lakeviewElement.style.display = "none";
    subjectListElement.style.display = "none";
    formElement.style.display = "block";
    formToggleButton.style.display = "none";
  }
}

function returnToList() {
  const infoElement = document.getElementById("info");
  const lakeviewElement = document.getElementById("lakeview");
  const subjectListElement = document.getElementById("subjectList");
  const formElement = document.getElementById("subjectForm");
  const formToggleButton = document.getElementById("formToggleButton");

  if (
    infoElement &&
    lakeviewElement &&
    subjectListElement &&
    formElement &&
    formToggleButton
  ) {
    infoElement.style.display = "block";
    lakeviewElement.style.display = "none";
    subjectListElement.style.display = "flex";
    formElement.style.display = "none";
    formToggleButton.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  viewHandler = new ViewHandler();
  sujetoHandler = new SujetoHandler();

  
  try {
    const localStorageData = JSON.parse(localStorage.getItem("sujetos")) || [];

    if (localStorageData.length === 0) {
      sujetos.forEach((sujeto) => {
        localStorageData.push(sujeto);
      });

      localStorage.setItem("sujetos", JSON.stringify(localStorageData));
    }
    sujetos.length = 0;
    sujetos.push(...localStorageData);
    viewHandler.renderSubjectList(); // Renderiza la lista al cargar la página
  } catch (error) {
    console.error("Error al cargar datos desde localStorage:", error);
  }
  showImage();
});
