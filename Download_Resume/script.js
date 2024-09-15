//  assigning elements for functionality
var form = document.getElementById('resume-form');
var generateButton = document.getElementById('generate-resume');
var resumePopup = document.getElementById('resume-popup');
var generatedResume = document.getElementById('generated-resume');
var editButton = document.getElementById('edit-resume');
var downloadPdfButton = document.getElementById('download-pdf');
var shareButton = document.getElementById('share-link');
// Input variables accessing html elements as input
var pictureInput = document.getElementById('profilePicture');
var nameInput = document.getElementById('name');
var dobInput = document.getElementById('dob');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var educationInput = document.getElementById('education');
var experienceInput = document.getElementById('experience');
var skillsInput = document.getElementById('skills');
var resumeURLInput = document.getElementById('resumeURL');
// Function to generate resume by clicking on button
generateButton.addEventListener('click', function () {
    // assigning input values
    var _a;
    var name = nameInput.value;
    var dob = dobInput.value;
    var email = emailInput.value;
    var phone = phoneInput.value;
    var education = educationInput.value;
    var experience = experienceInput.value;
    var skills = skillsInput.value;
    //  show the resume popup
    form.classList.add('hidden');
    resumePopup.classList.remove('hidden');
    // creating URL to display photo
    var picturefile = (_a = pictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
    var profilePictureURL = picturefile ? URL.createObjectURL(picturefile) : '';
    // resume will show in HTML and insert it into the DOM typescript
    generatedResume.innerHTML = "\n    <div class=\"resume-section\">\n  \n <img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\" >\n      <h3 contenteditable=\"true\" class=\"para\">Name:").concat(name, "</h3>\n      <p contenteditable=\"true\" class=\"para\">Date of Birth: ").concat(dob, "</p>\n      <p contenteditable=\"true\" class=\"para\">Email: ").concat(email, "</p>\n      <p contenteditable=\"true\" class=\"para\">Phone: ").concat(phone, "</p>\n      <h2 id=\"heading\">Education</h2>\n      <p contenteditable=\"true\" class=\"para\">").concat(education, "</p>\n      <h4 id=\"heading\">Experience</h4>\n      <p contenteditable=\"true\" class=\"para\">").concat(experience, "</p>\n      <h2 id=\"heading\">Skills</h2>\n      <p contenteditable=\"true\" class=\"para\">").concat(skills, "</p>\n    </div>\n  ");
});
// if - else for download btn and inserting image in pdf
if (downloadPdfButton) {
    downloadPdfButton.addEventListener('click', function () {
        var _a;
        // picture will insert
        var file = (_a = pictureInput === null || pictureInput === void 0 ? void 0 : pictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader_1 = new FileReader();
            //image embed in the resume
            reader_1.onloadend = function () {
                var base64Image = reader_1.result; // Cast to string since FileReader returns a string for Data URLs
                //setting image properties
                var imageElement = document.createElement('img');
                imageElement.src = base64Image;
                imageElement.alt = "Profile Picture";
                imageElement.style.width = "100px";
                // Insert the image at the beginning of the resume content
                generatedResume.insertBefore(imageElement, generatedResume.firstChild);
                // Generate the unique path based on user's input
                var resumeURL = resumeURLInput.value;
                var uniquePath = "resumes/".concat(resumeURL.replace(/\s+/g, '_'), "_cv.html");
                //  downloading the resume
                var pdfDownload = document.createElement('a');
                pdfDownload.href = 'data:text/html;charset=UTF-8,' + encodeURIComponent(generatedResume.innerHTML);
                pdfDownload.download = uniquePath;
                pdfDownload.textContent = "Download PDF 2024";
                // Append the download link to the popup 
                resumePopup.appendChild(pdfDownload);
                pdfDownload.click();
            };
            // Read the image file as Data URL
            reader_1.readAsDataURL(file);
        }
        else {
            console.error("No image file selected");
        }
    });
}
else {
    console.error('Download button not found');
}
// Function to generate a shareable link based on form data
function generateShareableLink() {
    var baseUrl = window.location.origin; // Gets the base URL of the current site
    var params = new URLSearchParams();
    // Collecting form data
    params.append('name', nameInput.value);
    params.append('dob', dobInput.value);
    params.append('email', emailInput.value);
    params.append('phone', phoneInput.value);
    params.append('education', educationInput.value);
    params.append('experience', experienceInput.value);
    params.append('skills', skillsInput.value);
    // Construct the full shareable link
    var shareableLink = "".concat(baseUrl, "?").concat(params.toString());
    return shareableLink;
}
// Function to copy the shareable link to the clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        alert('Link copied to clipboard!');
    }, function (err) {
        console.error('Could not copy text: ', err);
    });
}
// Button click event for generating and sharing the link
shareButton.addEventListener('click', function () {
    var link = generateShareableLink();
    copyToClipboard(link);
    // Optionally display the link to the user
    alert("Here is your shareable link: ".concat(link));
});
// Edit functionality
editButton.addEventListener('click', function () {
    var _a, _b, _c, _d, _e, _f, _g;
    // Collect values from the generated resume to allow editing
    var editedName = (_a = generatedResume.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.innerHTML;
    var editedDob = (_b = generatedResume.querySelector('p:nth-child(2)')) === null || _b === void 0 ? void 0 : _b.innerHTML.replace('Date of Birth: ', '');
    var editedEmail = (_c = generatedResume.querySelector('p:nth-child(3)')) === null || _c === void 0 ? void 0 : _c.innerHTML.replace('Email: ', '');
    var editedPhone = (_d = generatedResume.querySelector('p:nth-child(4)')) === null || _d === void 0 ? void 0 : _d.innerHTML.replace('Phone: ', '');
    var editedEducation = (_e = generatedResume.querySelector('p:nth-child(6)')) === null || _e === void 0 ? void 0 : _e.innerHTML;
    var editedExperience = (_f = generatedResume.querySelector('p:nth-child(8)')) === null || _f === void 0 ? void 0 : _f.innerHTML;
    var editedSkills = (_g = generatedResume.querySelector('p:nth-child(10)')) === null || _g === void 0 ? void 0 : _g.innerHTML;
    // Populate the form fields with the edited values
    nameInput.value = editedName || '';
    dobInput.value = editedDob || '';
    emailInput.value = editedEmail || '';
    phoneInput.value = editedPhone || '';
    educationInput.value = editedEducation || '';
    experienceInput.value = editedExperience || '';
    skillsInput.value = editedSkills || '';
    // Hide resume popup and show the form again
    resumePopup.classList.add('hidden');
    form.classList.remove('hidden');
});
