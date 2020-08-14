import express, { json } from "express";
import axios from "axios";

const apiRouter = express.Router();

apiRouter.get('/youtube/:videoId', (req, res) => {
    const videoId = req.params.videoId;
    const headers = {
        'X-YouTube-Client-Name': '1',
        'X-YouTube-Client-Version': '2.20200806.01.01',
        'X-SPF-Referer': 'https://www.youtube.com/',
        'X-SPF-Previous': 'https://www.youtube.com/'
    };
    axios.get('https://www.youtube.com/watch', {
        params: {
            v: videoId,
            pbj: 1
        },
        headers: headers
    })
        .then(response => {
            try {
                let status = response.data?.[3]?.playerResponse?.playabilityStatus?.status;
                if (status && status === 'OK') {
                    let data = response.data?.[2]?.player?.args?.player_response;
                    data = JSON.parse(data);
                    if (data && data?.streamingData?.formats) {
                        let responseData = data?.streamingData?.formats;
                        res.json({
                            status: 'OK',
                            data: responseData
                        });
                        return;
                    }
                }
                throw Error('Something is wrong');
            }
            catch (err) {
                res.json({ status: 'error', message: err });
            }
        })
        .catch(err => {
            res.json({ status: 'error', message: err });
        });
});

apiRouter.get('/fembed/:videoId', (req, res) => {
    const videoId = req.params.videoId;
    axios.post(`https://feurl.com/api/source/${videoId}`)
        .then(response => {
            try {
                if (response.data?.success) {
                    let data = response?.data?.data;
                    if (data) {
                        res.json({ status: 'OK', data: data });
                        return;
                    }
                }
                throw Error('Something is wrong');
            }
            catch (err) {
                res.json({ status: 'error', message: err });
            }
        })
        .catch(err => {
            res.json({ status: 'error', message: err });
        });
});

export default apiRouter;