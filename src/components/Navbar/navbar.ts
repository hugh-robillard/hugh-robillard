console.log("navbar!");

function useNavbar() {
  const navbarLogo = <HTMLElement>document.querySelector(".navbar__logo");

  if (!navbarLogo) return;

  function handleNavbarLogo() {
    if (window.scrollY > 100) {
      navbarLogo.classList.add("active");
    } else {
      navbarLogo.classList.remove("active");
    }
  }

  handleNavbarLogo();

  window.addEventListener("scroll", handleNavbarLogo);
}

useNavbar();
