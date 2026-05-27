import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./css/ShopPage.css";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValues, setInputValues] = useState({});
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/women's clothing")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // initialize every product at 0
        const initial = {};
        data.forEach((p) => (initial[p.id] = 0));
        setQuantities(initial);
        setInputValues(Object.fromEntries(data.map((p) => [p.id, "0"])));
        setLoading(false);
      });
  }, []);

  const updateQuantity = (id, value) => {
    const parsed = parseInt(value, 10);
    const clamped = isNaN(parsed) || parsed < 0 ? 0 : parsed;
    setQuantities((prev) => ({ ...prev, [id]: clamped }));
    setInputValues((prev) => ({ ...prev, [id]: String(clamped) }));
  };

  // quantify total quantity across all products for cart update
  const totalQuantity = Object.values(quantities).reduce(
    (sum, q) => sum + q,
    0,
  );
  if (loading) return <p>Loading...</p>;

  return (
    <div className="shop-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.price}</p>
          <div className="product-tab-panel">
            <div className="quantity-buttons">
              <button
                onClick={() =>
                  updateQuantity(product.id, (quantities[product.id] || 0) - 1)
                }
                className="decrement"
              >
                -
              </button>
              <input
                type="number"
                min="0"
                value={inputValues[product.id] ?? 0}
                onChange={(e) =>
                  setInputValues((prev) => ({
                    ...prev,
                    [product.id]: e.target.value,
                  }))
                }
                onBlur={(e) => updateQuantity(product.id, e.target.value)}
                // make 0 go away when we start typing
                onFocus={() => {
                  if (inputValues[product.id] === "0") {
                    setInputValues((prev) => ({ ...prev, [product.id]: "" }));
                  }
                }}
              />
              <button
                onClick={() =>
                  updateQuantity(product.id, (quantities[product.id] || 0) + 1)
                }
                className="increment"
              >
                +
              </button>
            </div>
            <div className="addtocart">
              <button
                className="addtocart"
                onClick={() => {
                  addToCart(product.id, quantities[product.id] || 0);
                  setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
                  setInputValues((prev) => ({ ...prev, [product.id]: "0" }));
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopPage;
