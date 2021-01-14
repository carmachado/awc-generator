const changeTheme = (checked: boolean): void => {
  if (checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
  localStorage.setItem(
    "@awc-generator:theme",
    document.documentElement.getAttribute("data-theme")
  );
};
export default changeTheme;
