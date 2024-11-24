import UserService from "../services/userService.js"
import * as status from "../constantes/httpStatus.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */
export default class UserController {
  userService;
  constructor() {
    this.userService = new UserService();
  }

  /**
   * @swagger
   * users:
   *   get:
   *     summary: Get a list of all users
   *     tags: [getUsers]
   *     responses:
   *       200:
   *         description: A list of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   name:
   *                     type: string
   *                   email:
   *                     type: string
   *       500:
   *         description:  erreur du serveur
   */
  async getUsers(req, res) {
    try {
      const users = await this.userService.getAll();
      res.status(status.HTTP_200_OK).json(users);
    } catch (error) {
      console.error(error);
      res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
    }
  }

  /**
   * @swagger
   * users:
   *   post:
   *     summary: Create a new user
   *     tags: [createUser]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               name:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 name:
   *                   type: string
   *                 email:
   *                   type: string
   *       500:
   *         description: erreur du serveur
   */
  async createUser(req, res) {
    const data = req.body;
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      const user = await this.userService.create(data);
      res.status(status.HTTP_200_OK).json(user);
    } catch (error) {
      console.error(error);
      res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
    }
  }

  /**
   * @swagger
   * users/{id}:
   *   get:
   *     summary: Get user by ID
   *     tags: [getUser]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The user ID
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: User found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 name:
   *                   type: string
   *                 email:
   *                   type: string
   *       500:
   *         description: erreur du serveur
   */
  async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await this.userService.getUser(parseInt(id));
      res.status(status.HTTP_200_OK).json(user);
    } catch (error) {
      console.error(error);
      res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
    }
  }

  /**
   * @swagger
   * users/{id}:
   *   put:
   *     summary: Update user by ID
   *     tags: [updateUser]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The user ID
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               name:
   *                 type: string
   *     responses:
   *       200:
   *         description: User updated successfully
   *       500:
   *         description: ereur du serveur
   */
  async updateUser(req, res) {
    const { id } = req.params;
    const { email, name } = req.body;
    const userData = {
      email: email,
      name: name,
    };

    try {
      await this.userService.update(parseInt(id), userData);
      const users = await this.userService.getAll();
      res.status(status.HTTP_200_OK).json(users);
    } catch (error) {
      console.error(error);
      res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
    }
  }

  /**
   * @swagger
   * users/{id}:
   *   delete:
   *     summary: Delete user by ID
   *     tags: [deleteUser]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The user ID
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: User deleted successfully
   *       500:
   *         description: ereur du serveur
   */
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await this.userService.delete(parseInt(id));
      const users = await this.userService.getAll();
      res.status(status.HTTP_200_OK).json(users);
    } catch (error) {
      res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
    }
  }
}
