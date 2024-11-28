import express from "express";
import VideoController from "../controllers/videoController.js";
import configurationStorage from '../confMulter.js';
const mul = configurationStorage;
import swaggerJSDoc from "swagger-jsdoc";

export default class VideoRouter {
    router;
    videoController;

    constructor() {
        this.router = express.Router();
        this.videoController = new VideoController();
        this.initializeRoutes();
    }

    initializeRoutes() {
      this.router.get("/:id", this.videoController.getVideo.bind(this.videoController));

        /**
         * @swagger
         * /videos:
         *   get:
         *     summary: Retrieve all videos
         *     tags: [Videos]
         *     responses:
         *       200:
         *         description: A list of videos
         *         content:
         *           application/json:
         *             example:
         *               data: [{}]
         *       400:
         *         description: Bad Request
         *         content:
         *           application/json:
         *             example:
         *               error:
         *                 message: "Bad Request"
         *       500:
         *         description: Internal Server Error
         *         content:
         *           application/json:
         *             example:
         *               error:
         *                 message: "Server Error"
         *       404:
         *         description: Resource not found
         *         content:
         *           application/json:
         *             example:
         *               error:
         *                 message: "Resource not found"
         *       201:
         *         description: Created successfully
         *         content:
         *           application/json:
         *             example:
         *               data: [{}]
         */
        this.router.get("/", this.videoController.getVideos.bind(this.videoController));

        /**
         * @swagger
         * /videos:
         *   post:
         *     summary: Create a new video
         *     tags: [Videos]
         *     requestBody:
         *       description: Video object to be added
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               title:
         *                 type: string
         *               description:
         *                 type: string
         *               mediaPath:
         *                 type: string
         *               status:
         *                 type: boolean
         *               userId:
         *                 type: integer
         *           example:
         *             title: "Sample Video"
         *             description: "A sample description"
         *             mediaPath: "path/to/video"
         *             status: true
         *             userId: 1
         *     responses:
         *       201:
         *         description: Video created successfully
         *         content:
         *           application/json:
         *             example:
         *               data: [{}]
         *       400:
         *         description: Bad Request
         *         content:
         *           application/json:
         *             example:
         *               error:
         *                 message: "Bad Request"
         *       500:
         *         description: Internal Server Error
         *         content:
         *           application/json:
         *             example:
         *               error:
         *                 message: "Server Error"
         */
        this.router.post("/", mul.single('file'), this.videoController.createVideo.bind(this.videoController));

        /**
         * @swagger
         * /videos/{id}:
         *   put:
         *     summary: Update a video by ID
         *     tags: [Videos]
         *     parameters:
         *       - in: path
         *         name: id
         *         description: The ID of the video to update
         *         required: true
         *         schema:
         *           type: string
         *     requestBody:
         *       description: Updated video data
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               title:
         *                 type: string
         *               description:
         *                 type: string
         *               mediaPath:
         *                 type: string
         *               status:
         *                 type: boolean
         *               userId:
         *                 type: integer
         *           example:
         *             title: "Updated Video Title"
         *             description: "Updated description"
         *             mediaPath: "updated/path/to/video"
         *             status: true
         *             userId: 1
         *     responses:
         *       200:
         *         description: Video updated successfully
         *         content:
         *           application/json:
         *             example:
         *               data: [{}]
         *       404:
         *         description: Video not found
         *         content:
         *           application/json:
         *             example:
         *               error:
         *                 message: "Video not found"
         *       400:
         *         description: Bad Request
         *         content:
         *           application/json:
         *             example:
         *               error:
         *                 message: "Bad Request"
         */
        this.router.put("/:id", this.videoController.updateVideo.bind(this.videoController));

        /**
         * @swagger
         * /videos/{id}:
         *   delete:
         *     summary: Delete a video by ID
         *     tags: [Videos]
         *     parameters:
         *       - in: path
         *         name: id
         *         description: The ID of the video to delete
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Video deleted successfully
         *         content:
         *           application/json:
         *             example:
         *               data: [{}]
         *       404:
         *         description: Video not found
         *         content:
         *           application/json:
         *             example:
         *               error:
         *                 message: "Video not found"
         *       500:
         *         description: Internal Server Error
         *         content:
         *           application/json:
         *             example:
         *               error:
         *                 message: "Server Error"
         */
        this.router.delete("/:id", this.videoController.deleteVideo.bind(this.videoController));
    }

    getRouter() {
        return this.router;
    }
}
