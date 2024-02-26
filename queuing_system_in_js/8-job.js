const kue = require('kue');


/**
 * Creates Kue jobs for sending push notifications from the provided array of jobs.
 * Validates jobs is an array.
 * Loops through each job object and creates a Kue job with type 'push_notification_code_3'.
 * Saves the job and logs its creation or any error.
 * Attaches handlers for job completion, failure, and progress.
 */
const createPushNotificationsJobs = (jobs, queue) => {
  if (!Array.isArray(jobs)) {
    throw new Error(`Jobs is not an array`);
  }
  jobs.forEach((jobObj) => {
    const job = queue.create("push_notification_code_3", jobObj).save((err) => {
      if (!err) console.log(`Notification job created: ${job.id}`);
    });

    job.on("complete", () => {
      console.log(`Notification job ${job.id} completed`);
    });

    job.on("failed", (err) => {
      console.log(`Notification job ${job.id} failed: ${err}`);
    });

    job.on("progress", (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });
  });
};

module.exports = createPushNotificationsJobs;
