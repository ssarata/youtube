 import express from "express"
import UserController from "../controllers/userController.js";
import {authenticateToken} from "../middleware/authMiddleware.js";
import swaggerJSDoc from "swagger-jsdoc";

 export default class UserRouter{
     router;
     userController;

    constructor(){
        this.router=express.Router();
        this.userController=new UserController()
        this.initializeRoutes();
    }
    

     initializeRoutes(){ 
 
 /**
 * @swagger
 * /users:
 *   get:
 *     summary: afficher tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */

        this.router.get("/",this.userController.getUsers.bind(this.userController))
      /**
          * @swagger
          * /users:
          *   post:
          *     summary: creer un nouvel utilisateur
          *     tags: [Users]
          *     requestBody:
          *       description: users object to be added
          *       required: true
          *       content:
          *         application/json:
          *           schema:
          *             type: object
          *             properties:
          *               name:
          *                 type: string
          *               email:
          *                 type: string
          *               password:
          *                 type: string
          *             
          *             example:
          *                name: "John Doe"
          *                email: "John@gmail.com" 
          *                password: 07/14/1990
          *               
          *     responses:
          *       201:
          *         description: Successful response
          *         content:
          *           application/json:
          *             example:
          *               data: [{}]
          *       400:
          *         description: Invalid request
          */


       // this.router.post("/",authenticateToken,this.userController.createUser.bind(this.userController))
      this.router.post("/",this.userController.createUser.bind(this.userController))

        /**
          * @swagger
          * /users/{id}:
          *   put:
          *     summary: Update a users by ID
          *     description: Update the details of a users by providing the users ID.
          *     tags: [users]
          *     parameters:
          *       - in: path
          *         name: id
          *         description: The ID of the users to be updated.
          *         required: true
          *         schema:
          *           type: string
          *     requestBody:
          *       description: Updated users information
          *       required: true
          *       content:
          *         application/json:
          *           schema:
          *             type: object
          *             properties:
          *               name:
          *                 type: string
          *               email:
          *                 type: string
          *               password:
          *                 type: string
          *     responses:
          *       200:
          *         description: Successful update
          *         content:
          *           application/json:
          *             example:
          *               message: 'users updated successfully'
          *       404:
          *         description: users not found
          *         content:
          *           application/json:
          *             example:
          *               message: 'users not found'
          */
        this.router.get("/:id",this.userController.getUser.bind(this.userController))
        /**
          * @swagger
          * /users/{id}:
          *   get:
          *     summary: Get a users by ID
          *     tags: [Users]
          *     parameters:
          *       - name: id
          *         in: path
          *         required: true
          *         description: The ID of the users
          *         schema:
          *           type: string
          *         example:
          *             658918e852a0131af4c0aab1
          *     responses:
          *       200:
          *         description: Successful response
          *         content:
          *           application/json:
          *             example:
          *               data: [{}]
          *       404:
          *         description: users not found
          */

        this.router.put("/:id",this.userController.updateUser.bind(this.userController))
        /**
          * @swagger
          * /user/{id}:
          *   delete:
          *     summary: supprimer un utilisateur par ID
          *     tags: [users]
          *     parameters:
          *       - name: id
          *         in: path
          *         required: true
          *         description: The ID of the user
          *         schema:
          *           type: integer
          *         example:
          *             658918e852a0131af4c0aab1
          *     responses:
          *       204:
          *         description: User deleted successfully
          *       404:
          *         description: User not found
          */
        this.router.delete("/:id",this.userController.deleteUser.bind(this.userController))
     }
     getRouter(){
        return this.router;
     }
}
