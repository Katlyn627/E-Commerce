// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const { FOREIGNKEYS } = require('sequelize/types/lib/query-types');

// Products belongsTo Category
Product.belongsTo(Category{
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

// Categories have many Products

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'product_tag'
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Product,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'product_tag'
});

}


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
