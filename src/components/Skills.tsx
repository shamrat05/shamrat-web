import React from 'react';
import {
  Code,
  FileSpreadsheet,
  BarChart,
  Database,
  Users,
  Settings,
  Target,
  Handshake,
  ClipboardList,
  MessageSquare,
  Crosshair,
  Award,
  Laptop,
  MessageCircle,
  Trophy
} from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useInView } from '../hooks';
import { useCMS } from '../hooks/useCMS';
import { TechMarquee } from './TechMarquee';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Map of icon names used in localData to components
const iconMap: Record<string, React.FC<{ size?: number | string }>> = {
  Code,
  FileSpreadsheet,
  BarChart,
  Database,
  Users,
  Settings,
  Target,
  Handshake,
  ClipboardList,
  MessageSquare,
  Crosshair,
  Award,
  Laptop,
  MessageCircle,
  Trophy
};

export const Skills: React.FC = React.memo(() => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { data } = useCMS();

  const getIcon = (iconName?: string) => {
    if (!iconName) return Code;
    const Icon = iconMap[iconName] || Code;
    return Icon;
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'expert': return 'bg-primary-500/10 border-primary-500/30 text-primary-500';
      case 'advanced': return 'bg-primary-400/10 border-primary-400/30 text-primary-400';
      default: return 'bg-primary-400/5 border-primary-400/20 text-primary-400/80';
    }
  };

  const getLevelValue = (level: string) => {
    switch(level.toLowerCase()) {
      case 'expert': return 100;
      case 'advanced': return 80;
      case 'intermediate': return 60;
      case 'beginner': return 40;
      default: return 20;
    }
  };

  const chartData = {
    labels: data.skills.technical.map(s => s.name),
    datasets: [
      {
        label: 'Skill Level',
        data: data.skills.technical.map(s => getLevelValue(s.level)),
        backgroundColor: 'rgba(10, 132, 255, 0.2)',
        borderColor: 'rgba(10, 132, 255, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(10, 132, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(10, 132, 255, 1)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12
          }
        },
        ticks: {
          display: false,
          backdropColor: 'transparent',
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <section 
      id="skills" 
      ref={ref}
      className="py-32 bg-bg-surface"
    >
      <div className={`container transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">Tools and technologies I use to create value</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20 items-center justify-center">
             {/* Chart */}
            <div className="w-full lg:w-1/2 h-[400px] hidden md:block">
                <Radar data={chartData} options={chartOptions} />
            </div>

            {/* List */}
            <div className="w-full lg:w-1/2 space-y-12">
                {/* Technical Skills */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-center lg:text-left text-text-primary">Technical Skills</h3>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {data.skills.technical.map((skill, index) => {
                        const Icon = getIcon(skill.icon);
                        return (
                        <div 
                            key={index}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(10,132,255,0.25)] hover:border-primary-500 ${getLevelColor(skill.level)}`}
                        >
                            <Icon size={14} />
                            <span className="font-medium text-sm text-text-primary">{skill.name}</span>
                        </div>
                        );
                    })}
                    </div>
                </div>

                {/* Professional Skills */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-center lg:text-left text-text-primary">Professional Skills</h3>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {data.skills.professional.map((skill, index) => {
                        const Icon = getIcon(skill.icon);
                        return (
                        <div 
                            key={index}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(10,132,255,0.25)] hover:border-primary-500 ${getLevelColor(skill.level)}`}
                        >
                            <Icon size={14} />
                            <span className="font-medium text-sm text-text-primary">{skill.name}</span>
                        </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </div>

        {/* Certifications */}
        <div className="mt-20 mb-20">
          <h3 className="text-2xl font-bold text-center text-text-primary mb-12">Certifications & Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.certifications.map((cert, index) => {
              const Icon = getIcon(cert.icon);
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center p-8 card-glass h-full"
                >
                  <div className="mb-4 text-primary-500">
                    <Icon size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-text-primary mb-2 line-clamp-2">{cert.title}</h4>
                  <p className="text-sm text-text-secondary mt-auto">{cert.issuer}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <TechMarquee />
    </section>
  );
});