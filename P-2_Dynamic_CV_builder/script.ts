// HTML  form elements
const form = document.getElementById('resumeForm') as HTMLFormElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const phoneInput = document.getElementById('phone') as HTMLInputElement;
const dateofbirthInput = document.getElementById('displayDateOfBirth') as HTMLInputElement;
const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
const educationInput = document.getElementById('education') as HTMLInputElement;
const experienceInput = document.getElementById('experience') as HTMLInputElement;
const skillsInput = document.getElementById('skills') as HTMLInputElement;

//  display Generated resume elements
const resumeSection = document.getElementById('resume') as HTMLElement;
const displayName = document.getElementById('displayName') as HTMLElement;
const displayEmail = document.getElementById('displayEmail') as HTMLElement;
const displayPhone = document.getElementById('displayPhone') as HTMLElement;
const displayDateOfBirth = document.getElementById('displayDateOfBirth') as HTMLElement; 
const displayProfilePicture = document.getElementById('displayProfilePicture') as HTMLImageElement;
const displayEducation = document.querySelector('#displayEducation p') as HTMLElement;
const displayExperience = document.querySelector('#displayExperience p') as HTMLElement;
const displaySkills = document.querySelector('#displaySkills ul') as HTMLElement;

// Add Event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Capture the input values
    const name = nameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const dateofbirth = dateofbirthInput.value;
    const profilePicture = profilePictureInput.value;
    const education = educationInput.value;
    const experience = experienceInput.value;
    const skills = skillsInput.value.split('&').map(skill => skill.trim());

    // Display the input data in the resume section
    displayName.textContent = `Name: ${name}`;
    displayEmail.textContent = `Email: ${email}`;
    displayPhone.textContent = `Phone No: ${phone}`;
    displayDateOfBirth.textContent = `DateOfBirth: ${dateofbirth}`;
    if (profilePicture) {
        displayProfilePicture.src = profilePicture;
        displayProfilePicture.style.display = 'block';
    } else {
        displayProfilePicture.style.display = 'none';
    }

    
    displayEducation.textContent = education;
    displayExperience.textContent = experience;

    // Clear the skills list and add new skills
    displaySkills.innerHTML = ''; 
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        displaySkills.appendChild(li);
    });

    // Show the resume section
    resumeSection.style.display = 'block';
});