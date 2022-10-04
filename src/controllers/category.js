const categoryDA = require("../dataaccess/category")

const { RESULT_CODES } = require("../utils/index");

const createCategory = async ({ nombre }) => {
  try {
    const isCategory = await categoryDA.getCategoryByName({nombre})

    if(isCategory){
      return {
        code: RESULT_CODES.CATEGORY_ALREADY_REGISTERED
      }
    }

    const category = await categoryDA.createCategory({nombre})

    return {
      category,
      code: RESULT_CODES.SUCCESS
    }
    
  } catch ( error ) {
    throw new Error(error)
  }
}

const getCategory = async () => {
  try {
    const category = await categoryDA.getCategory();

    return {
      category,
      code: RESULT_CODES.SUCCESS
    }
  } catch (error) {
    throw new Error(error)
  }
}

const createCatProduct = async ({id_prod, id_cate}) => {
  try {
    const category = await categoryDA.createCatProducto({
      id_cate,
      id_prod
    })

    return category
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createCategory,
  getCategory,
  createCatProduct
}