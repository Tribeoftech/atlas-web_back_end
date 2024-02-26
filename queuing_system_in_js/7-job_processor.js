/**
 * blacklist: An array of phone numbers that should be blocked from receiving notifications.
 */
const kue = require("kue");

const blacklist = ["4153518780", "4153518781"];

/**
 * Sends a notification to the given phone number with the provided message.
 * The notification is sent asynchronously via the done callback.
 *
 * The phone number is checked against a blacklist first - if it's blacklisted,
 * an error is passed to the done callback instead of sending the notification.
 *
 * Progress events are emitted on the job during notification sending.
 */
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100);
  if (blacklist.includes(phoneNumber)) {
    done(Error(`Phone number ${phoneNumber} is blacklisted`));
    return;
  }
  job.progress(50, 100);
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );
  done();
}

/**
 * Configures a Kue queue with the given name to process jobs, with concurrency of 2.
 * Registers a handler function to send push notifications for each job,
 * checking the phone number against a blacklist first before sending.
 */
const queue = kue.createQueue();
const queueKey = "push_notification_code_2";

queue.process(queueKey, 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
