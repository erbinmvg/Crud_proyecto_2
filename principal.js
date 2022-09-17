let botonAgregar = document.getElementById('agregar')
botonAgregar.addEventListener('click', (evento) => agregarProducto(evento))

let botonActualizar = document.getElementById('actualizar')
botonActualizar.addEventListener('click', (evento) => actualizarProducto(evento))

let codigo = document.getElementById('codigo-producto')
let descripcion = document.getElementById('descripcion')
let precio = document.getElementById('precio')

let contenedor = document.getElementById('productos')

let productos = []

function agregarProducto(e) {
  e.preventDefault()

  const producto = {
    codigo: codigo.value, 
    descripcion: descripcion.value,
    precio: precio.value,
  }


  if (codigo.value>0){
        let pos = productos.findIndex(producto=> producto.codigo == codigo.value);
        if (pos>=0){
            alert("Producto ya existe")
            limpiarInput()
        }else{
            if (precio.value>0){
                  productos.push(producto)
                  guardarEnLS()
                  mostrarProductos()
                  limpiarInput()
            }else{
                  alert('Como precio solo se aceptan valores numéricos, y no puede quedar en 0')
            }  
            
        }
  }else{
      alert("En código de producto debe ingresar solo valores numéricos");
      limpiarInput()
  }
}

function limpiarInput() {
  codigo.value = ''
  descripcion.value = ''
  precio.value = ''
}

function editarProducto(boton, codigoProducto) {
  botonAgregar.style.display = 'none'
  botonActualizar.style.display = 'block'

  let productoEnEdicion = productos.find((producto) => producto.codigo === codigoProducto)

  codigo.value = productoEnEdicion.codigo
  descripcion.value = productoEnEdicion.descripcion
  precio.value = productoEnEdicion.precio
  codigo.setAttribute('disabled', true)
}

function eliminarProducto(boton, codigo) {
  alert("Confirma eliminación del producto?",)
  boton.parentElement.parentElement.remove()
  productos = productos.filter((producto) => producto.codigo !== codigo)
  guardarEnLS()
}

function leerProductos() {
  let productosEnLS = window.localStorage.getItem('productos')


  productos = JSON.parse(productosEnLS) || []
  mostrarProductos()
}

function mostrarProductos() {
  contenedor.innerHTML = ''
  productos.forEach((producto) => {
    contenedor.innerHTML += `
            <article>
                <div class=col-2>
                    <th>${producto.codigo}</th>
                </div> 
                <div class=col-4>  
                    <td>${producto.descripcion}</td>
                </div>
                <div class=col-4>
                    <td>${producto.precio}</td>
                </div>
               
                <div>
                    <button onclick="editarProducto(this, '${producto.codigo}' )" class="btn btn-outline-warning">Editar</button>
                    <button onclick="eliminarProducto(this, '${producto.codigo}' )" class="btn btn-outline-danger">Borrar</button>
                </div>
            </article>
      `
  })
}

function guardarEnLS() {
  let arrayConvertidoAString = JSON.stringify(productos)
  window.localStorage.setItem('productos', arrayConvertidoAString)
}

function actualizarProducto(evento) {
  evento.preventDefault()
  let codigoProducto = codigo.value
  let nuevoDescripcion = descripcion.value
  let nuevaPrecio = precio.value

  productos = productos.map((producto) => {
    if (producto.codigo === codigoProducto) {
      return {
        codigo: codigoProducto,
        descripcion: nuevoDescripcion,
        precio: nuevaPrecio,
      }
    } else {
      return producto
    }
  })

 
  limpiarInput()

  botonAgregar.style.display = 'block'
 
  botonActualizar.style.display = 'none'
  
  codigo.removeAttribute('disabled')
  
  guardarEnLS()

  mostrarProductos()
}

leerProductos()
