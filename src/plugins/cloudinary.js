// Cloudinary is a simpler version of the cloudinary SDK.
// Cloudinary haven't updated to support Vue 3 yet and because I don't use a lot of cloudinary functionality,
// I created this simple Vue Plugin to at least show images.

export default {
    install(app, options) {
        app.mixin({
            methods: {
                cloudinaryImage(image) {
                    const userID = options.configuration.cloudName;
                    let imageID = "placeholder";
                    if ((typeof image) != "undefined" && image != "") imageID = image;
                
                    let url = `https://res.cloudinary.com/${userID}/image/upload/${imageID}.jpg`;
                    return url
                }
            }
        })
    }
}