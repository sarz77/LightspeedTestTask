let maxParts = 5;

function showMessage(text, color = "blue", targetElement = "log-message") {
  let messageBox = document.getElementById(targetElement);
  messageBox.innerText = ""; // Clear any previous message
  messageBox.innerText = text; // Set the new message
  messageBox.style.color = color;
}

function updateCartState() {
  Ecwid.Cart.get(function (cart) {
    let cartTableBody = document.getElementById("cart-table-body");
    cartTableBody.innerHTML = ""; // Clear table before updating

    cart.items.forEach((item, index) => {
      // Ensure you pass the index here
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.product.name}</td>
        <td>${item.quantity}</td>
        <td><button class="delete-btn" data-index="${index}">Удалить</button></td>
      `;
      cartTableBody.appendChild(row);

      // Add event listener for the "Delete" button
      row.querySelector(".delete-btn").addEventListener("click", function () {
        Ecwid.Cart.removeProduct(index, function (success, error) {
          if (success) {
            // Show success message when all items are removed
            showMessage("Товар удален.", "green", "product-message");
          } else {
            // Show error message in case of failure
            console.error("Failed to delete items. Error: " + error);
            alert("Не удалось удалить товары.");
          }
          updateCartState(); // Re-update the cart state to reflect changes
        });
      });
    });

    let carContainer = document.getElementById("car-container");

    // Check if the car is fully built
    if (cart.items.length >= maxParts) {
      carContainer.style.display = "none"; // Hide car-container

      showMessage(
        "Поздравляем! Вы собрали автомобиль! 🎉",
        "green",
        "log-message"
      );
    } else {
      carContainer.style.display = "block"; // Show car-container
      showMessage(
        `В корзине ${cart.items.length} деталей. Осталось добавить ${
          maxParts - cart.items.length
        }.`,
        "blue",
        "log-message"
      );
    }
  });
}

document.querySelectorAll(".clickable-area").forEach((part) => {
  part.addEventListener("click", async function () {
    const productId = this.getAttribute("data-product-id");

    // Get current cart and check if the part is already added
    Ecwid.Cart.get(async function (cart) {
      let isAlreadyInCart = cart.items.some(
        (item) => item.product.id == productId
      );

      if (isAlreadyInCart) {
        showMessage(`Товар уже добавлен! 🚗`, "red", "product-message");
        return;
      }

      if (cart.items.length < maxParts) {
        // Use async to add product to cart and wait for it to be added
        try {
          await new Promise((resolve, reject) => {
            Ecwid.Cart.addProduct({ id: productId, quantity: 1 }, function () {
              resolve(); // Resolve when product is added
            });

            showMessage(
              `Товар добавлен в корзину! 🛒`,
              "green",
              "product-message"
            );
            updateCartState(); // Refresh the table with updated cart state
          });

          // Get the updated cart and update the UI
        } catch (error) {
          console.error("Error adding product to cart:", error);
        }
      }
    });
  });
});
document
  .getElementById("deleteAllItemsButton")
  .addEventListener("click", function () {
    Ecwid.Cart.clear(function (success, error) {
      if (success) {
        showMessage(
          `Все товары были удалены из корзины.`,
          "green",
          "product-message"
        );
      } else {
        console.error("Failed to delete items. Error: " + error);
        alert("Failed to delete items.");
      }
    });
  });
Ecwid.OnCartChanged.add(updateCartState);
// Run on page load to sync the UI with existing cart items
updateCartState();
