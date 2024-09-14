var toggleBtn = document.getElementById('toggleBtn');
var skillsList = document.getElementById('skills');
toggleBtn.addEventListener('click', function () {
    if (skillsList.style.display === 'none' || skillsList.style.display === '') {
        skillsList.style.display = 'block';
    }
    else {
        skillsList.style.display = 'none';
    }
});
