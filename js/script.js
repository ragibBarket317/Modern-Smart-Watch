let selectedColor = 'purple'
let selectedSize = { size: 'S', price: 69 }
let quantity = 1
let totalItemCount = 0

function handleImageLoad() {
  document.getElementById('image-placeholder').style.display = 'none'
  document.getElementById('product-image').classList.remove('opacity-0')
}

function changeThumbnail(color) {
  selectedColor = color
  document.getElementById(
    'product-image'
  ).src = `/images/${color.toLowerCase()}.png`
}

function selectColor(color) {
  selectedColor = color
  changeThumbnail(color.toLowerCase())
}

function selectSize(size, price) {
  selectedSize = { size, price }

  const sizeButtons = document.querySelectorAll('.wrist-size-button')
  sizeButtons.forEach((button) => button.classList.remove('selected-size'))

  const clickedButton = Array.from(sizeButtons).find((button) =>
    button.textContent.includes(size)
  )
  if (clickedButton) {
    clickedButton.classList.add('selected-size')
  }
}

function addToCart() {
  const cartItems = document.getElementById('cartItems')
  console.log('cartItems', cartItems)
  const totalPriceElement = document.getElementById('totalPrice')
  const floatingCheckout = document.getElementById('floatingCheckout')
  const cartItemCount = document.getElementById('cartItemCount')
  const totalQuantity = document.getElementById('totalQuantity')

  const itemPrice = selectedSize.price * quantity

  console.log(cartItems.children)

  // Check if the item with the same color and size already exists
  const existingRow = Array.from(cartItems.children).find((row) => {
    const colorCell = row.children[1].textContent.trim()
    const sizeCell = row.children[2].textContent.trim()
    return colorCell === selectedColor && sizeCell === selectedSize.size
  })

  if (existingRow) {
    // Update the quantity and price for the existing row
    const quantityCell = existingRow.children[3]
    const priceCell = existingRow.children[4]

    const existingQuantity = parseInt(quantityCell.textContent, 10)
    const newQuantity = existingQuantity + quantity

    quantityCell.textContent = newQuantity
    priceCell.textContent = `$${(newQuantity * selectedSize.price).toFixed(2)}`
  } else {
    // Create the <img> element dynamically
    const img = document.createElement('img')
    img.src = `/images/${selectedColor}.png`
    img.alt = 'smart watch'
    img.className = 'w-[36px] h-[36px] rounded-[3px]'

    // Add the image to the desired container
    const imgContainer = document.createElement('div')
    imgContainer.className = 'flex items-center space-x-2'
    imgContainer.appendChild(img)

    // Add the title for the item
    const title = document.createElement('h3')
    title.textContent = 'Classy Modern Smart Watch'
    title.className = 'text-[14px] text-[#364A63]'
    imgContainer.appendChild(title)

    // Add a new row for the item
    const totalItems = document.createElement('tr')
    totalItems.innerHTML = `
      <td class="border-b py-2">
        ${imgContainer.outerHTML}
      </td>
      <td class="border-b py-2 text-center text-[14px] text-[#364A63] capitalize">${selectedColor}</td>
      <td class="border-b py-2 text-center text-[14px] text-[#364A63] font-bold">${
        selectedSize.size
      }</td>
      <td class="border-b py-2 text-center text-[14px] text-[#364A63] font-bold">${quantity}</td>
      <td class="border-b py-2 text-end text-[14px] text-[#364A63] font-bold">$${itemPrice.toFixed(
        2
      )}</td>
    `
    cartItems.appendChild(totalItems)
  }

  // Update total price
  const currentTotal = Array.from(cartItems.children).reduce((total, row) => {
    const priceCell = row.children[4]
    const price = parseFloat(priceCell.textContent.replace('$', ''))
    return total + price
  }, 0)

  totalPriceElement.textContent = `$${currentTotal.toFixed(2)}`

  // Update floating checkout button
  totalItemCount += quantity
  cartItemCount.textContent = totalItemCount

  // Count total quantity
  totalQuantity.textContent = totalItemCount

  // Show floating checkout button
  floatingCheckout.classList.remove('hidden')
}

// Function to toggle cart modal
function toggleCartModal() {
  const modal = document.getElementById('cartModal')
  modal.classList.toggle('hidden')
}

// Quantity adjustment functionality
const quantityDisplay = document.getElementById('quantityDisplay')
const increaseButton = document.getElementById('increaseButton')
const decreaseButton = document.getElementById('decreaseButton')

increaseButton.addEventListener('click', () => {
  quantity++
  quantityDisplay.textContent = quantity
})

decreaseButton.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--
    quantityDisplay.textContent = quantity
  }
})

function initializeSize() {
  // Select the first size button
  const sizeButtons = document.querySelectorAll('.wrist-size-button')

  if (sizeButtons.length > 0) {
    const firstButton = sizeButtons[0]
    firstButton.classList.add('selected-size')
    const size = firstButton.querySelector('span').textContent.trim()
    const price = parseInt(firstButton.textContent.replace(/\D/g, ''), 10)
    selectedSize = { size, price }
  }
}

// Call initializeSize when the page loads
document.addEventListener('DOMContentLoaded', initializeSize)
