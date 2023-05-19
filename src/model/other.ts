const modes = document.querySelectorAll('.mode')!;
const modeIcon = document.querySelectorAll('.mode-icon')!;

const container = document.body;
export function alertFunction(text: string, color: true | false) {
   const alertElement = document.querySelector<HTMLDivElement>('.alert-element')!;
   alertElement.style.display = "flex";
   alertElement.textContent = text;
   alertElement.style.background = color ? "green" : "red";
   alertElement.style.color = "#fff";
   setTimeout(() => {
      alertElement.style.display = "none";
   }, 2500);
}


export function darkMode() {
   if (localStorage.getItem('mode') === 'dark') {
      container.classList.add('dark');
      modeIcon.forEach(icon => icon.classList.replace('uil-moon', 'uil-sun'));
   }
   modes.forEach(mode => {
      mode.addEventListener('click', () => {
         modeIcon.forEach(icon => {
            const { classList } = icon;
            ['uil-moon', 'uil-sun'].forEach(cls => classList.toggle(cls));
         });
         container.classList.toggle('dark');
         if (container.classList.contains('dark')) {
            localStorage.setItem('mode', 'dark');
         } else {
            localStorage.removeItem('mode');
         }
      });
   });
};

