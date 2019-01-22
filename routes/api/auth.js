const router = require("express").Router();
const authController = require("../../controllers/authController");

// Matches with "/api/books"
router.route("/")
    .post(authController.createUser);
// .get(booksController.findAll)
// .post(booksController.create);

// Matches with "/api/books/:id"
router
    .route("/:id")
    .get(authController.findByGoogleId)

// .get(booksController.findById)
// .put(booksController.update)
// .delete(booksController.remove);

module.exports = router;
