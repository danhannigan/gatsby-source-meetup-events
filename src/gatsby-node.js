const axios = require('axios');

async function fetchMeetupEvents(token, groups) {
  let groupNames = groups.map(group => group.replace(/-/g, ''));
  let groupUrls = groups.map(group => {
    return axios.get(`https://api.meetup.com/${group}/events?access_token=${token}&page=3`)
  });
  return groupNames = await Promise.all(groupUrls);
}

function processEvents(event) {
  return {
    ...event,
    id: `MeetupEvent-${event.id}`,
    parent: null,
    children: null,
    internal: {
      type: "MeetupEvents",
      contentDigest: `MeetupEvents-${event.id}`
    },
  }
}

exports.sourceNodes = async ({ actions }, options = {}) => {
  const token = options.token || null;
  if (!token) throw new Error("No Meetup Token set.");

  const groups = options.groups || [];

  if (!groups) throw new Error("No Groups Set");

  const { createNode } = actions;

  const groupResponse = await fetchMeetupEvents(token, groups);

  groupResponse.forEach(group => {
    group.data.map(event => {
      const node = processEvents(event);
      createNode(node);
    })
  })

  return;
}