# README: Car Assembly Interactive Webpage

## Task Overview

The goal of this project was to create an interactive HTML page featuring a schematic image of a car. Clicking on different parts of the car adds corresponding products to the shopping cart. Once all required parts (maximum of 5) are added, the car image is replaced with a message stating that the car has been fully assembled.

## Tools and Technologies Used

### 1. **Image Map Generator**

- Used to create clickable areas on the car image. [image-map](https://www.fla-shop.com/image-map/)

### 2. **Image Map Resizer**

- Library from GitHub: [image-map-resizer](https://github.com/davidjbradshaw/image-map-resizer)
- Ensures the clickable areas remain relative to the image size.
- Implemented in `imageMapResizer.js`.

### 3. **Ecwid API for Cart Management**

- Documentation: [Ecwid API Docs](https://api-docs.ecwid.com/reference/methods-for-cart-management#ecwidcartaddproduct)
- Methods used:
  - `Ecwid.Cart.addProduct()`: Adds products to the cart when a user clicks on a car part.
  - `Ecwid.Cart.getCart()`: Retrieves the current cart state to check the number of items.
  - `Ecwid.Cart.removeProduct()`: Allows users to remove products from the cart.
  - `Ecwid.Cart.clear()`: Clears the entire cart.

### 4. **Ecwid Widget for Shopping Cart**

- Source: [Ecwid Widget Documentation](https://support.ecwid.com/hc/en-us/articles/360000968360-Adding-Ecwid-widgets-to-a-custom-site)
- Important note: The video guide provided in the source is outdated, and the actual implementation differs from the documented approach.

## Project Files

### 1. **HTML Files**

- `index.html`: Main webpage structure, includes the image map, Ecwid widget integration, and JavaScript references.
- `guide.html`: Provides implementation details displayed dynamically on the webpage.

### 2. **CSS Files**

- `styles.css`: Styles for the main webpage.
- `guide.css`: Styles for the guide section.

### 3. **JavaScript Files**

- `script.js`: Handles user interactions, cart management, and dynamic UI updates.
- `imageMapResizer.js`: Ensures image map areas adjust correctly with the image size.

## Functionality Overview

1. Clicking on different car parts triggers `Ecwid.Cart.addProduct()` to add corresponding products.
2. The script checks if the cart contains 5 items. If true, the car image is replaced with a completion message.
3. The cart is dynamically updated using `Ecwid.Cart.getCart()`.
4. Users can remove individual items (`Ecwid.Cart.removeProduct()`) or clear the cart (`Ecwid.Cart.clear()`).
5. The `image-map-resizer` script ensures interactive areas remain aligned regardless of screen size.
6. A dynamically loaded guide (`guide.html`) explains the implementation.

## Notes

- The implementation follows modern web development standards.
- Some referenced sources (e.g., Ecwid Widget documentation) contain outdated information.
- The project ensures smooth interaction with Ecwid's shopping cart API and dynamically updates the UI based on user actions.

## Conclusion

This project successfully integrates interactive image maps, an e-commerce API, and dynamic DOM manipulation to provide an engaging user experience. The implementation ensures smooth functionality using well-structured HTML, CSS, and JavaScript.
