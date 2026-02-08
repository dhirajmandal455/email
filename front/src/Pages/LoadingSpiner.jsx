import { motion } from "framer-motion";
import { Loader } from "lucide-react";
const LoadingSpiner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-linear from-gray-900 via-green-900 to=emerald-900 flex items-center ">
<Loader className=" mx-auto animate-spin text-green-600" size={27} />
    </div>
  );
};

export default LoadingSpiner;
