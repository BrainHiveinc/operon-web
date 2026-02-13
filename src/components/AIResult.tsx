import { motion } from "framer-motion";
import { Mission } from "./LiveGovernanceDemo";
import { Button } from "./ui/button";
import { CheckCircle2, RefreshCw, AlertCircle } from "lucide-react";

interface AIResultProps {
  mission: Mission | null;
  onNewMission: () => void;
}

export function AIResult({ mission, onNewMission }: AIResultProps) {
  if (!mission) return null;

  // If no AI result, show error
  if (!mission.result) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-red-100 dark:bg-red-900 rounded-3xl border-4 border-red-500">
        <AlertCircle className="w-20 h-20 text-red-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-red-900 dark:text-red-100 text-center mb-4">
          ⚠️ API NOT CONNECTED
        </h2>
        <p className="text-xl text-center text-red-800 dark:text-red-200 mb-6">
          Mission: {mission.description}<br/>
          Result: UNDEFINED
        </p>
        <Button onClick={onNewMission} className="mx-auto block">
          Try Again
        </Button>
      </div>
    );
  }

  // Show REAL AI result
  const aiAnswer = mission.result.sections[0]?.content || "No answer";

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Success Icon */}
      <div className="text-center mb-8">
        <CheckCircle2 className="w-24 h-24 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-2">✅ Mission Complete!</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">Question: {mission.description}</p>
      </div>

      {/* BIG AI ANSWER BOX */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-12 mb-8 shadow-2xl border-4 border-emerald-600"
      >
        <p className="text-6xl font-black text-center text-white drop-shadow-lg">
          {aiAnswer}
        </p>
      </motion.div>

      {/* Info */}
      <div className="bg-emerald-50 dark:bg-emerald-950 rounded-2xl p-6 mb-6 border-2 border-emerald-200 dark:border-emerald-800">
        <p className="text-center text-sm font-mono text-emerald-900 dark:text-emerald-100">
          ✨ Real AI Answer from LLaMA 3.2<br/>
          Mission ID: {mission.id}<br/>
          Status: {mission.status}
        </p>
      </div>

      {/* Button */}
      <Button
        onClick={onNewMission}
        size="lg"
        className="mx-auto block bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xl px-12 py-6"
      >
        <RefreshCw className="w-6 h-6 mr-3" />
        Try Another Mission
      </Button>
    </div>
  );
}
