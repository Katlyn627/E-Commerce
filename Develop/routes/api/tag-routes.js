const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData);
  } catch(err){
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if(!tagData) {
      res.status(404).json({ message: 'No tag found with this id!'});
      return;
    }

    res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // find a single tag by its `id`
  // be sure to include its associated Product data

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err){
    res.status(400).json(err)
  }
  });

  router.put('/:id', (req, res) => {
    // update a category by its `id` value
   Tag.update(req.body, { 
     where: {
       id: req.params.id,
     },
   })
    .then((tag) => {
     Tag.findByPk(req.params.id,{
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
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
