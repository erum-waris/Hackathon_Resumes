//  assigning elements for functionality
const form = document.getElementById('resume-form') as HTMLFormElement;
const generateButton = document.getElementById('generate-resume') as HTMLButtonElement;
const resumePopup = document.getElementById('resume-popup') as HTMLElement;
const generatedResume = document.getElementById('generated-resume') as HTMLElement;
const editButton = document.getElementById('edit-resume') as HTMLButtonElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
const shareButton = document.getElementById('share-link') as HTMLButtonElement;

// Input variables accessing html elements as input
const pictureInput = document.getElementById('profilePicture') as HTMLInputElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const dobInput = document.getElementById('dob') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const phoneInput = document.getElementById('phone') as HTMLInputElement;

const educationInput = document.getElementById('education') as HTMLInputElement;
const experienceInput = document.getElementById('experience') as HTMLInputElement;
const skillsInput = document.getElementById('skills') as HTMLInputElement;
const resumeURLInput = document.getElementById('resumeURL') as HTMLInputElement;

// Function to generate resume by clicking on button
generateButton.addEventListener('click', () => {

  // assigning input values
  
 
  const name = nameInput.value;
  const dob = dobInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;
  const  education = educationInput.value;
  const experience = experienceInput.value;
  const skills = skillsInput.value;
 
  //  show the resume popup
  form.classList.add('hidden');
  resumePopup.classList.remove('hidden');

  // creating URL to display photo

  const picturefile = pictureInput.files?.[0];

   const profilePictureURL = picturefile ? URL.createObjectURL(picturefile) : '';


  // resume will show in HTML and insert it into the DOM typescript
 generatedResume.innerHTML= `
    <div class="resume-section">
  
 <img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture" >
      <h3 contenteditable="true" class="para">Name:${name}</h3>
      <p contenteditable="true" class="para">Date of Birth: ${dob}</p>
      <p contenteditable="true" class="para">Email: ${email}</p>
      <p contenteditable="true" class="para">Phone: ${phone}</p>
      <h2 id="heading">Education</h2>
      <p contenteditable="true" class="para">${education}</p>
      <h4 id="heading">Experience</h4>
      <p contenteditable="true" class="para">${experience}</p>
      <h2 id="heading">Skills</h2>
      <p contenteditable="true" class="para">${skills}</p>
    </div>
  `;
  

});




// if - else for download btn and inserting image in pdf
if (downloadPdfButton) {
    downloadPdfButton.addEventListener('click', () => {
        // picture will insert
        const file = pictureInput?.files?.[0]; 
        if (file) {
            const reader = new FileReader();

            //image embed in the resume
            reader.onloadend = function () {
                const base64Image = reader.result as string; // Cast to string since FileReader returns a string for Data URLs

                //setting image properties
                const imageElement = document.createElement('img');
                imageElement.src = base64Image;
                imageElement.alt = "Profile Picture";
                imageElement.style.width = "100px";                                                                                                                                                                                                                
                // Insert the image at the beginning of the resume content
                generatedResume.insertBefore(imageElement, generatedResume.firstChild);

                // Generate the unique path based on user's input
                const resumeURL = resumeURLInput.value;
                const uniquePath = `resumes/${resumeURL.replace(/\s+/g, '_')}_cv.html`;

                //  downloading the resume
                const pdfDownload = document.createElement('a');
                pdfDownload.href = 'data:text/html;charset=UTF-8,' + encodeURIComponent(generatedResume.innerHTML);
                pdfDownload.download = uniquePath;
                pdfDownload.textContent = "Download PDF 2024";

                // Append the download link to the popup 
                resumePopup.appendChild(pdfDownload);
                pdfDownload.click();

                
            };

            // Read the image file as Data URL
            reader.readAsDataURL(file); 
        } else {
            console.error("No image file selected");
        }
    });
} else {
    console.error('Download button not found');
}
// Function to generate a shareable link based on form data
function generateShareableLink(): string {
    const baseUrl = window.location.origin; // Gets the base URL of the current site
    const params = new URLSearchParams();

    // Collecting form data

    params.append('name', nameInput.value);
    params.append('dob', dobInput.value);
    params.append('email', emailInput.value);
    params.append('phone', phoneInput.value);
    params.append('education', educationInput.value);
    params.append('experience' ,experienceInput.value);
    params.append ('skills' ,skillsInput.value);

   
  

    // Construct the full shareable link
    const shareableLink = `${baseUrl}?${params.toString()}`;
    return shareableLink;
}

// Function to copy the shareable link to the clipboard
function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Link copied to clipboard!');
    }, (err) => {
        console.error('Could not copy text: ', err);
    });
}

// Button click event for generating and sharing the link

shareButton.addEventListener('click', () => {
    const link = generateShareableLink();
    copyToClipboard(link);
    // Optionally display the link to the user
    alert(`Here is your shareable link: ${link}`);
});

// Edit functionality
editButton.addEventListener('click', () => {
    // Collect values from the generated resume to allow editing
    const editedName = generatedResume.querySelector('h3')?.innerHTML;
    const editedDob = generatedResume.querySelector('p:nth-child(2)')?.innerHTML.replace('Date of Birth: ', '');
    const editedEmail = generatedResume.querySelector('p:nth-child(3)')?.innerHTML.replace('Email: ', '');
    const editedPhone = generatedResume.querySelector('p:nth-child(4)')?.innerHTML.replace('Phone: ', '');
    const editedEducation = generatedResume.querySelector('p:nth-child(6)')?.innerHTML;
    const editedExperience = generatedResume.querySelector('p:nth-child(8)')?.innerHTML;
    const editedSkills = generatedResume.querySelector('p:nth-child(10)')?.innerHTML;
  
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