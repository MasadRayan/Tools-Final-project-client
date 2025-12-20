import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { 
  FiPlus, 
  FiTrash2, 
  FiImage, 
  FiSave, 
  FiArrowLeft,
  FiPackage,
  FiDollarSign,
  FiFileText,
  FiSettings,
  FiDroplet
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const categories = [
  'Electronics',
  'Fashion',
  'Home & Living',
  'Sports & Outdoors',
  'Books',
  'Beauty & Personal Care',
  'Toys & Games',
  'Automotive',
  'Health & Wellness',
  'Food & Beverages'
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);

  const form = useForm({
    defaultValues: {
      name: '',
      category: '',
      images: [{ url: '', preview: '' }],
      price: '',
      discountedPrice: '',
      quantity: '',
      rating: '',
      shortDescription: '',
      description: '',
      specifications: [{ label: '', value: '' }],
      colors: ['#000000']
    }
  });

  const { register, control, handleSubmit, formState: { errors }, reset } = form;

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: 'images'
  });

  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
    control,
    name: 'specifications'
  });

  const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
    control,
    name: 'colors'
  });

  const handleImageChange = async (e, index) => {
    const image = e.target.files?.[0];

    if (!image) {
      return;
    }

    setUploadingIndex(index);

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      // Create preview from FileReader for immediate display
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result;
        // Store both the uploaded URL and preview
        form.setValue(`images.${index}`, { 
          url: res.data.secure_url, 
          preview 
        });
      };
      reader.readAsDataURL(image);

      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.log("Cloudinary Image Upload failed", error);
      toast.error('Image upload failed. Please try again.');
    } finally {
      setUploadingIndex(null);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Filter out images that don't have URLs (not uploaded)
      const uploadedImages = data.images.filter(img => img.url).map(img => img.url);
      
      if (uploadedImages.length === 0) {
        toast.error('Please upload at least one image');
        setIsSubmitting(false);
        return;
      }
      
      // Transform data to match backend structure
      const productData = {
        name: data.name,
        category: data.category,
        images: uploadedImages,
        colors: data.colors,
        price: parseFloat(data.price),
        discountedPrice: data.discountedPrice ? parseFloat(data.discountedPrice) : null,
        quantity: parseInt(data.quantity),
        rating: data.rating ? parseFloat(data.rating) : 0,
        shortDescription: data.shortDescription,
        description: data.description,
        specifications: data.specifications.filter(spec => spec.label && spec.value),
        id: Date.now().toString()
      };

      console.log('Product Data:', productData);
      
      // Send to your backend API
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(productData)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`${data.name} has been added to your inventory!`);
      
      reset();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="mb-4 flex items-center gap-2 text-accent hover:text-primary transition-colors"
            >
              <FiArrowLeft /> Back
            </button>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                <FiPackage className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-secondary">Add New Product</h1>
                <p className="text-accent mt-1">Fill in the details to add a new product to your store</p>
              </div>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h2 className="card-title text-xl flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FiFileText className="w-5 h-5 text-primary" />
                    </div>
                    Basic Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Product Name *</span>
                        </label>
                        <input 
                          type="text"
                          placeholder="e.g., Wireless Noise Cancelling Headphones"
                          className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                          {...register('name', { 
                            required: 'Product name is required',
                            minLength: { value: 3, message: 'Product name must be at least 3 characters' }
                          })}
                        />
                        {errors.name && (
                          <label className="label">
                            <span className="label-text-alt text-error">{errors.name.message}</span>
                          </label>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Category *</span>
                        </label>
                        <select 
                          className={`select select-bordered w-full ${errors.category ? 'select-error' : ''}`}
                          {...register('category', { required: 'Please select a category' })}
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <label className="label">
                            <span className="label-text-alt text-error">{errors.category.message}</span>
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Short Description *</span>
                      </label>
                      <textarea 
                        placeholder="Brief description of the product (max 200 characters)"
                        className={`textarea w-full textarea-bordered h-20 resize-none ${errors.shortDescription ? 'textarea-error' : ''}`}
                        {...register('shortDescription', { 
                          required: 'Short description is required',
                          minLength: { value: 10, message: 'Short description must be at least 10 characters' },
                          maxLength: { value: 200, message: 'Short description must be less than 200 characters' }
                        })}
                      />
                      {errors.shortDescription && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.shortDescription.message}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Full Description *</span>
                      </label>
                      <textarea 
                        placeholder="Detailed description of the product features, benefits, and specifications..."
                        className={`textarea w-full textarea-bordered h-40 resize-none ${errors.description ? 'textarea-error' : ''}`}
                        {...register('description', { 
                          required: 'Description is required',
                          minLength: { value: 50, message: 'Description must be at least 50 characters' }
                        })}
                      />
                      {errors.description && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.description.message}</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pricing & Inventory */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h2 className="card-title text-xl flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <FiDollarSign className="w-5 h-5 text-green-500" />
                    </div>
                    Pricing & Inventory
                  </h2>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Price ($) *</span>
                      </label>
                      <input 
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className={`input input-bordered w-full ${errors.price ? 'input-error' : ''}`}
                        {...register('price', { 
                          required: 'Price is required',
                          min: { value: 0.01, message: 'Price must be greater than 0' }
                        })}
                      />
                      {errors.price && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.price.message}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Discounted Price ($)</span>
                      </label>
                      <input 
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className={`input input-bordered w-full ${errors.discountedPrice ? 'input-error' : ''}`}
                        {...register('discountedPrice', { 
                          min: { value: 0, message: 'Discounted price cannot be negative' }
                        })}
                      />
                      {errors.discountedPrice && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.discountedPrice.message}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Quantity *</span>
                      </label>
                      <input 
                        type="number"
                        placeholder="0"
                        className={`input input-bordered w-full ${errors.quantity ? 'input-error' : ''}`}
                        {...register('quantity', { 
                          required: 'Quantity is required',
                          min: { value: 0, message: 'Quantity cannot be negative' }
                        })}
                      />
                      {errors.quantity && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.quantity.message}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Initial Rating (0-5)</span>
                      </label>
                      <input 
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        placeholder="0.0"
                        className={`input input-bordered w-full ${errors.rating ? 'input-error' : ''}`}
                        {...register('rating', { 
                          min: { value: 0, message: 'Rating cannot be negative' },
                          max: { value: 5, message: 'Rating must be between 0 and 5' }
                        })}
                      />
                      {errors.rating && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.rating.message}</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="card-title text-xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <FiImage className="w-5 h-5 text-blue-500" />
                      </div>
                      Product Images
                    </h2>
                    <button
                      type="button"
                      onClick={() => appendImage({ url: '', preview: '' })}
                      className="btn btn-outline btn-sm gap-2"
                    >
                      <FiPlus className="w-4 h-4" /> Add Image
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {imageFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-3 items-start"
                      >
                        <div className="form-control flex-1">
                          <input 
                            type="file"
                            accept="image/*"
                            className={`file-input file-input-bordered w-full ${errors.images?.[index]?.file ? 'file-input-error' : ''}`}
                            onChange={(e) => handleImageChange(e, index)}
                            disabled={uploadingIndex === index}
                          />
                          {uploadingIndex === index && (
                            <label className="label">
                              <span className="label-text-alt text-primary flex items-center gap-2">
                                <span className="loading loading-spinner loading-xs"></span>
                                Uploading...
                              </span>
                            </label>
                          )}
                          {errors.images?.[index]?.file && (
                            <label className="label">
                              <span className="label-text-alt text-error">{errors.images[index].file.message}</span>
                            </label>
                          )}
                        </div>
                        
                        {/* Image Preview */}
                        {field.preview && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-base-300">
                            <img 
                              src={field.preview} 
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        {imageFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="btn btn-outline btn-error btn-square"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="card-title text-xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        <FiSettings className="w-5 h-5 text-purple-500" />
                      </div>
                      Specifications
                    </h2>
                    <button
                      type="button"
                      onClick={() => appendSpec({ label: '', value: '' })}
                      className="btn btn-outline btn-sm gap-2"
                    >
                      <FiPlus className="w-4 h-4" /> Add Spec
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {specFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-3"
                      >
                        <div className="form-control flex-1">
                          <input 
                            type="text"
                            placeholder="Label (e.g., Battery Life)"
                            className={`input input-bordered w-full ${errors.specifications?.[index]?.label ? 'input-error' : ''}`}
                            {...register(`specifications.${index}.label`)}
                          />
                        </div>
                        <div className="form-control flex-1">
                          <input 
                            type="text"
                            placeholder="Value (e.g., 40 hours)"
                            className={`input input-bordered w-full ${errors.specifications?.[index]?.value ? 'input-error' : ''}`}
                            {...register(`specifications.${index}.value`)}
                          />
                        </div>
                        {specFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSpec(index)}
                            className="btn btn-outline btn-error btn-square"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Colors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="card-title text-xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                        <FiDroplet className="w-5 h-5 text-pink-500" />
                      </div>
                      Available Colors
                    </h2>
                    <button
                      type="button"
                      onClick={() => appendColor('#000000')}
                      className="btn btn-outline btn-sm gap-2"
                    >
                      <FiPlus className="w-4 h-4" /> Add Color
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {colorFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative"
                      >
                        <div className="form-control">
                          <label className="label cursor-pointer flex-col gap-2">
                            <div className="relative">
                              <input 
                                type="color"
                                className="w-20 h-20 rounded-xl cursor-pointer border-4 border-base-200 hover:border-primary transition-all"
                                {...register(`colors.${index}`)}
                              />
                              {colorFields.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeColor(index)}
                                  className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error"
                                >
                                  <FiTrash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <span className="label-text font-mono text-xs">
                              {form.watch(`colors.${index}`)}
                            </span>
                          </label>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-end"
            >
              <button
                type="button"
                onClick={() => reset()}
                className="btn btn-outline btn-lg"
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg gap-3"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Adding Product...
                  </>
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    Add Product
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;