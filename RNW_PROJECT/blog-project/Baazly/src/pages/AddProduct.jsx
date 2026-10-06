import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/productApi";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { readFileAsDataURL } from "../utils/imageUtils";

export default function AddProduct() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isAdmin, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAdmin) {
      toast.error("Access denied. Only administrators can add products.");
      navigate("/shop", { replace: true });
    }
  }, [isAdmin, loading, navigate, toast]);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    shortDesc: "",
    fullDesc: ""
  });

  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleMainImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      readFileAsDataURL(file).then(setMainImagePreview);
    } else {
      setMainImageFile(null);
      setMainImagePreview("");
    }
  }

  function handleGalleryImagesChange(e) {
    const files = Array.from(e.target.files || []);
    setGalleryFiles(files);
    Promise.all(files.map(readFileAsDataURL)).then(setGalleryPreviews);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!mainImageFile) {
      toast.error("Please select a main product image");
      return;
    }

    setIsSubmitting(true);

    try {
      const mainImageUrl = await readFileAsDataURL(mainImageFile);
      const galleryUrls = await Promise.all(galleryFiles.map(readFileAsDataURL));

      const newProduct = {
        id: "p" + Date.now(),
        name: formData.name.trim(),
        category: formData.category,
        brand: formData.brand.trim(),
        price: Number(formData.price),
        stock: Number(formData.stock),
        shortDesc: formData.shortDesc.trim(),
        fullDesc: formData.fullDesc.trim(),
        image: mainImageUrl,
        gallery: galleryUrls
      };

      await createProduct(newProduct);

      toast.success("Product added to catalog successfully!");
      navigate("/shop");
    } catch (err) {
      console.error("Error saving product:", err);
      toast.error("Unable to save product. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-top">
        <h1>Add New Product</h1>
      </section>

      <section className="form-section">
        <form id="productForm" className="product-form" onSubmit={handleSubmit} style={{ margin: "0 auto", maxWidth: "800px" }}>
          <div className="form-row">
            <div>
              <label htmlFor="pname">Product Name</label>
              <input
                type="text"
                id="pname"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
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
              <label htmlFor="category">Category</label>
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select category</option>
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
              <label htmlFor="price">Price (Rs.)</label>
              <input
                type="number"
                id="price"
                min="1"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="stock">Stock Quantity</label>
              <input
                type="number"
                id="stock"
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
            <label htmlFor="shortDesc">Short Description</label>
            <input
              type="text"
              id="shortDesc"
              required
              value={formData.shortDesc}
              onChange={(e) =>
                setFormData({ ...formData, shortDesc: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="fullDesc">Full Description</label>
            <textarea
              id="fullDesc"
              rows="5"
              required
              value={formData.fullDesc}
              onChange={(e) =>
                setFormData({ ...formData, fullDesc: e.target.value })
              }
            ></textarea>
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="pimage">
                Main Image <span style={{ color: "#9a2948" }}>*</span>
              </label>
              <input
                type="file"
                id="pimage"
                accept="image/*"
                required
                onChange={handleMainImageChange}
              />
              <div id="prevMain" className="img-preview">
                {mainImagePreview && (
                  <img
                    src={mainImagePreview}
                    alt="Main Preview"
                    style={{
                      width: "80px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      margin: "6px 6px 0 0"
                    }}
                  />
                )}
              </div>
            </div>
            <div>
              <label htmlFor="pgallery">Gallery Images</label>
              <input
                type="file"
                id="pgallery"
                accept="image/*"
                multiple
                onChange={handleGalleryImagesChange}
              />
              <div
                id="prevGallery"
                className="img-preview"
                style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
              >
                {galleryPreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Gallery Preview ${index + 1}`}
                    style={{
                      width: "80px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginTop: "6px"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="btn" disabled={isSubmitting}>
            <i className="fa-solid fa-floppy-disk"></i>{" "}
            {isSubmitting ? "Saving..." : "Save Product"}
          </button>
        </form>
      </section>
    </>
  );
}
