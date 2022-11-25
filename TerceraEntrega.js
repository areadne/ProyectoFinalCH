axios
  .get("./productos.json")
  .then((response) => response)
  .then((productosImportados) => {
    let productos = productosImportados.data;

    let ingresarPrecio = document.getElementById("precio");
    let ingresarStock = document.getElementById("stock");
    let botonStock = document.getElementById("botonStock");
    let botonActualizarPrecio = document.getElementById(
      "botonActualizarPrecio"
    );
    let contenedorMenu = document.getElementById("menu");
    let contenerdorTabla = document.getElementById("contenedorTabla");
    let botonConsultar = document.getElementById("botonConsultar");
    let contenedorBotonConsultar = document.getElementById(
      "contenedorBotonConsultar"
    );

    const productosIngresadosPorUsuario = [];

    //----- Inicio: Creación de menú de opciones -----//

    const arrayDeProductos = [];

    for (const producto of productos) {
      arrayDeProductos.push(producto.producto);
    }

    let menu = document.createElement("select");
    menu.id = "producto";
    menu.innerHTML = `
      <option>${arrayDeProductos[0]}</option>
      <option>${arrayDeProductos[1]}</option>
      <option>${arrayDeProductos[2]}</option>
      <option>${arrayDeProductos[3]}</option>
      <option>${arrayDeProductos[4]}</option>
      <option>${arrayDeProductos[5]}</option>
      <option>${arrayDeProductos[6]}</option>
      <option>${arrayDeProductos[7]}</option>
      <option>${arrayDeProductos[8]}</option>
      <option>${arrayDeProductos[9]}</option>
      <option>${arrayDeProductos[10]}</option>
      <option>${arrayDeProductos[11]}</option>
      <option>${arrayDeProductos[12]}</option>
      <option>${arrayDeProductos[13]}</option>
      <option>${arrayDeProductos[14]}</option>
      <option>${arrayDeProductos[15]}</option>`;
    contenedorMenu.append(menu);

    //----- Fin: Creación de menú de opciones -----//

    botonConsultar.onclick = () => {
      botonConsultarDatos();
    };

    let tablaConsultar = document.createElement("table");
    tablaConsultar.id = "TablaConsultar";

    function botonConsultarDatos() {
      for (const producto of productos) {
        if (menu.value == producto.producto) {
          tablaConsultar.innerHTML = `
                      <tbody>
                      <tr>
                      <th>${"Producto"}</th>
                      <th>${"Precio"}</th>
                      <th>${"Stock"}</th>
                  </tr>
                      <tr>
                      <td>${producto.producto}</td>
                      <td>${producto.precio}</td>
                      <td>${producto.stock}</td>
                      </tr>
                      </tbody>`;
        }
      }
      contenedorBotonConsultar.append(tablaConsultar);
    }

    //----- Inicio: traer información del LS -----//

    let datosEnLS = JSON.parse(localStorage.getItem("datos"));
    let contenedorTablaLS = document.getElementById("contenedorTablaLS");

    if (datosEnLS) {
      console.log(datosEnLS);

      for (const item of datosEnLS) {
        let tablaLS = document.createElement("table");
        tablaLS.id = "TablaLS";

        tablaLS.innerHTML = `
        <tbody>
        <tr>
        <td>${item.producto}</td>
        <td>${item.precio}</td>
        <td>${item.stock}</td>
        </tr>
        </tbody>`;
        contenedorTablaLS.append(tablaLS);
      }
    }

    // ----- Fin: traer información del LS -----//

    botonStock.onclick = () => {
      ingresarProductoNuevo();
      guardarEnLS();
    };

    function ingresarProductoNuevo() {
      for (const producto of productos) {
        if (menu.value == producto.producto) {
          let sumaDeStock = producto.stock + Number(ingresarStock.value);
          producto.stock = sumaDeStock;

          let tabla = document.createElement("table");
          tabla.id = "tabla";

          tabla.innerHTML = `
      <tbody>
      <tr>
      <td>${menu.value}</td>
      <td>${producto.precio}</td>
      <td>${producto.stock}</td>
      </tr>
      </tbody>
      `;

          contenerdorTabla.append(tabla);

          productosIngresadosPorUsuario.push({
            producto: menu.value,
            precio: producto.precio,
            stock: producto.stock,
          });
        }
      }
    }

    botonActualizarPrecio.onclick = () => {
      actualizarPrecio();
      guardarEnLS();
    };

    function actualizarPrecio() {
      for (const producto of productos) {
        if (menu.value == producto.producto) {
          producto.precio = Number(ingresarPrecio.value);

          let tabla = document.createElement("table");
          tabla.id = "tablaPrecio";

          tabla.innerHTML = `
              <tbody>
              <tr>
              <td>${menu.value}</td>
              <td>${producto.precio}</td>
              <td>${producto.stock}</td>
              </tr>
              </tbody>
              `;

          contenerdorTabla.append(tabla);

          productosIngresadosPorUsuario.push({
            producto: menu.value,
            precio: producto.precio,
            stock: producto.stock,
          });
        }
      }
    }

    function guardarEnLS() {
      let enviarProductoLSJSON = JSON.stringify(productosIngresadosPorUsuario);

      localStorage.setItem("datos", enviarProductoLSJSON);
    }
  });
