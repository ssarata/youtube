import request from 'supertest';
import app from '../app.js';

describe('Video API', () => {
    it('retourne la liste des videos', async () => {
        const response = await request(app).get('/videos');
        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });

    it('create une nouvelle video', async () => {
        const video = {
            title: 'Test Video',
            description: 'Test Description',
            file: 'videos/video.mp4',
            status: true,
            userId: 2,
        };

        const response = await request(app)
            .post('/videos')
            .field('title', video.title)
            .field('description', video.description)
            .field('mediaPath', video.file)
            .field('status', video.status)
            .field('userId', video.userId)
            .attach('file', 'videos/video.mp4');  

        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty('id');
    });

    it('should update a video', async () => {
        const updatedVideo = {
            title: 'Updated Title',
            description: 'Updated Description',
            file: 'videos/video.mp4',
            status: true,
            userId: 2,
        };

        const response = await request(app)
            .put('/videos/1')  // Update the video with ID 1
            .send(updatedVideo);

        expect(response.status).toBe(200);
        expect(response.body.data.title).toBe(updatedVideo.title);
    });

    it('should delete a video', async () => {
        const response = await request(app).delete('/videos/3');  // Delete video with ID 1
        expect(response.status).toBe(200);
    });
});
