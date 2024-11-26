import React from "react";
import logo from "../assets/images/female_mage.png";

interface AvatarProps {
  onNavigate: (direction: "quiz" | "learning") => void;
}

const Avatar: React.FC<AvatarProps> = ({ onNavigate }) => {
  const title = "A serene and mystical female mage with flowing";
  const description =
    "A serene and mystical female mage with flowing, luminescent white hair that softly frames her youthful, ethereal face. Her piercing blue eyes are cast downward, exuding a calm yet intense focus. She wears an ornate azure-blue coat adorned with intricate silver filigree and embossed designs, which shimmer faintly under a radiant glow. Hovering above her delicate, outstretched hands is a glowing, magical orb of liquid energy, with swirling water-like tendrils that radiate a soft, blue light. The background is a diffuse gradient of pale blue and white, creating a tranquil and otherworldly atmosphere. The lighting softly illuminates her face and hands, highlighting the delicate details of her attire and the magical energy she controls, capturing the essence of a powerful and mysterious enchantress.";

  return (
    <div className="flex gap-2 border border-gray-300 p-5 rounded-md">
      <img src={logo} className="w-96 rounded-3xl shadow-xl" alt="logo" />
      <div className="p-5 w-[600px] flex flex-col justify-between">
        <div>
          <p className="font-bold text-2xl">{title}</p>
          <p>{description}</p>
        </div>
        <div className="space-x-2">
          <button className="px-5 py-2.5 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 rounded-xl font-semibold" onClick={() => onNavigate("learning")}>Learning</button>
          <button className="px-5 py-2.5 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 rounded-xl font-semibold" onClick={() => onNavigate("quiz")}>Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
