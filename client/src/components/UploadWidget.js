const cloudName = ''
const uploadPreset = ''

const myWidget = cloudinary.createUploadWidget(
    {
        cloudname: cloudName,
        uploadPreset: uploadPreset,
    },
    (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Done! Here is the Image info:", result.info)
            document
                .getElementById("uploadedImage")
                .setAttribute("src", result.info.secure_url)
        }
    }
)

document.getElementById("uploaded_widget").addEventListener(
    "click",
    function() {
        myWidget.open()
    },
    false
)