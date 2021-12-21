const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  } catch(err){
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const productData = await Category.findByPk(req.params.id,{
      // include: [{ model: Product, through: ProductTag, as: 'product_tag'}]
      include: [{model: Product}]
    });

    if(!productData) {
      res.status(404).json({ message: 'No category found with this id!'});
      return;
    }

    res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // find one category by its `id` value
  // be sure to include its associated Product

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err)
  }// create a new category
});

router.put('/:id', (req, res) => {
   // update a category by its `id` value
  Category.update(req.body, { 
    where: {
      id: req.params.id,
    },
  })
   .then((category) => {
    Category.findByPk(req.params.id,{
      // include: [{ model: Product, through: ProductTag, as: 'product_tag'}]
      include: [{model: Product}]
    }).then(result => {
      res.status(200).json(result)
    })
    //  return Category.findAll({ where: {id :req.params.id } })
    // console.log(category)
    // res.status(200).json(category)
   })
   .catch((err) => {
    // console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // delete a category by its `id` value
module.exports = router;
