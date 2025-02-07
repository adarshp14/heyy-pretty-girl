import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { LogSnag } from "@logsnag/node";

const logsnag = new LogSnag({
  token: "LOGSNAG_TOKEN",
  project: "project_name",
});

const track = async () => {
  await logsnag.track({
    channel: "yes",
    event: "Valentine's Day",
    description: "She said yes!",
    icon: "💖",
    notify: true,
  });
};

function App() {
  const steps = [
    { content: "Heyyyyy, pretty girl.", image: "/character/one.png" },
    { content: `Recently, we met.\nAnd somehow, you've been on my mind ever since.`, image: "/character/two.png" },
    { content: `Then we went on our first date…And I realized—yep, I want this girl. For life.`, image: "/character/three.png" },
    { content: `You're beautiful, you're smart, you're fun, and you make spending time together feel too short.`, image: "/character/four.png" },
    { content: `I look forward to when I'll see you again, hold your hands, and look into your pretty eyes.`, image: "/character/five.png" },
    { content: "So now I've got a question for you…", image: "/character/six.png" },
    { content: "Will you be my Valentine?", image: "/character/seven.png" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [sheWantsToBeMyValentine, setSheWantsToBeMyValentine] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // Track user interaction
  const { width, height } = useWindowSize();

  // Theme music for all pages
  const [themeAudio] = useState(new Audio("/assets/theme.mp3"));
  // Song for the last page
  const [finalAudio] = useState(new Audio("/assets/song.mp3"));

  useEffect(() => {
    if (hasInteracted) {
      // Play the theme song after the first interaction
      themeAudio.loop = true;
      themeAudio.volume = 0.3;
      themeAudio.play().catch((error) => console.log("Theme audio autoplay error:", error));
    }
  }, [hasInteracted, themeAudio]);

  useEffect(() => {
    if (sheWantsToBeMyValentine) {
      themeAudio.pause();
      finalAudio.play().catch((error) => console.log("Final audio autoplay error:", error));
    }
  }, [sheWantsToBeMyValentine, themeAudio, finalAudio]);

  return (
    <>
      {sheWantsToBeMyValentine && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Confetti width={width} height={height} />
          <div className="fixed top-0 left-0 w-full h-full bg-[#FFC5D3] flex flex-col items-center justify-center">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-white text-4xl font-bold"
            >
              Yayyyyyyy!!!!!
            </motion.h1>
            <img
              src="/character/yayyyy.png"
              alt=""
              className="w-40 animate-bounce"
            />
          </div>
        </motion.div>
      )}
      <div className="bg-[#FFC5D3] min-h-screen text-white p-5 flex flex-col items-center justify-center max-w-md mx-auto">
        <motion.img
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={steps[currentStep].image}
          alt=""
          className="w-40"
        />
        <motion.div
          key={currentStep + "-text"}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-josefin text-4xl font-bold"
        >
          {steps[currentStep].content}
        </motion.div>

        {currentStep < 6 && (
          <>
            <button
              onClick={() => {
                if (!hasInteracted) setHasInteracted(true); // Set interaction on first click
                setCurrentStep(currentStep + 1);
              }}
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-10 font-semibold"
            >
              Next
            </button>
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-2 font-semibold opacity-90"
              >
                Back
              </button>
            )}
          </>
        )}
        {currentStep === 6 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={async () => {
                setSheWantsToBeMyValentine(true);
                await track();
              }}
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-40 mt-10 font-semibold"
            >
              Yes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 10 }}
              onClick={async () => {
                setSheWantsToBeMyValentine(true);
                await track();
              }}
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-40 mt-2 font-semibold opacity-90"
            >
              Yes
            </motion.button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
