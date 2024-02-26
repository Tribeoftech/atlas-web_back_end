/**
 * Creates a job in the kue job queue to send a push notification code to a phone number.
 *
 * @param {Object} jobData - The data for the job. Contains phoneNumber and message properties.
 * @returns {Object} The kue job object.
 */
const kue = require("kue");
const queue = kue.createQueue();

const jobData = {
  phoneNumber: "4153518789",
  message: "This is the code to verify your account",
};

const job = queue
  .create("push_notification_code", jobData)
  .save(function (err) {
    if (err) {
      console.log(`Notification job failed`);
    }
    console.log(`Notification job created: ${job.id}`);
  }, console.log(`Notification job completed`));
