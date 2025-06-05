export function ProgressBar() {
  const currentStep = 2;
  const progressBarSteps = [
    { title: "Post Code", icon: "/icons/location.svg" },
    { title: "Waste Type", icon: "/icons/waste.svg" },
    { title: "Select Skip", icon: "/icons/select.svg" },
    { title: "Permit Check", icon: "/icons/shield.svg" },
    { title: "Choose Date", icon: "/icons/date.svg" },
    { title: "Payment", icon: "/icons/wallet.svg" },
  ];

  return (
    <div className="px-4 py-6">
      <div className="relative flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-0 sm:justify-between items-center overflow-x-auto">
        {progressBarSteps.map((step, index) => {
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;
          const connectorClass = isActive && !isCurrent ? "bg-blue-500" : "bg-gray-300";

          return (
            <div key={step.title} className="flex sm:flex-1 flex-col items-center relative min-w-[80px]">
              {/* Left connector (sm and up only) */}
              {index > 0 && (
                <div
                  className={`hidden sm:block absolute top-5 left-0 w-1/2 h-1 ${
                    isActive ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              )}

              {/* Right connector (sm and up only) */}
              {index < progressBarSteps.length - 1 && (
                <div className={`hidden sm:block absolute top-5 left-1/2 w-1/2 h-1 ${connectorClass}`} />
              )}

              <div
                className={`z-10 w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all
                  ${
                    isCurrent
                      ? "bg-blue-600 border-blue-600"
                      : isActive
                      ? "bg-blue-500 border-blue-500"
                      : "bg-white border-gray-300"
                  }`}
              >
                <img src={step.icon} alt={step.title} className="w-5 h-5" />
              </div>

              <p
                className={`text-center text-sm mt-2 w-20 sm:w-auto ${
                  isCurrent ? "font-bold text-blue-700" : "text-gray-600"
                }`}
              >
                {step.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
