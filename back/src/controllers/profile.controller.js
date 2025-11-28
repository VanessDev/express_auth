// Tableau en mémoire
const users = [
  { id: 1, name: "Alice", age: 21, city: "Bordeaux" },
  { id: 2, name: "Karim", age: 23, city: "Toulouse" },
  { id: 3, name: "Sophie", age: 20, city: "Lyon" },
  { id: 4, name: "Léo", age: 22, city: "Paris" },
  { id: 5, name: "Nina", age: 24, city: "Marseille" },
];

// id suivant
let nextUserId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

// READ – liste de tous les users
exports.listUsers = (req, res) => {
  res.status(200).json({
    success: true,
    message: "liste des utilisateurs",
    data: users,
  });
};

// READ ONE – afficher un user par id
exports.getUsersById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
      data: null,
    });
  }

  res.status(200).json({
    success: true,
    message: "user found",
    data: user,
  });
};

// CREATE – créer un user
exports.createUser = (req, res) => {
  let { name, age, city } = req.body;

  // age arrive souvent en string → on le convertit
  age = Number(age);

  if (
    !name ||
    !city ||
    !age ||
    typeof name !== "string" ||
    typeof city !== "string" ||
    Number.isNaN(age)
  ) {
    return res.status(400).json({
      success: false,
      message: "name, age et city sont obligatoires",
      data: null,
    });
  }

  const newUser = { id: nextUserId++, name, age, city };
  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "user created",
    data: newUser,
  });
};

// UPDATE – modifier un user
exports.modifyUser = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
      data: null,
    });
  }

  let { name, age, city } = req.body;

  if (age !== undefined) {
    age = Number(age);
    if (Number.isNaN(age)) {
      return res.status(400).json({
        success: false,
        message: "age doit être un nombre",
        data: null,
      });
    }
  }

  if (name !== undefined) user.name = name;
  if (age !== undefined) user.age = age;
  if (city !== undefined) user.city = city;

  res.status(200).json({
    success: true,
    message: "utilisateur mis à jour",
    data: user,
  });
};

// DELETE – supprimer un user
exports.deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "utilisateur non trouvé",
      data: null,
    });
  }

  const deletedUser = users.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "utilisateur supprimé",
    data: deletedUser,
  });
};
