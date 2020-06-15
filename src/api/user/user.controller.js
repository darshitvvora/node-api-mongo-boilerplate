const User = require('./user.model');


// const { BUCKET } = require('../../config/environment');
const messagesMap = {
  201: 'Your account created successfully.',
  409: 'Duplicate',
};


/**
 * @api {post} /users Create a user
 * @apiDescription Create a user
 * @apiName createUser
 * @apiGroup User
 *
 * @apiParam (Body) {String} email User email.
 * @apiParam (Body) {String} password User password.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {String} Status Message
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  message: 'Your account created successfully.',
 *  id: 201
 * }
 *
 * {
 *  message: 'Duplicate',
 *  id: 209
 * }
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *
 *  {
 *    email: 'email is required'
 *  }
 */
async function create(req, res, next) {
  try {
    const status = await User.create(req.body);
    return res.json({ message: messagesMap[status.code], id: status.id });
  } catch (err) {
    return next(err);
  }
}

/**
 * @api {get} /users Find all users
 * @apiDescription Lists all user
 * @apiName getAllUser
 * @apiGroup User
 *
 * @apiSuccess {Array} List of user object
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * [{
 *  id: 1
 *  name: 'Demo user',
 *  email: 'demo@demo.com'
 * }]
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 */
async function index(req, res, next) {
  try {
    const users = await User.find().exec();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
}

/**
 * @api {get} /users/:id Get a single user
 * @apiDescription Get a single user
 * @apiName getUser
 * @apiGroup User
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object}  User created.
 * @apiSuccess {String} user._id User _id.
 * @apiSuccess {String} user.name User Name.
 * @apiSuccess {String} user.email User email.
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  name: 'name,
 *  email: 'demo@demo.com',
 *  createdAt: '2017-05-03',
 * }
 *
 * @apiErrorExample {json} Post not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id).exec()
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

/**
 * @api {put} /posts/:id Update a single user
 * @apiDescription Update a single user
 * @apiName getUser
 * @apiGroup User
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiParam (Body) {String} email User email.
 * @apiParam (Body) {String} password User password.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {String} Status Message
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  message: 'Your account created successfully.',
 *  id: 201
 * }
 *
 * {
 *  message: 'Duplicate',
 *  id: 209
 * }
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 */

async function update(req, res, next) {
  const SUCCESS = 200;
  try {
    if(req.body._id) {
      Reflect.deleteProperty(req.body, '_id');
  }
    await User.findOneAndUpdate(
      {_id: req.params.id},
       req.body,
      {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}
      ).exec()

    return res.sendStatus(SUCCESS);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  create,
  index,
  getUser,
  update,
};
