const userRepository = require('./db/user-repository');

function seedData() {
  userRepository.populate();
}

module.exports = { seedData };
