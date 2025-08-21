import React, { useEffect, useState } from 'react';

interface Stage {
  name: string;
  label: string;
  color: string;
  duration: number; // in ms
}

const stages: Stage[] = [
  { name: 'tick', label: 'Price Tick', color: 'timeline-tick', duration: 50 },
  { name: 'validator', label: 'Validator TEE', color: 'timeline-validator', duration: 75 },
  { name: 'chain', label: 'On-Chain Write', color: 'timeline-chain', duration: 100 },
  { name: 'webhook', label: 'Webhook Push', color: 'timeline-webhook', duration: 25 },
  { name: 'ui', label: 'UI Paint', color: 'timeline-ui', duration: 15 }
];

export const DataTimeline: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const totalDuration = stages.reduce((sum, stage) => sum + stage.duration, 0);
    let currentTime = 0;

    const runCycle = () => {
      setActiveStage(0);
      currentTime = 0;

      stages.forEach((stage, index) => {
        setTimeout(() => {
          setActiveStage(index);
        }, currentTime);
        currentTime += stage.duration;
      });

      // Reset after completion
      setTimeout(() => {
        runCycle();
      }, totalDuration + 500);
    };

    runCycle();
  }, [isRunning]);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-mono font-semibold text-foreground">
          Data Flow Pipeline
        </h3>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
        >
          {isRunning ? 'Pause' : 'Resume'}
        </button>
      </div>

      <div className="space-y-3">
        {stages.map((stage, index) => (
          <div key={stage.name} className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${
                index === activeStage
                  ? `bg-${stage.color} border-${stage.color} shadow-lg`
                  : index < activeStage
                  ? `bg-${stage.color}/50 border-${stage.color}/50`
                  : 'bg-transparent border-muted'
              }`}
            />
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-mono ${
                    index <= activeStage ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {stage.label}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {stage.duration}ms
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="timeline-stage mt-1">
                {index === activeStage && (
                  <div
                    className={`timeline-progress bg-${stage.color}`}
                    style={{
                      animationDuration: `${stage.duration}ms`,
                      animationIterationCount: '1',
                      animationFillMode: 'forwards'
                    }}
                  />
                )}
                {index < activeStage && (
                  <div className={`h-full bg-${stage.color}/50 rounded-full`} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-border">
        <div className="text-xs text-muted-foreground font-mono">
          Total Pipeline: {stages.reduce((sum, stage) => sum + stage.duration, 0)}ms
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Real-time updates eliminate traditional indexer delays
        </div>
      </div>
    </div>
  );
};