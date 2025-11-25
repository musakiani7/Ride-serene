// In-app simple toaster fallback (DOM-based)
function ensureToasterContainer() {
  if (typeof document === 'undefined') return null;
  let container = document.getElementById('simple-toaster-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'simple-toaster-container';
    container.style.position = 'fixed';
    container.style.zIndex = 99999;
    container.style.right = '20px';
    container.style.top = '20px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '8px';
    document.body.appendChild(container);
    // inject minimal styles for toast items
    const style = document.createElement('style');
    style.id = 'simple-toaster-styles';
    style.innerHTML = `
      .simple-toast { padding: 10px 14px; border-radius: 6px; color: #fff; box-shadow: 0 6px 18px rgba(0,0,0,0.15); max-width: 320px; font-family: Arial, sans-serif; opacity:0; transform: translateY(-8px); transition: all 220ms ease; }
      .simple-toast.show { opacity: 1; transform: translateY(0); }
      .simple-toast.success { background: linear-gradient(90deg,#28a745,#20c997); }
      .simple-toast.error { background: linear-gradient(90deg,#e55353,#ff6b6b); }
      .simple-toast.info { background: linear-gradient(90deg,#4dabf7,#339af0); }
    `;
    document.head.appendChild(style);
  }
  return container;
}

function showSimpleToast(type, message, duration = 4000) {
  const container = ensureToasterContainer();
  if (!container) {
    // fallback to alert in non-browser env
    try {
      if (type === 'error') window.alert('Error: ' + message);
      else window.alert(message);
    } catch (e) {
      console.log(type, message);
    }
    return;
  }

  const el = document.createElement('div');
  el.className = `simple-toast ${type || 'info'}`;
  el.textContent = message;
  container.appendChild(el);
  // trigger show
  requestAnimationFrame(() => el.classList.add('show'));
  const timeout = setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => {
      container.removeChild(el);
    }, 220);
    clearTimeout(timeout);
  }, duration);
}

export function showToast(type, message) {
  // Try dynamic import so missing package doesn't crash the app
  import('react-toastify')
    .then(mod => {
      const toast = mod.toast;
      if (toast && typeof toast[type] === 'function') {
        toast[type](message);
      } else if (typeof toast === 'function') {
        // react-toastify also exposes toast as function
        toast(message);
      } else {
        // Use simple fallback
        showSimpleToast(type, message);
      }
    })
    .catch(() => {
      // Fallback to in-app simple toaster
      showSimpleToast(type, message);
    });
}

export async function mountToastContainer(setComponent) {
  try {
    const mod = await import('react-toastify');
    await import('react-toastify/dist/ReactToastify.css');
    setComponent(() => mod.ToastContainer);
  } catch (e) {
    // ignore if not installed
    setComponent(null);
  }
}
