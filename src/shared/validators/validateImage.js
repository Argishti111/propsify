const imageExtensions = ["png", "jpg", "pjp", "pjpeg", "jpeg", "jfif"];
export function validateImage(file) {
  if (file.type !== "image/png") {
    return false;
  }
  const extension = file.name.split(".").pop();
  return imageExtensions.includes(extension);
}
