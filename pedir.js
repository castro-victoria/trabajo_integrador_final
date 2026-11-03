document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formPedido");

    const nom = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const tel = document.getElementById("telefono");
    const contenedor = document.getElementById("contenedorSabores");
    const btnAgregar = document.getElementById("btnAgregarSabor");
    const respuesta = document.getElementById("respuesta");

    //Agregar sabor
    btnAgregar.addEventListener("click", () => {
        const fila = document.querySelector(".fila-sabor").cloneNode(true);
        fila.querySelector(".select-sabor").value = "";
        fila.querySelector(".cantidad-sabor").value = "";
        fila.querySelector(".error-sabor").textContent = "";
        contenedor.appendChild(fila);
    });
    //Eliminar sabor
    contenedor.addEventListener("click", (e) => {
        if (e.target.classList.contains("btnEliminarSabor")) {
            const filas = document.querySelectorAll(".fila-sabor");
            if (filas.length > 1) {
                e.target.closest(".fila-sabor").remove();
            }
        }
    });
    //Enviar form
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        validar();
    });

    function validar() {
        respuesta.innerHTML = "";
        let errores = [];
        [nom, apellido, email, tel].forEach(campo => {
            campo.classList.remove("error");
        });
        //Valido nombre
        let n = nom.value.trim();
        if (n.length == 0) {
            errores.push("Falta ingresar el nombre.");
            nom.classList.add("error");
        } else if (n.length < 2 || n.length > 20) {
            errores.push("El nombre debe ser entre 2 y 20 caracteres.");
            nom.classList.add("error");
        }
        //Valido apellido
        let a = apellido.value.trim();
        if (a.length == 0) {
            errores.push("Falta ingresar el apellido.");
            apellido.classList.add("error");
        } else if (a.length < 2 || a.length > 20) {
            errores.push("El apellido debe ser entre 2 y 20 caracteres.");
            apellido.classList.add("error");
        }
        //Valido email
        let expRegEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        let e = email.value.trim();
        if (e.length == 0) {
            errores.push("Falta ingresar el correo electrónico.");
            email.classList.add("error");
        } else if (!expRegEmail.test(e)) {
            errores.push("El correo es inválido.");
            email.classList.add("error");
        }
        //Valido telefono
        let expRegTelefono = /[0-9+\s\-()]{6,20}/;
        let numero = tel.value.trim();
        if (numero.length == 0) {
            errores.push("Falta ingresar el teléfono.");
            tel.classList.add("error");
        } else if (!expRegTelefono.test(numero)) {
            errores.push("El telefono es inválido.");
            tel.classList.add("error");
        }
        //Valido sabor y cantidad
        let expRegConteo = /^(?:[1-9]|[1-4][0-9]|50)$/;
        const filas = document.querySelectorAll(".fila-sabor");
        let pedido = [];
        if (filas.length == 0) {
            errores.push("Debés agregar al menos un sabor.");
        }
        filas.forEach((fila) => {
            const sabor = fila.querySelector(".select-sabor");
            const cantidad = fila.querySelector(".cantidad-sabor");

            if (sabor.value == "") {
                errores.push("Elegí un sabor.");
            }
            if (!expRegConteo.test(cantidad.value)) {
                errores.push("Ingresa una cantidad válida (entre 1 y 50).");
            }
            if (sabor.value != "" && expRegConteo.test(cantidad.value)) {
                pedido.push(`${sabor.value} - ${cantidad.value} unidad(es)`);
            }
        });
        //Mostrar errores
        if (errores.length > 0){
            const titulo = document.createElement("h3");
            titulo.textContent = "Corregí los siguientes errores:";
            respuesta.appendChild(titulo);
            const ul = document.createElement("ul");
            errores.forEach(err => {
                const li = document.createElement("li");
                li.textContent = err;
                ul.appendChild(li);
            });
            respuesta.appendChild(ul);
            return;
        }
        //Mostrar resumen
        const titulo = document.createElement("h2");
        titulo.textContent = "¡Pedido realizado con éxito!";
        respuesta.appendChild(titulo);
        const ul = document.createElement("ul");
        const datos = [`Nombre: ${n}`,`Apellido: ${a}`,`Email: ${e}`,`Teléfono (WhatsApp): ${tel.value.trim()}`,"Pedido:"];
        datos.forEach(d => {
            const li = document.createElement("li");
            li.textContent = d;
            ul.appendChild(li);
        });
        pedido.forEach(p => {
            const li = document.createElement("li");
            li.textContent = p;
            ul.appendChild(li);
        });
        respuesta.appendChild(ul);
        const mensaje = document.createElement("p");
        mensaje.textContent = "!Gracias por elegir Che Bakery! Nos pondremos en contacto con vos por WhatsApp para coordinar el pago y la entrega de tu pedido.";
        respuesta.appendChild(mensaje);
        form.reset();
    }
});