'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.CowFilterAbleFields =
  exports.CowSearchAbleFields =
  exports.category =
  exports.label =
  exports.breed =
  exports.location =
    void 0
exports.location = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
]
exports.breed = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
]
exports.label = ['for sale', 'sold out']
exports.category = ['Dairy', 'Beef', 'DualPurpose']
exports.CowSearchAbleFields = [
  'name',
  'breed',
  'category',
  'location',
  // 'price',
  // 'weight',
]
exports.CowFilterAbleFields = ['searchTerm', 'minPrice', 'maxPrice', 'location']
