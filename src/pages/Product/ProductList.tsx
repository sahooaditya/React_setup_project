import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import { clearFilters, setFilter } from "../../features/product/productSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./product-list.css";

const ProductList = () => {
  const { categoryId = "" } = useParams();
  const dispatch = useAppDispatch();
  const { categoryCards, products, filters } = useAppSelector((state) => state.product);
  const category = categoryCards.find((item) => item.id === categoryId);
  const activeCategory = filters.category || categoryId;
  const categoryProducts = products.filter((item) => item.categoryId === activeCategory);

  const brands = Array.from(new Set(categoryProducts.map((item) => item.brand))).sort();
  const colors = Array.from(new Set(categoryProducts.map((item) => item.color))).sort();

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((item) => {
      const minPrice = filters.minPrice ? Number(filters.minPrice) : 0;
      const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : Infinity;
      const minRating = filters.rating ? Number(filters.rating) : 0;

      return (
        item.price >= minPrice &&
        item.price <= maxPrice &&
        item.rating >= minRating &&
        (!filters.brand || item.brand === filters.brand) &&
        (!filters.color || item.color === filters.color)
      );
    });
  }, [categoryProducts, filters]);

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <Breadcrumb
          items={[{ label: "Home", path: "/" }, { label: "Product", path: "/product" }, { label: category?.title || "Products" }]}
        />
        <h1>{category?.title || "Products"}</h1>
        <p>{filteredProducts.length} products available from JSON data</p>
      </section>

      <section className="catalog-layout">
        <aside className="filter-sidebar">
          <div className="filter-title">
            <h2>Filter</h2>
            <button onClick={() => dispatch(clearFilters())}>Clear</button>
          </div>

          <label>
            Category
            <select
              value={activeCategory}
              onChange={(event) => dispatch(setFilter({ key: "category", value: event.target.value }))}
            >
              {categoryCards.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Min Price
            <input
              type="number"
              value={filters.minPrice}
              placeholder="0"
              onChange={(event) => dispatch(setFilter({ key: "minPrice", value: event.target.value }))}
            />
          </label>

          <label>
            Max Price
            <input
              type="number"
              value={filters.maxPrice}
              placeholder="6000"
              onChange={(event) => dispatch(setFilter({ key: "maxPrice", value: event.target.value }))}
            />
          </label>

          <label>
            Rating
            <select
              value={filters.rating}
              onChange={(event) => dispatch(setFilter({ key: "rating", value: event.target.value }))}
            >
              <option value="">All ratings</option>
              <option value="4">4 star & up</option>
              <option value="4.5">4.5 star & up</option>
              <option value="4.8">4.8 star & up</option>
            </select>
          </label>

          <label>
            Brand
            <select
              value={filters.brand}
              onChange={(event) => dispatch(setFilter({ key: "brand", value: event.target.value }))}
            >
              <option value="">All brands</option>
              {brands.map((brand) => (
                <option value={brand} key={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </label>

          <label>
            Color
            <select
              value={filters.color}
              onChange={(event) => dispatch(setFilter({ key: "color", value: event.target.value }))}
            >
              <option value="">All colors</option>
              {colors.map((color) => (
                <option value={color} key={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>
        </aside>

        <div className="catalog-grid">
          {filteredProducts.map((product) => (
            <Link to={`/product/details/${product.id}`} className="catalog-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div>
                <span>{product.brand}</span>
                <h2>{product.name}</h2>
                <p>{product.color} | {product.rating} star</p>
                <strong>Rs. {product.price}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductList;
