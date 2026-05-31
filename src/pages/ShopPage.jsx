import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./css/ShopPage.css";

const WOMENS_CATEGORIES = [
  "womens-dresses",
  "womens-bags",
  "womens-jewellery",
  "womens-shoes",
];

const CATEGORY_LABELS = {
  "womens-dresses": "Dresses",
  "womens-bags": "Bags",
  "womens-jewellery": "Jewellery",
  "womens-shoes": "Shoes",
};

const ShopPage = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [inputValues, setInputValues] = useState({});
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    Promise.all(
      WOMENS_CATEGORIES.map((cat) =>
        fetch(`https://dummyjson.com/products/category/${cat}`)
          .then((res) => res.json())
          .then((data) => ({ cat, products: data.products })),
      ),
    ).then((results) => {
      const byCategory = {};
      const allProducts = [];
      results.forEach(({ cat, products }) => {
        byCategory[cat] = products;
        allProducts.push(...products);
      });
      setProductsByCategory(byCategory);
      setQuantities(Object.fromEntries(allProducts.map((p) => [p.id, 1])));
      setInputValues(Object.fromEntries(allProducts.map((p) => [p.id, "1"])));
      setLoading(false);
    });
  }, []);

  const updateQuantity = (id, value) => {
    const parsed = parseInt(value, 10);
    const clamped = isNaN(parsed) || parsed < 1 ? 1 : parsed;
    setQuantities((prev) => ({ ...prev, [id]: clamped }));
    setInputValues((prev) => ({ ...prev, [id]: String(clamped) }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="shop-page">
      {WOMENS_CATEGORIES.map((cat) => (
        <section key={cat} className="category-section">
          <h2 className="category-title">{CATEGORY_LABELS[cat]}</h2>
          <div className="shop-scroller">
            {(productsByCategory[cat] ?? []).map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <div className="product-tab-panel">
                  <div className="quantity-buttons">
                    <button
                      onClick={() =>
                        updateQuantity(
                          product.id,
                          (quantities[product.id] || 1) - 1,
                        )
                      }
                      className="decrement"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={inputValues[product.id] ?? "1"}
                      onChange={(e) =>
                        setInputValues((prev) => ({
                          ...prev,
                          [product.id]: e.target.value,
                        }))
                      }
                      onBlur={(e) => updateQuantity(product.id, e.target.value)}
                      onFocus={() => {
                        if (inputValues[product.id] === "1") {
                          setInputValues((prev) => ({
                            ...prev,
                            [product.id]: "",
                          }));
                        }
                      }}
                    />
                    <button
                      onClick={() =>
                        updateQuantity(
                          product.id,
                          (quantities[product.id] || 1) + 1,
                        )
                      }
                      className="increment"
                    >
                      +
                    </button>
                  </div>
                  <div className="addtocart">
                    <button
                      className="addtocart-btn"
                      onClick={() => {
                        addToCart(product.id, quantities[product.id] || 1);
                        setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
                        setInputValues((prev) => ({
                          ...prev,
                          [product.id]: "1",
                        }));
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ShopPage;
