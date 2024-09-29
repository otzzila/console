
/**
 * Changes the styling of a page
 * @param theme A theme, as declared in style. See `$src/styles.light.css` as an example
 */
export const changeTheme = (theme: string) => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
}