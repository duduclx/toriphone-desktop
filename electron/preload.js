import { contextBridge } from "electron";
// const { contextBridge } = require('electron');

/*
contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});
*/

contextBridge.exposeInMainWorld('electron', {
  requestMediaPermissions: () => {
    // Demande des permissions pour le micro et la caméra
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(() => {
          console.log('L\'utilisateur a accordé les autorisations audio et vidéo.');
          resolve(true); // Permissions accordées
        })
        .catch((error) => {
          console.error('Erreur lors de la demande de permission audio/vidéo :', error);
          reject(false); // Permissions refusées
        });
    });
  }
});