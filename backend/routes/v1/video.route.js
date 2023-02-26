const express = require("express");
const videoController = require("../../controller/video.controller");
const videoValidator = require("../../validation/video.validation");
const validate = require("../../middleware/validate");
const router = express.Router();

// console.log("this is from video router");
router.get(
  "/",
  validate(videoValidator.searchVideo),
  videoController.getVideos
);
router.post(
  "/",
  validate(videoValidator.videoUrlSchema),
  videoController.postVideos
);
router.get(
  "/:videoId",
  validate(videoValidator.videoIdSchema),
  videoController.getVideoById
);
router.patch(
  "/:videoId/votes",
  validate(videoValidator.votingSchema),
  videoController.updateVotes
);
router.patch(
  "/:videoId/views",
  validate(videoValidator.videoIdSchema),
  videoController.updateViews
);

module.exports = router;