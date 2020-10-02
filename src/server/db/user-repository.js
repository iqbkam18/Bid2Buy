/*
    Here we "simulate" a database with in-memory Map.
    Furthermore, we do not deal with the "proper" handling of
    passwords. Passwords should NEVER be saved in plain text,
    but rather hashed with secure algorithms like BCrypt.
 */

const users = new Map();

function populate() {
  createUser('admin', 'admin', []);
}

function getUser(id) {
  return users.get(id);
}

function verifyUser(id, password) {
  const user = getUser(id);

  if (!user) {
    return false;
  }

  /*
        WARNING: remember that those passwords should be hashed,
        with salt and pepper...
        But we are not dealing with backend details
        in this course, like secure storage of passwords
     */
  return user.password === password;
}

function createUser(id, password, bids) {
  if (getUser(id)) {
    return false;
  }

  const _id = password === 'admin' ? 'admin-1234' : `${id}-1323`;

  const user = {
    id: id,
    _id,
    balance: 1000,
    password,
    bids,
  };

  users.set(id, user);
  return true;
}

module.exports = { getUser, verifyUser, createUser, populate };
