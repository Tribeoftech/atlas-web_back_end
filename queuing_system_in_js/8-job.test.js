/**
 * Tests for createPushNotificationsJobs function.
 * - Checks for errors thrown when invalid job arrays are passed in.
 * - Checks no error is thrown for valid empty job array.
 */
const kue = require("kue");
const queue = kue.createQueue();
const chai = require("chai");
const expect = chai.expect;
const createPushNotificationsJobs = require("./8-job");

describe("createPushNotificationsJobs", () => {
  it("check error thrown from job array being Number", () => {
    expect(() => {
      createPushNotificationsJobs(1, queue);
    }).to.throw(Error, "Jobs is not an array");
  });

  it("check error thrown from job array being String", () => {
    expect(() => {
      createPushNotificationsJobs("string", queue);
    }).to.throw(Error, "Jobs is not an array");
  });

  it("check error thrown from job array being Object", () => {
    expect(() => {
      createPushNotificationsJobs({}, queue);
    }).to.throw(Error, "Jobs is not an array");
  });

  it("check what is thrown if job is array", () => {
    expect(() => {
      createPushNotificationsJobs([], queue);
    }).to.not.throw(Error, "Jobs is not an array");
  });
});
