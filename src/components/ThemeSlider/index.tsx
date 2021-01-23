import React, { useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import useDarkMode from "use-dark-mode";

import { Slider } from "./styles";

const ThemeSlider: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const darkMode = useDarkMode(true);

  return (
    <Slider clicked={clicked}>
      <HiSun className="sun" />
      <label htmlFor="changeThemeInput">
        <input
          id="changeThemeInput"
          type="checkbox"
          defaultChecked={darkMode.value}
          alt="Alterar tema"
          onClick={() => {
            if (!clicked) setClicked(true);
            darkMode.toggle();
          }}
        />
        <div />
      </label>
      <HiMoon className="moon" />
    </Slider>
  );
};

export default ThemeSlider;
