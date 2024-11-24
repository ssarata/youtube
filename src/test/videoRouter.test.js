import request from 'supertest';
import express from 'express';
import VideoRouter from '../routes/videoRouter';  // Adjust the import based on your project structure

const app = express();
const videoRouter = new VideoRouter();

app.use('/videos', videoRouter.getRouter());

describe('Video API', () => {
    it('should return a list of videos', async () => {
        const response = await request(app).get('/videos');
        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });

    it('should create a new video', async () => {
        const newVideo = {
            title: 'Test Video',
            description: 'Test Description',
            mediaPath: 'path/to/video.mp4',
            status: true,
            userId: 1,
        };

        const response = await request(app)
            .post('/videos')
            .field('title', newVideo.title)
            .field('description', newVideo.description)
            .field('mediaPath', newVideo.mediaPath)
            .field('status', newVideo.status)
            .field('userId', newVideo.userId)
            .attach('file', 'path/to/file.mp4');  // Attach a sample file here

        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty('id');
    });

    it('should update a video', async () => {
        const updatedVideo = {
            title: 'Updated Title',
            description: 'Updated Description',
            mediaPath: 'new/path/to/video.mp4',
            status: true,
            userId: 1,
        };

        const response = await request(app)
            .put('/videos/1')  // Update the video with ID 1
            .send(updatedVideo);

        expect(response.status).toBe(200);
        expect(response.body.data.title).toBe(updatedVideo.title);
    });

    it('should delete a video', async () => {
        const response = await request(app).delete('/videos/1');  // Delete video with ID 1
        expect(response.status).toBe(200);
    });
});
