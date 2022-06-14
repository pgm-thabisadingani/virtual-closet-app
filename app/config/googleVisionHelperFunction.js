import Constants from "expo-constants";

const API_KEY = Constants.manifest.extra.apiKeyGoogleVision; //put your key here.
//this endpoint will tell Google to use the Vision API. Also, we are passing in our key.

const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

function generateBody(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },

        features: [
          {
            type: "LABEL_DETECTION", //we will use this API for label detection purposes.
            maxResults: 1,
          },
        ],
      },
    ],
  };

  return body;
}
export const callGoogleVisionAsync = async (image) => {
  const body = generateBody(image); //pass in our image for the payload

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      Accept: "application/json",

      "Content-Type": "application/json",
    },

    body: JSON.stringify(body),
  });

  const result = await response.json();

  return result.responses[0].labelAnnotations[0].description;
};
