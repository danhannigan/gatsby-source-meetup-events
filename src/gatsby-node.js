const axios = require("axios");

async function fetchMeetupEvents(groups) {
  let groupNames = groups.map(group => group.replace(/-/g, ""));
  let groupUrls = groups.map(group => {
    return axios.get(`https://api.meetup.com/${group}/events?page=3`);
  });
  return (groupNames = await Promise.all(groupUrls));
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
    }
  };
}

exports.sourceNodes = async ({ actions }, options = {}) => {
  const groups = options.groups || [];
  if (!groups) throw new Error("No Groups Set");

  const { createNode } = actions;
  const groupResponse = await fetchMeetupEvents(groups);
  const validResults = groupResponse.filter(
    result => !(result instanceof Error)
  );
  const responseData = validResults.map(res => res.data);
  const mergedData = [].concat(...responseData);

  mergedData.map(event => {
    const node = processEvents(event);
    createNode(node);
  });

  return;
};
