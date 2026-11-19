import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

const PipelineScene = lazy(() => import('../components/PipelineScene'));

const stages = [
  {
    title: '1. Thermal preprocessing',
    detail: 'Each frame is normalized and prepared for model inference, preserving spatial continuity across the thermal sequence.',
    tone: 'text-[#42E8E0]',
    accent: 'from-[#42E8E0]/20 to-[#42E8E0]/5',
  },
  {
    title: '2. U-Net semantic segmentation',
    detail: 'The segmentation network isolates active fire contours and suppresses non-fire thermal noise at the pixel level.',
    tone: 'text-[#5eead4]',
    accent: 'from-[#14b8a6]/20 to-[#14b8a6]/5',
  },
  {
    title: '3. ConvLSTM forecasting',
    detail: 'Sequential masks are transformed into a time-aware feature tensor, allowing the model to predict probable future fire spread.',
    tone: 'text-[#99f6e4]',
    accent: 'from-[#2dd4bf]/20 to-[#2dd4bf]/5',
  },
  {
    title: '4. Scientific analytics',
    detail: 'Results are visualized through overlays, error maps, and risk summaries to help interpret model output in context.',
    tone: 'text-[#2dd4bf]',
    accent: 'from-[#0f766e]/20 to-[#0f766e]/5',
  },
];

const techStack = ['Python 3.12', 'PyTorch', 'FastAPI', 'Rasterio', 'OpenCV', 'React', 'Vite', 'TailwindCSS'];

const About = () => {
  return (
    <div className="space-y-8 pb-10">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="panel p-6 sm:p-8">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#42E8E0]">Research overview</p>
        <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#F4F7FC] sm:text-4xl">Model Architecture</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[#A7B4C8]">
          Wildfire Vision AI combines thermal image understanding with spatio-temporal forecasting to estimate how fire regions may evolve in the next prediction step.
        </p>
      </motion.div>

      <div className="panel p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#A7B4C8]">Model pipeline</p>
            <h2 className="mt-1 text-xl font-bold text-[#F4F7FC]">Thermal Frames → U-Net Segmentation → ConvLSTM → Future Fire Map</h2>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[280px] w-full items-center justify-center rounded-[24px] border border-[#2B3B53] bg-[#0B1020] text-sm text-[#A7B4C8]">
              Loading 3D architecture preview...
            </div>
          }
        >
          <PipelineScene />
        </Suspense>
      </div>

      <div className="grid gap-5">
        {stages.map((stage, idx) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className={`panel relative overflow-hidden bg-gradient-to-r ${stage.accent} p-[1px]`}
          >
            <div className="bg-[#111A2E] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className={`mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#2B3B53] bg-[#172338] text-base font-bold ${stage.tone}`}>
                  {idx + 1}
                </div>
                <div>
                  <h2 className={`text-lg font-bold ${stage.tone}`}>{stage.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[#DDE7F5]">{stage.detail}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="panel p-6">
          <h2 className="text-xl font-bold text-[#F4F7FC]">Dataset</h2>
          <p className="mt-4 text-sm leading-7 text-[#A7B4C8]">
            The model is trained on FLAME 3 thermal sequence data, with emphasis on nadir-style wildfire imagery where fire evolution, terrain context, and temporal change are critical for forecasting spread behavior.
          </p>
        </div>

        <div className="panel p-6">
          <h2 className="text-xl font-bold text-[#F4F7FC]">Technology stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="rounded-full border border-[#2B3B53] bg-[#172338] px-3 py-1.5 text-xs font-medium text-[#DDE7F5]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
