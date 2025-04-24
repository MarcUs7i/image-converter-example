export async function loadAlert()
{
    const response = await fetch('./components/alert.component.html');
    const html = await response.text();
    document.body.insertAdjacentHTML('beforeend', html);
}
  
export function showAlert(message, type = 'danger')
{
    const alert = document.getElementById('alert');
    if (!alert) return;
  
    alert.textContent = message;
    alert.className = `alert alert-${type}`;
    alert.classList.remove('d-none');
  
    // Auto-hide after 4 seconds
    setTimeout(() =>
    {
        alert.classList.add('d-none');
    }, 4000);
}