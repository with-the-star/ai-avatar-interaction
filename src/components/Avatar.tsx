import React from "react";
import logo from "../assets/images/female_mage.png";

const Avatar: React.FC = () => {
  const title = "A serene and mystical female mage with flowing";
  const description =
    "A serene and mystical female mage with flowing, luminescent white hair that softly frames her youthful, ethereal face. Her piercing blue eyes are cast downward, exuding a calm yet intense focus. She wears an ornate azure-blue coat adorned with intricate silver filigree and embossed designs, which shimmer faintly under a radiant glow. Hovering above her delicate, outstretched hands is a glowing, magical orb of liquid energy, with swirling water-like tendrils that radiate a soft, blue light. The background is a diffuse gradient of pale blue and white, creating a tranquil and otherworldly atmosphere. The lighting softly illuminates her face and hands, highlighting the delicate details of her attire and the magical energy she controls, capturing the essence of a powerful and mysterious enchantress.";

  return (
    <div>
      <img src={logo} style={{ width: "300px" }} alt="logo" />
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default Avatar;
