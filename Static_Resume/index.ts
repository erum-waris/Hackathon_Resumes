const toggleBtn = document.getElementById('toggleBtn') as HTMLButtonElement;
const skillsList = document.getElementById('skills') as HTMLElement;

toggleBtn.addEventListener('click', () => {
    if (skillsList.style.display === 'none' || skillsList.style.display === '') {
        skillsList.style.display = 'block';
    } else {
        skillsList.style.display = 'none';
    }
});