const apiKey = "339202-7d7fd43c-8a39-4150-a6e4-d4fff51df762";

const apiHeaders = {
  headers: {
    "X-Figma-Token": apiKey,
  },
};

const loadFile = function (key) {
  return fetch("https://api.figma.com/v1/files/" + key, apiHeaders)
    .then((response) => response.json())
    .then((data) => {
      const ids = data.document.children[0].children.map((frame) => {
        return frame.id;
      });
      return {
        key: key,
        ids: ids,
      };
    });
};

const addImageToSite = function (urls) {
  const sectionTag = document.querySelector("section");

  sectionTag.innerHTML = "";

  urls.forEach((url) => {
    sectionTag.innerHTML =
      sectionTag.innerHTML +
      `
       <div>
        <img src="${url}">
      </div>
    `;
  });
};

const loadImages = function (obj) {
  const key = obj.key;
  const ids = obj.ids.join(",");
  return fetch(
    "https://api.figma.com/v1/images/" + key + "?ids=" + ids + "&scale=0.25",
    apiHeaders
  )
    .then((response) => response.json())
    .then((data) => {
      return obj.ids.map((id) => {
        return data.images[id];
      });
    });
  
};

loadFile("lmtAwlp9JOw2P28wTtbr56")
  .then((ids) => loadImages(ids))
  .then((imageUrls) => addImageToSite(imageUrls));
