import { Check, X } from "lucide-react";

const Passwordcriteria = ({ password ="" }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-xs">
          {item.met ? (
            <Check className="size-4 text-green-400" />
          ) : (
            <X className="size-4 text-red-400" />
          )}
          <span className={item.met ? "text-green-400" : "text-gray-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password = ""}) => {
  const getStrength = (pass ="") => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z\d]/.test(pass)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  const getColor = (strength) => {
    if (strength === 1) return "bg-red-500";
    if (strength === 2) return "bg-red-400";
    if (strength === 3) return "bg-yellow-500";
    if (strength === 4) return "bg-yellow-400";
    return "bg-green-400";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-400">Password strength</span>
        <span className="text-xs text-gray-400">
          {getStrengthText(strength)}
        </span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? getColor(strength) : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      <Passwordcriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
