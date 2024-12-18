const fs = require("fs");
const path = require("path");

// Path to the folder containing the images
const imagesDir = path.join(__dirname, "asl_images");

// Read all files in the directory
fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error("Error reading the directory:", err);
    return;
  }

  files.forEach((file) => {
    const oldPath = path.join(imagesDir, file);

    // Check if the file matches the `_test` pattern
    if (file.includes("_test")) {
      const newFileName = file.replace("_test", ""); // Remove the _test part
      const newPath = path.join(imagesDir, newFileName);

      // Rename the file
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error(`Error renaming file ${file}:`, err);
        } else {
          console.log(`Renamed: ${file} -> ${newFileName}`);
        }
      });
    }
  });
});
