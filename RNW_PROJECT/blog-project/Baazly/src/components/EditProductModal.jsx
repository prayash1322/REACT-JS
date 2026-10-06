import React, { useState, useEffect } from "react";
import { readFileAsDataURL } from "../utils/imageUtils";

export default function EditProductModal({ product, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "Electronics",
    price: "",
    stock: "",
    shortDesc: "",
    fullDesc: "",
    image: ""
  });
  const [newImageFile, setNewImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        category: product.category || "Electronics",
        price: product.price ?? "",
        stock: product.stock ?? "",
        shortDesc: product.shortDesc || "",
        fullDesc: product.fullDesc || "",
        image: product.image || ""
      });
      setPreviewImage(product.image || "");
      setNewImageFile(null);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      const url = await readFileAsDataURL(file);
      setPreviewImage(url);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updated = {
      ...product,
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      shortDesc: formData.shortDesc.trim(),
      fullDesc: formData.fullDesc.trim(),
      image: previewImage || product.image
    };

    onSave(updated);
  }

  return (
    <div
      id="editModal"
      className="modal show"
      onClick={(e) => {
        if (e.target.id === "editModal") onClose();
      }}
    >
      <div className="modal-box">
        <button
          type="button"
          id="closeModal"
          className="modal-close"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2>Edit Product</h2>

        <form id="editForm" className="product-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label htmlFor="editName">Product Name</label>
              <input
                type="text"
                id="editName"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="editBrand">Brand</label>
              <input
                type="text"
                id="editBrand"
                required
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="editCategory">Category</label>
              <select
                id="editCategory"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Beauty">Beauty</option>
                <option value="Fashion">Fashion</option>
                <option value="Books">Books</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="editPrice">Price (Rs.)</label>
              <input
                type="number"
                id="editPrice"
                min="1"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="editStock">Stock</label>
              <input
                type="number"
                id="editStock"
                min="0"
                required
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="editShort">Short Description</label>
            <input
              type="text"
              id="editShort"
              required
              value={formData.shortDesc}
              onChange={(e) =>
                setFormData({ ...formData, shortDesc: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="editFull">Full Description</label>
            <textarea
              id="editFull"
              rows="4"
              required
              value={formData.fullDesc}
              onChange={(e) =>
                setFormData({ ...formData, fullDesc: e.target.value })
              }
            ></textarea>
          </div>

          <div>
            <label htmlFor="editImage">Change Image</label>
            <input
              type="file"
              id="editImage"
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewImage && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{
                    width: "80px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "4px"
                  }}
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn">
            <i className="fa-solid fa-floppy-disk"></i> Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
