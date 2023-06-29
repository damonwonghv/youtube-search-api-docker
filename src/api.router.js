const express = require("express");
const router = express.Router();
const youtubeSearchApi = require("youtube-search-api");


/**
 * @openapi
 * /search:
 *   get:
 *     description: Search list by keywords
 *     tags:
 *       - /api/v1
 *     responses:
 *       200:
 *         description: Return List
 */
router.get("/search", (req, res) => {
    if (req.query.key)
        youtubeSearchApi
            .GetListByKeyword(req.query.key)
            .then((result) => {
                res.status(200).json({ success: true, data: result });
            })
            .catch((err) => {
                res.status(400).json({ success: false, error: err });
            });
    else
        res.status(400).json({ success: false, error: "invalid_key" });
});

/**
 * @openapi
 * /nextPage:
 *   post:
 *     description: Next Page for search list by keywords
 *     tags:
 *       - /api/v1
 *     responses:
 *       200:
 *         description: Return List
 */
router.post("/nextPage", (req, res) => {
    if (req.body.nextPage)
      youtubeSearchApi
        .NextPage(req.body.nextPage, true)
        .then((result) => {
          res.status(200).json({ success: true, data: result });
        })
        .catch((err) => {
          res.status(400).json({ success: false, error: err });
        });
    else
        res.status(400).json({ success: false, error: "invalid_nextPage" });
});


/**
 * @openapi
 * /suggest:
 *   get:
 *     description: Get Suggest Data
 *     tags:
 *       - /api/v1
 *     responses:
 *       200:
 *         description: Item with Video type will return isLive=[true/false] to identify live video or not.
 */
router.get("/suggest", (req, res) => {
    youtubeSearchApi
        .GetSuggestData()
        .then((result) => {
            res.status(200).json({ success: true, data: result });
        })
        .catch((err) => {
            res.status(400).json({ success: false, error: err });
        });
});

/**
 * @openapi
 * /playlist:
 *   get:
 *     description: Get Playlist with ID
 *     tags:
 *       - /api/v1
 *     responses:
 *       200:
 *         description: Playlist with playlist ID
 */
router.get("/playlist", (req, res) => {
    if(req.query.playlistId)
        youtubeSearchApi.GetPlaylistData(req.query.playlistId)
            .then((result) => {
                res.status(200).json({ success: true, data: result });
            })
            .catch((err) => {
                res.status(400).json({ success: false, error: err });
            });
    else res.status(400).json({ success: false, error: "invalid_playlistId" });
});

/**
 * @openapi
 * /channel:
 *   get:
 *     description: Get Channel by channel Id
 *     tags:
 *       - /api/v1
 *     responses:
 *       200:
 *         description: Get Channel by channel Id
 */
router.get("/channel", (req,res) => {
    youtubeSearchApi
      .GetChannelById(req.query.channelId)
      .then((result) => {
        res.status(200).json({ success: true, data: result });
      })
      .catch((err) => {
        res.status(400).json({ success: false, error: err });
      });
})

/**
 * @openapi
 * /video:
 *   get:
 *     description: Get Video Details with suggestion
 *     tags:
 *       - /api/v1
 *     responses:
 *       200:
 *         description: Get Video Details with suggestion
 */
router.get("/video", (req, res) => {
    if (req.query.videoId)
        youtubeSearchApi
            .GetVideoDetails(req.query.videoId)
            .then((result) => {
                res.status(200).json({ success: true, data: result });
            })
            .catch((err) => {
                res.status(400).json({ success: false, error: err });
            });
    else res.status(400).json({ success: false, error: "invalid_videoId" });
});

/**
 * @openapi
 * /short:
 *   get:
 *     description: Get Short Video List
 *     tags:
 *       - /api/v1
 *     responses:
 *       200:
 *         description: Get Short Video List
 */
router.get("/short", (req, res) => {
        youtubeSearchApi.GetShortVideo()
            .then((result) => {
                res.status(200).json({ success: true, data: result });
            })
            .catch((err) => {
                res.status(400).json({ success: false, error: err });
            });
});

module.exports = router;