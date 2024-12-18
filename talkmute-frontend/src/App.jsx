import React, { useState, useRef } from "react";
import {
  HandIcon,
  XIcon,
  ArrowRight,
  SparklesIcon,
  AlertTriangleIcon,
  RefreshCw,
  UsersIcon,
  TargetIcon,
  GlobeIcon,
  MicIcon,
  StopCircleIcon,
} from "lucide-react";

// Environment configuration
const BACKEND_URL = "http://localhost:3000";

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {currentView === "home" && (
          <LandingPage onNavigate={() => setCurrentView("translate")} />
        )}
        {currentView === "translate" && (
          <TranslatePage onBack={() => setCurrentView("home")} />
        )}
      </main>
      <Footer />
    </div>
  );
};

// Navbar Component (remains the same as in the original code)
const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <HandIcon className="text-blue-600" size={32} />
          <h1 className="text-2xl font-bold text-blue-800">TalkMute</h1>
        </div>
      </div>
    </nav>
  );
};

// Enhanced Landing Page Component
const LandingPage = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-16 md:py-24 flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6 leading-tight">
            Breaking Barriers, Bridging Communication
          </h1>
          <p className="text-xl md:text-2xl text-blue-700 mb-10">
            TalkMute: Transforming Text into Universal Sign Language
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={<HandIcon className="text-blue-600" size={48} />}
              title="Text Translation"
              description="Convert text to sign language visuals"
            />
            <FeatureCard
              icon={<RefreshCw className="text-blue-600" size={48} />}
              title="Instant Conversion"
              description="Quick and accurate translations"
            />
            <FeatureCard
              icon={<SparklesIcon className="text-blue-600" size={48} />}
              title="Simple Interface"
              description="Easy to use text translator"
            />
          </div>

          <button
            onClick={onNavigate}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition-colors flex items-center mx-auto space-x-2"
          >
            Start Translating <ArrowRight className="ml-2" />
          </button>
        </div>
      </section>

      {/* Aims and Objectives Section */}
      <section className="py-16 bg-white rounded-xl shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">
            Our Mission and Vision
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <TargetIcon className="mx-auto text-blue-600 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Mission
              </h3>
              <p className="text-blue-700">
                To make communication more accessible by providing an intuitive
                platform that translates text into sign language, empowering
                deaf and hard-of-hearing individuals.
              </p>
            </div>
            <div className="text-center">
              <GlobeIcon className="mx-auto text-blue-600 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Vision
              </h3>
              <p className="text-blue-700">
                Create a world where language barriers cease to exist,enabling
                seamless communication across differentcommunication modalities.
              </p>
            </div>
            <div className="text-center">
              <UsersIcon className="mx-auto text-blue-600 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Objectives
              </h3>
              <p className="text-blue-700">
                Develop an inclusive technology that bridges communication gaps,
                promotes understanding, and provides equal access to information
                for all individuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">
            How TalkMute Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">1</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Enter Text
              </h3>
              <p className="text-blue-700">
                Type or paste the text you want to translate into the input box.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">2</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Translate
              </h3>
              <p className="text-blue-700">
                Click 'Translate' and watch as your text is converted to sign
                language images.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">3</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Communicate
              </h3>
              <p className="text-blue-700">
                Use the generated sign language images to communicate
                effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Ready to Break Communication Barriers?
          </h2>
          <p className="text-xl text-blue-700 mb-10">
            Start your journey with TalkMute today and make communication
            accessible for everyone.
          </p>
          <button
            onClick={onNavigate}
            className="bg-blue-600 text-white px-10 py-4 rounded-full text-xl hover:bg-blue-700 transition-colors flex items-center mx-auto space-x-2"
          >
            Get Started <ArrowRight className="ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 TalkMute. All Rights Reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-blue-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-300">
            Terms of Service
          </a>
          <a href="#" className="hover:text-blue-300">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
      <p className="text-blue-600">{description}</p>
    </div>
  );
};

// Translate Page Component
const TranslatePage = ({ onBack }) => {
  const [inputText, setInputText] = useState("");
  const [signLanguageImages, setSignLanguageImages] = useState([]);
  const [error, setError] = useState(null);
  const [missingImages, setMissingImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setAudioBlob(audioBlob);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setError("Unable to access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async () => {
    if (!audioBlob) {
      setError("No audio recorded");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    try {
      const response = await fetch(`${BACKEND_URL}/api/transcribe`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Transcription failed");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setInputText(data.transcribedText);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(`Transcription error: ${err.message}`);
    }
  };

  const translateText = async () => {
    // Reset previous state
    setSignLanguageImages([]);
    setError(null);
    setMissingImages([]);
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      // Check response status
      if (!response.ok) {
        const errorData = await response.json();

        // Handle missing images specifically
        if (errorData.missingImages) {
          setMissingImages(errorData.missingImages);
          setError("Some characters don't have sign language images");
        } else {
          setError(errorData.error || "Translation failed");
        }

        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setSignLanguageImages(data.signLanguageImages);

      // Check for any missing images
      if (data.missingImages) {
        setMissingImages(data.missingImages);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(`Translation error: ${err.message}`);
    }
  };

  const resetTranslation = () => {
    setInputText("");
    setSignLanguageImages([]);
    setError(null);
    setMissingImages([]);
    setAudioBlob(null);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
            Text to Sign Language
          </h2>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <XIcon />
          </button>
        </div>

        {/* Voice Recording Section */}
        <div className="mb-6 flex space-x-4 justify-center items-center">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-600"
            >
              <MicIcon /> <span>Start Recording</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-red-600"
            >
              <StopCircleIcon /> <span>Stop Recording</span>
            </button>
          )}
          {audioBlob && (
            <button
              onClick={transcribeAudio}
              className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-green-600"
            >
              Transcribe
            </button>
          )}
        </div>

        <div className="mb-6">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate to sign language or record audio"
            className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          />
        </div>

        <div className="mb-6 text-center">
          <button
            onClick={translateText}
            disabled={!inputText || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Translate to Sign Language
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center mb-4">
            <RefreshCw className="animate-spin text-blue-600" size={32} />
            <span className="ml-2 text-blue-700">Processing...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center">
            <AlertTriangleIcon className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        {missingImages.length > 0 && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
            <p className="font-semibold">Missing Sign Language Images:</p>
            <p className="text-sm">{missingImages.join(", ")}</p>
          </div>
        )}

        {signLanguageImages.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-800">
                Sign Language Translation:
              </h3>
              <button
                onClick={resetTranslation}
                className="text-blue-600 hover:text-blue-800 flex items-center"
                title="Reset"
              >
                <RefreshCw size={20} />
              </button>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {signLanguageImages.map((image, index) => (
                <img
                  key={index}
                  src={`${BACKEND_URL}${image}`}
                  alt={`Sign language for character ${index}`}
                  className="w-full aspect-square object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
