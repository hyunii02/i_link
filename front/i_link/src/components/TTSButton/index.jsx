import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const TTSButton = ({ source, fontSize, color }) => {
  return (
    <IconButton
      aria-label="upload picture"
      component="label"
      sx={{ color: color ? color : "white", display: "inline-block" }}
      onClick={() => {
        const lang = "ko-KR";
        const utterThis = new SpeechSynthesisUtterance(source);
        const voices = window.speechSynthesis.getVoices();
        for (let i = 0; i < voices.length; i++) {
          if (
            voices[i].lang.indexOf(lang) >= 0 ||
            voices[i].lang.indexOf(lang.replace("-", "_")) >= 0
          ) {
            utterThis.voice = voices[i];
          }
        }
        utterThis.lang = lang;
        utterThis.pitch = 1;
        utterThis.rate = 1; //속도
        window.speechSynthesis.speak(utterThis);
      }}
    >
      <VolumeUpIcon sx={{ fontSize: fontSize }} />
    </IconButton>
  );
};

export default TTSButton;
