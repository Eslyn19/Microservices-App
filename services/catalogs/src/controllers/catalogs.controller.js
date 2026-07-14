const catalogs = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 80 }
];

export async function listCatalogs(req, res, next) {
  try {
    res.json(catalogs);
  } catch (err) {
    next(err);
  }
}
