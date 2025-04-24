export async function loadSpinner(targetSelector)
{
    const response = await fetch('./components/alert.component.html');
    const html = await response.text();
    document.querySelector(targetSelector).insertAdjacentHTML('beforeend', html);
}
  
export function showSpinner()
{
    document.getElementById('loading-spinner')?.classList.remove('d-none');
}
  
export function hideSpinner()
{
    document.getElementById('loading-spinner')?.classList.add('d-none');
}
  
