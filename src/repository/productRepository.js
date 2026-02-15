import product from "../schema/productSchema.js";

export const createProduct = async (productDetail) => {
  try {
    const newProduct = await product.create(productDetail);
    return newProduct;
  } catch (error) {
    console.log("error product repository in createproduct", error.message);
    throw error; 
  }
};
export const findAllProduct = async () => {
  try {
    const findProduct = await product.find({});
    return findProduct;
  } catch (error) {
    console.log("error product repository in findallproduct", error.message);
    throw error;
  }
};

export const findByIdAndDeleteProduct=async(id)=>{
   try{
      const findProduct=await product.findByIdAndDelete(id);
      return findProduct;
   }catch(error){
      console.log("error product repository in findanddeletebyid", error.message);
      throw error; 
   }
}


export const findSingleProductById=async(id)=>{
try{
   const singleProduct=await product.findById(id);
   return singleProduct;
}catch(error){
    console.log("error product repository in findSingleProduct", error.message);
      throw error; 
}
}

