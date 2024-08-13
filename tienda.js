// Variables para almacenar los productos seleccionados y el monto total
var selectedProducts = [];
var totalAmount = 0;

// Obtener todos los botones de "AÑADIR AL CARRITO"
var buttons = document.querySelectorAll('.boton_añadir_carrito');

// Recorrer cada botón y agregar un evento de clic a cada uno
buttons.forEach(function(button) {
    button.addEventListener('click', addToCart);
});

// Función para agregar un producto al carrito
function addToCart(event) {
    // Obtener el elemento del botón clickeado
    var button = event.target;

    // Obtener el contenedor del producto
    var product = button.closest('.card');

    // Obtener el nombre, precio y talla del producto
    var productName = product.querySelector('.PRENDA').innerText;
    var productPrice = parseFloat(product.querySelector('.precio').innerText.replace('$', ''));
    var productSize = product.querySelector('select').value; // Obtener la talla seleccionada

    // Crear un nuevo elemento para el producto en el carrito
    var cartItem = document.createElement('div');
    cartItem.innerText = `${productName} - Talla: ${productSize} - $${productPrice.toFixed(2)}`;

    // Agregar el producto al contenedor del carrito
    var cartItems = document.getElementById('cart-items');
    cartItems.appendChild(cartItem);

    // Agregar el producto a la lista de productos seleccionados
    selectedProducts.push({ name: productName, price: productPrice, size: productSize });

    // Calcular el nuevo precio total del carrito
    updateCartTotal();
}

// Función para calcular y actualizar el precio total del carrito
function updateCartTotal() {
    // Inicializar el precio total del carrito
    totalAmount = selectedProducts.reduce((total, product) => total + product.price, 0);

    // Mostrar el precio total en el contenedor correspondiente
    var cartTotal = document.getElementById('cart-total');
    cartTotal.innerText = `Total: $${totalAmount.toFixed(2)}`;
}

// Función para realizar la compra
function purchase() {
    // Construir el mensaje con todos los productos y el monto total
    var message = "¡Gracias por tu compra!\n\nProductos seleccionados:\n";
    selectedProducts.forEach(function(product, index) {
        message += `${index + 1}. ${product.name} - Talla: ${product.size} - $${product.price.toFixed(2)}\n`;
    });
    message += `\nMonto total: $${totalAmount.toFixed(2)}`;

    // Crear el enlace de WhatsApp con el mensaje concatenado
    var whatsappUrl = `https://api.whatsapp.com/send?phone=5491166212002&text=${encodeURIComponent(message)}`;

    // Redirigir al usuario al enlace de WhatsApp
    window.open(whatsappUrl, '_blank');

    // Vaciar el carrito después de la compra
    clearCart();
}

// Función para vaciar el carrito
function clearCart() {
    // Obtener el contenedor de los productos en el carrito
    var cartItems = document.getElementById('cart-items');

    // Vaciar el contenedor de los productos
    cartItems.innerHTML = '';

    // Vaciar la lista de productos seleccionados
    selectedProducts = [];

    // Actualizar el precio total del carrito (que ahora será cero)
    updateCartTotal();
}

// Agregar evento al botón de realizar compra
document.querySelector('.boton_carrito_compra').addEventListener('click', purchase);