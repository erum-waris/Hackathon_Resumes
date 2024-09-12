// Get form elements
var form = document.getElementById('resumeForm');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var profilePictureInput = document.getElementById('profilePicture');
var educationInput = document.getElementById('education');
var experienceInput = document.getElementById('experience');
var skillsInput = document.getElementById('skills');
// Get resume display elements
var resumeSection = document.getElementById('resume');
var displayName = document.getElementById('displayName');
var displayEmail = document.getElementById('displayEmail');
var displayPhone = document.getElementById('displayPhone');
var displayProfilePicture = document.getElementById('displayProfilePicture');
var displayEducation = document.querySelector('#displayEducation p');
var displayExperience = document.querySelector('#displayExperience p');
var displaySkills = document.querySelector('#displaySkills ul');
// Add event listener to form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally
    // Capture the input values
    var name = nameInput.value;
    var email = emailInput.value;
    var phone = phoneInput.value;
    var profilePicture = profilePictureInput.value;
    var education = educationInput.value;
    var experience = experienceInput.value;
    var skills = skillsInput.value.split('&').map(function (skill) { return skill.trim(); });
    // Display the input data in the resume section
    displayName.textContent = "".concat(name);
    displayEmail.textContent = "Email ".concat(email);
    displayPhone.textContent = "Phone No: ".concat(phone);
    if (profilePicture) {
        displayProfilePicture.src = profilePicture;
        displayProfilePicture.style.display = 'block';
    }
    else {
        displayProfilePicture.style.display = 'none';
    }
    displayEducation.textContent = education;
    displayExperience.textContent = experience;
    // Clear the skills list and add new skills
    displaySkills.innerHTML = '';
    skills.forEach(function (skill) {
        var li = document.createElement('li');
        li.textContent = skill;
        displaySkills.appendChild(li);
    });
    // Show the resume section
    resumeSection.style.display = 'block';
});
