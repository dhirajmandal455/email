import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utlis/Date";

const Dashboard = () => {

    const { user ,logout} = useAuthStore();
    const handleLogout=()=>{
      logout()
  }


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop:blur-lg rounded-xl shadow-2xl border border-gray-800 "
    >
      <h1 className="text-center text-3xl font-bold mb-6 bg-linear-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
        Dashboard
      </h1>
      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-green-300 px-2">Profile information</h3>
          <h3 className="text-gray-300 text-sm px-2 ">name : {user.name}</h3>
          <p className="text-gray-300 text-sm px-2 ">email : {user.email}</p>
        </motion.div>
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Account Activity
          </h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined : </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-300">
            <span>Last Login : </span>
            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          className="text-center text-2xl font-semibold px-3 py-2 bg-linear-to-r from-green-400 to-emerald-600 text-white outline-none  w-full rounded-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
