import VideoService from "../services/videoService.js";
import * as status from "../constantes/httpStatus.js";

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Operations related to videos
 */
export default class VideoController {
  video;
  constructor() {
    this.video = new VideoService();
  }

  /**
   * @swagger
   * /videos:
   *   get:
   *     summary: Get a list of all videos
   *     tags: [Videos]
   *     responses:
   *       200:
   *         description: List of videos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Video'
   *       500:
   *         description: Internal server error
   */
  async getVideos(req, res) {
    try {
      const videos = await this.video.getAll();
      res.status(status.HTTP_200_OK).json(videos);
    } catch (error) {
      console.error(error);
      res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
    }
  }

  /**
   * @swagger
   * /videos/{id}:
   *   get:
   *     summary: Get a video by ID
   *     tags: [Videos]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the video
   *     responses:
   *       200:
   *         description: Video found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Video'
   *       404:
   *         description: Video not found
   *       500:
   *         description: Internal server error
   */
  async getVideo(req, res) {
    const { id } = req.params;

    try {
      const video = await this.video.get(parseInt(id));
      res.status(status.HTTP_200_OK).json(video);
    } catch (error) {
      console.error(error);
      res.status(status.HTTP_404_NOT_FOUND).json();
    }
  }

  /**
   * @swagger
   * /videos:
   *   post:
   *     summary: Crée une nouvelle vidéo
   *     tags: [Videos]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 description: Titre de la vidéo
   *               description:
   *                 type: string
   *                 description: Description de la vidéo
   *               file:
   *                 type: string
   *                 format: binary
   *                 description: La vidéo
   *               userId:
   *                 type: integer
   *                 description: ID de l'utilisateur 
   *     responses:
   *       201:
   *         description: Vidéo créée avec succès
   *       400:
   *         description: Données invalides
   *       500:
   *         description: Erreur serveur
   */
  async createVideo(req, res) {
    const data = req.body;
    const file = req.file;

    data.mediaPath = file.filename;
    data.userId = 2;

    try {
      const video = await this.video.create(data);
      res.status(status.HTTP_200_OK).json(video);
    } catch (error) {
      console.error(error);
      res.status(status.HTTP_404_NOT_FOUND).json(error);
    }
  }

  /**
   * @swagger
   * /videos/{id}:
   *   put:
   *     summary: Update a video by ID
   *     tags: [Videos]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the video
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data::
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               description:
   *                 type: string
   *               file:
   *                 type: string
   *                 format: binary
   *                 description: Nouveau fichier vidéo
   *               status:
   *                 type: boolean
   *               
   *     responses:
   *       200:
   *         description: Video updated successfully
   *       404:
   *         description: Video not found
   *       500:
   *         description: Internal server error
   */
  async updateVideo(req, res) {
    const { id } = req.params;
    const data = req.body;
    const file = req.file;

    data.mediaPath = file.filename;
    data.userId = 2; // Assuming that the user is always 2 for this example

    try {
      const video = await this.video.update({
        where: {
          id: id,
        },
        data: data,
      });
      res.status(status.HTTP_200_OK).json(video);
    } catch (error) {
      console.error(error);
      res.status(status.HTTP_404_NOT_FOUND).json(error);
    }
  }

  /**
   * @swagger
   * /videos/{id}:
   *   delete:
   *     summary: Delete a video by ID
   *     tags: [Videos]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the video
   *     responses:
   *       200:
   *         description: Video deleted successfully
   *       404:
   *         description: Video not found
   *       500:
   *         description: Internal server error
   */
  async deleteVideo(req, res) {
    const { id } = req.params;

    try {
      const videos = await this.video.delete(parseInt(id));
      res.status(status.HTTP_200_OK).json(videos);
    } catch (error) {
      console.error(error);
      res.status(status.HTTP_400_BAD_REQUEST).json(error);
    }
  }
}
