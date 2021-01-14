import React, { useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import useDarkMode from "use-dark-mode";

import { Slider } from "./styles";

const ThemeSlider: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const darkMode = useDarkMode(true);

  return (
    <Slider clicked={clicked}>
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
        <div>
          <HiMoon className="moon" />
          <HiSun className="sun" />
        </div>
      </label>
    </Slider>
  );
};

export default ThemeSlider;
