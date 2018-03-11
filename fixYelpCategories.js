let yelp = require('./helpers/yelpcategories.js');

yelp = yelp.split(',\n');
return yelp.forEach((category) => {
  let newCategory = category.split('');
  // console.log(category);
  let firstLetter = category.slice(0, 1);
  let remaining = category.slice(1);
  category = firstLetter.toUpperCase() + remaining;
  console.log('category', category);
});