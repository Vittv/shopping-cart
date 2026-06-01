import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
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
  const [collapsed, setCollapsed] = useState({});
  const { addToCart, cart } = useCart();

  useEffect(() => {
    Promise.all(
      WOMENS_CATEGORIES.map((cat) =>
        fetch(`https://dummyjson.com/products/category/${cat}`)
          .then((res) => res.json())
          .then((data) => ({ cat, products: data.products }))
          .catch(() => ({ cat, products: [] })),
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

  const toggleCategory = (cat) => {
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="shop-page">
      <div className="category-nav">
        {WOMENS_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className="category-nav-btn"
            onClick={() => {
              const el = document.getElementById(cat);
              const navbar = document.querySelector(".navbar");
              const offset = navbar ? navbar.offsetHeight : 0;
              const top =
                el.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top, behavior: "smooth" });
            }}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>
      {WOMENS_CATEGORIES.map((cat) => (
        <section key={cat} id={cat} className="category-section">
          <div className="category-header" onClick={() => toggleCategory(cat)}>
            <h2 className="category-title">
              <FontAwesomeIcon
                icon={collapsed[cat] ? faChevronRight : faChevronDown}
                style={{ fontSize: "0.75rem" }}
              />
              {CATEGORY_LABELS[cat]}
            </h2>
          </div>
          {!collapsed[cat] && (
            <div className="product-grid">
              {(productsByCategory[cat] ?? []).map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-img-wrapper">
                    <img src={product.thumbnail} alt={product.title} />
                  </div>
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p className="product-price">${product.price}</p>
                  </div>
                  <div className="product-actions">
                    <div className="quantity-buttons">
                      <button
                        className="decrement"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            (quantities[product.id] || 1) - 1,
                          )
                        }
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
                        onBlur={(e) =>
                          updateQuantity(product.id, e.target.value)
                        }
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
                        className="increment"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            (quantities[product.id] || 1) + 1,
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="addtocart-btn"
                      onClick={() => {
                        addToCart(product, quantities[product.id] || 1);
                        setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
                        setInputValues((prev) => ({
                          ...prev,
                          [product.id]: "1",
                        }));
                      }}
                    >
                      Add to cart
                      {cart[product.id]
                        ? ` (${cart[product.id].quantity})`
                        : ""}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default ShopPage;
