import { GlassCard } from "./GlassCard";
import { MetricBadge } from "./MetricBadge";
import { GradientButton } from "./GradientButton";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";

interface ModelCardProps {
  id: string;
  name: string;
  strategy: string;
  accuracy: number;
  f1: number;
  auc: number;
  size: string;
}

export const ModelCard = ({ id, name, strategy, accuracy, f1, auc, size }: ModelCardProps) => {
  return (
    <GlassCard>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gradient mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground">Strategy: {strategy}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <MetricBadge label="Accuracy" value={`${accuracy}%`} color="green" className="text-xs py-2" />
          <MetricBadge label="F1" value={f1.toFixed(2)} color="light" className="text-xs py-2" />
          <MetricBadge label="AUC" value={auc.toFixed(2)} color="mint" className="text-xs py-2" />
        </div>

        <p className="text-sm text-muted-foreground">Size: {size}</p>

        <div className="flex gap-2">
          <Link to={`/models/${id}`} className="flex-1">
            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:shadow-green transition">
              View Details
            </button>
          </Link>
          <button className="p-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
