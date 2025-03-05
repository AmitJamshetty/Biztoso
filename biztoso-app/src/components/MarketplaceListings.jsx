import { useState } from "react";

const MarketplaceListings = () => {
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", images: [] });
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!form.title.trim()) errors.title = "Title is required";
    if (!form.price.trim()) errors.price = "Price is required";
    if (isNaN(form.price) || Number(form.price) <= 0)
      errors.price = "Enter a valid numeric price";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: [...form.images, ...files] });
  };

  const handleRemoveImage = (index) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingIndex !== null) {
      const updatedListings = [...listings];
      updatedListings[editingIndex] = form;
      setListings(updatedListings);
      setEditingIndex(null);
    } else {
      setListings([...listings, form]);
    }

    setForm({ title: "", price: "", images: [] });
    setErrors({});
  };

  const handleEdit = (index) => {
    setForm(listings[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setListings(listings.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Marketplace Listings 🛒</h2>
      <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          className="w-full p-2 border rounded"
        />
        <div className="flex space-x-2 mt-2">
          {form.images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(img)}
                alt="Preview"
                className="w-16 h-16 object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingIndex !== null ? "Update" : "Create"} Listing
        </button>
      </form>

      <div className="mt-6">
        {listings.map((listing, index) => (
          <div key={index} className="p-4 border rounded mb-2">
            <h3 className="font-semibold">{listing.title}</h3>
            <p>Price: ${listing.price}</p>
            <div className="flex space-x-2 mt-2">
              {listing.images.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  alt="Preview"
                  className="w-16 h-16 object-cover"
                />
              ))}
            </div>
            <button
              onClick={() => handleEdit(index)}
              className="text-blue-500 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceListings;