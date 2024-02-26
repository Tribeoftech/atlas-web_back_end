/**
 * Configures a Kue job queue processor to handle push notification jobs.
 * Registers a handler function that sends a push notification to the provided
 * phone number with the given message when a job with the key 'push_notification_code'
 * is processed.
 */
const kue = require("kue");
const queue = kue.createQueue();

function sendNotification(phoneNumber, message) {
  console.log(
    "Sending notification to " + phoneNumber + ", with message: " + message
  );
}

const queueKey = "push_notification_code";

queue.process(queueKey, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message);
  done();
});
