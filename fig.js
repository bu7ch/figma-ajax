const fileNumber = ""; //TODO: Mettre votre numéro de fichier

const apiKey = ""; ////TODO: Mettre votre clé d'API figma

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

loadFile(fileNumber)
  .then((ids) => loadImages(ids))
  .then((imageUrls) => addImageToSite(imageUrls));
